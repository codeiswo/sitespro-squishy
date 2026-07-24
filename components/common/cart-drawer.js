'use client';

import { useEffect, useState, useRef } from 'react';
import { useCart } from './cart-context';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    checkoutStep,
    setCheckoutStep,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart
  } = useCart();

  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState('');
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const buttonContainerRef = useRef(null);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  // Fetch PayPal Config
  useEffect(() => {
    if (checkoutStep === 'checkout' && !paypalLoaded) {
      setLoadingConfig(true);
      fetch('/api/checkout/config')
        .then(res => res.json())
        .then(data => {
          if (data.paypalClientId) {
            setPaypalClientId(data.paypalClientId);
            loadPaypalSDK(data.paypalClientId, data.paypalMode);
          } else {
            alert('PayPal is not configured for this website yet. Please configure it in Settings.');
            setCheckoutStep('cart');
          }
        })
        .catch(err => {
          console.error(err);
          alert('Failed to load payment configuration.');
          setCheckoutStep('cart');
        })
        .finally(() => setLoadingConfig(false));
    }
  }, [checkoutStep, paypalLoaded]);

  // Dynamically load PayPal SDK script
  const loadPaypalSDK = (clientId, mode) => {
    const scriptId = 'paypal-sdk-script';
    if (document.getElementById(scriptId)) {
      setPaypalLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setPaypalLoaded(true);
    };
    script.onerror = () => {
      alert('Failed to load payment gateway SDK.');
      setCheckoutStep('cart');
    };
    document.body.appendChild(script);
  };

  // Render PayPal buttons once SDK is loaded
  useEffect(() => {
    if (paypalLoaded && checkoutStep === 'checkout' && buttonContainerRef.current) {
      // Clear container first to prevent duplicate buttons
      buttonContainerRef.current.innerHTML = '';

      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal'
          },
          createOrder: async () => {
            try {
              const res = await fetch('/api/checkout/create-paypal-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cartItems })
              });
              const data = await res.json();
              if (data.error) throw new Error(data.error);
              return data.orderId;
            } catch (err) {
              alert(err.message || 'Error initializing payment.');
              throw err;
            }
          },
          onApprove: async (data, actions) => {
            setIsProcessingPayment(true);
            try {
              const res = await fetch('/api/checkout/capture-paypal-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: data.orderID, items: cartItems })
              });
              const result = await res.json();
              if (result.success) {
                clearCart();
                setCheckoutStep('success');
              } else {
                alert('Payment captured with error: ' + result.error);
              }
            } catch (err) {
              console.error(err);
              alert('Error capturing payment: ' + err.message);
            } finally {
              setIsProcessingPayment(false);
            }
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            alert('An error occurred during payment. Please try again.');
          }
        }).render(buttonContainerRef.current);
      }
    }
  }, [paypalLoaded, checkoutStep, cartItems]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => !isProcessingPayment && setIsCartOpen(false)}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-150 dark:border-gray-800 flex flex-col z-10 transition-transform duration-350 animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary dark:text-accent" />
            <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
              {checkoutStep === 'cart' ? 'Shopping Cart' : checkoutStep === 'checkout' ? 'Checkout' : 'Order Placed!'}
            </h2>
            <span className="text-xs bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent px-2 py-0.5 rounded-full font-bold">
              {cartCount}
            </span>
          </div>
          <button 
            disabled={isProcessingPayment}
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View 1: Cart Items */}
        {checkoutStep === 'cart' && (
          <>
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-700 stroke-[1.5]" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Your cart is empty</h3>
                <p className="text-sm text-gray-400 max-w-xs">Add some premium water filters to get pure clean water for your home.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-gray-100 dark:divide-gray-800">
                  {cartItems.map((item, idx) => (
                    <div key={item.id} className={`flex gap-4 ${idx > 0 ? 'pt-4' : ''}`}>
                      <div className="w-20 h-20 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-750 rounded-xl p-2 flex items-center justify-center shrink-0">
                        <img src={item.image_url} className="w-full h-full object-contain" alt={item.title} />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-accent uppercase font-bold tracking-wider">{item.brand}</span>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate" title={item.title}>
                            {item.title}
                          </h4>
                          {item.sku && <p className="text-[10px] text-gray-400 font-mono mt-0.5">SKU: {item.sku}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                          {/* Quantity selectors */}
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-gray-50 dark:bg-gray-800">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-primary dark:text-accent">${(item.price * item.quantity).toFixed(2)}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Checkout */}
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-850/50 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Subtotal</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 justify-center">
                    <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                    <span>Secure Checkout with SSL 256-bit encryption</span>
                  </div>
                  <button 
                    onClick={() => setCheckoutStep('checkout')}
                    className="btn-primary w-full text-center py-3.5 text-base font-bold shadow-lg shadow-primary/10"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* View 2: Payment step */}
        {checkoutStep === 'checkout' && (
          <div className="flex-1 flex flex-col p-5 space-y-5">
            <button 
              disabled={isProcessingPayment}
              onClick={() => setCheckoutStep('cart')}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary dark:hover:text-accent font-semibold transition-colors mr-auto cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cart</span>
            </button>

            {/* Order summary */}
            <div className="bg-gray-50 dark:bg-gray-850 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3">
              <h3 className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Order Summary</h3>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                  <span className="truncate pr-4">{item.title} <span className="font-semibold text-gray-500">x{item.quantity}</span></span>
                  <span className="font-semibold shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-200 dark:border-gray-750 pt-2.5 mt-2 flex justify-between font-bold text-sm text-gray-900 dark:text-white">
                <span>Total Amount</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Address notice */}
            <div className="text-[11px] leading-relaxed text-gray-400 bg-blue-500/5 dark:bg-accent/5 border border-blue-500/10 dark:border-accent/10 p-3 rounded-xl flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-accent shrink-0 mt-1.5 animate-pulse" />
              <span>
                Please confirm your shipping address and billing details in the PayPal portal. The address entered on PayPal will be used for shipping.
              </span>
            </div>

            {/* Payment Container */}
            <div className="flex-1 flex flex-col justify-center items-center">
              {loadingConfig ? (
                <div className="flex flex-col items-center gap-2 py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary dark:text-accent" />
                  <span className="text-xs text-gray-400">Loading payment methods...</span>
                </div>
              ) : isProcessingPayment ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-green-500" />
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Processing Payment...</h4>
                  <p className="text-xs text-gray-400 max-w-xs">Please do not close this window or refresh the page while we authorize your order.</p>
                </div>
              ) : (
                <div className="w-full space-y-4">
                  <div className="text-center font-bold text-xs uppercase tracking-wider text-gray-500 select-none">Pay securely with:</div>
                  <div ref={buttonContainerRef} id="paypal-button-container" className="w-full min-h-[150px]" />
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 select-none">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>PayPal encrypted payment, safe and secure.</span>
            </div>
          </div>
        )}

        {/* View 3: Success message */}
        {checkoutStep === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center animate-bounce">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Successful!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Thank you for shopping with us! Your payment has been captured and order is placed successfully.
            </p>
            <div className="bg-gray-50 dark:bg-gray-850 p-4 rounded-xl border border-gray-150 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400 text-left w-full space-y-1">
              <div><span className="font-semibold">Notification:</span> A confirmation email will be sent shortly.</div>
              <div><span className="font-semibold">Shipment:</span> Track info will be sent once dispatched.</div>
            </div>
            <button 
              onClick={() => {
                setCheckoutStep('cart');
                setIsCartOpen(false);
              }}
              className="btn-primary px-8 py-3 text-sm font-bold"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
