'use client';

import { useEffect, useState, useRef } from 'react';
import { useCart } from './cart-context';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, ArrowLeft, Loader2, CreditCard, Mail } from 'lucide-react';
import Link from 'next/link';

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

  const [enablePayment, setEnablePayment] = useState(true);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState('');
  const [hasStripeSecret, setHasStripeSecret] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal'); // 'paypal' or 'stripe'
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
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  // Fetch Checkout Config
  useEffect(() => {
    if (checkoutStep === 'checkout') {
      setLoadingConfig(true);
      fetch('/api/checkout/config')
        .then(res => res.json())
        .then(data => {
          if (data.enablePayment === false) {
            setEnablePayment(false);
          } else {
            setEnablePayment(true);
            if (data.paypalClientId) {
              setPaypalClientId(data.paypalClientId);
              loadPaypalSDK(data.paypalClientId, data.paypalMode);
            }
            if (data.hasStripeSecret) {
              setHasStripeSecret(true);
              if (!data.paypalClientId) {
                setPaymentMethod('stripe');
              }
            }
          }
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => setLoadingConfig(false));
    }
  }, [checkoutStep]);

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
      console.warn('Failed to load PayPal SDK script.');
    };
    document.body.appendChild(script);
  };

  // Render PayPal buttons once SDK is loaded
  useEffect(() => {
    if (enablePayment && paymentMethod === 'paypal' && paypalLoaded && checkoutStep === 'checkout' && buttonContainerRef.current) {
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
          onApprove: async (data) => {
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
  }, [enablePayment, paymentMethod, paypalLoaded, checkoutStep, cartItems, clearCart, setCheckoutStep]);

  // Handle Stripe Credit Card Checkout Redirect
  const handleStripeCheckout = async () => {
    setIsProcessingPayment(true);
    try {
      const res = await fetch('/api/checkout/create-stripe-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to initialize Stripe payment');
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      alert(err.message);
      setIsProcessingPayment(false);
    }
  };

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
            <ShoppingBag className="w-5 h-5 text-[#FF2E7E]" />
            <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
              {checkoutStep === 'cart' ? 'Squishy Cart' : checkoutStep === 'checkout' ? 'Checkout' : 'Order Placed!'}
            </h2>
            <span className="text-xs bg-[#FF2E7E]/10 text-[#FF2E7E] px-2 py-0.5 rounded-full font-bold">
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
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Your squishy cart is empty</h3>
                <p className="text-sm text-gray-400 max-w-xs">Add some dough-y squishies to start your sensory stress relief!</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#FF2E7E] text-white font-bold text-sm cursor-pointer shadow-md hover:bg-[#E0266F] transition-all"
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
                          <span className="text-[10px] text-[#8B5CF6] uppercase font-bold tracking-wider">{item.brand}</span>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate" title={item.title}>
                            {item.title}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between">
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
                            <span className="text-sm font-bold text-[#FF2E7E]">${(item.price * item.quantity).toFixed(2)}</span>
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

                  <button 
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF2E7E] to-[#8B5CF6] text-white font-bold text-base shadow-lg shadow-[#FF2E7E]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
          <div className="flex-1 flex flex-col p-5 space-y-5 overflow-y-auto">
            <button 
              disabled={isProcessingPayment}
              onClick={() => setCheckoutStep('cart')}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#FF2E7E] font-semibold transition-colors mr-auto cursor-pointer"
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

            {/* Check Payment Enable Status */}
            {!enablePayment ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-amber-500/5 rounded-2xl border border-amber-500/20">
                <Mail className="w-10 h-10 text-amber-500" />
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Online Checkout Disabled</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Direct online checkout is currently offline. Please submit an inquiry with your order details and we will arrange invoicing for you.
                </p>
                <Link
                  href="/contact"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Contact Us to Order
                </Link>
              </div>
            ) : (
              /* Payment Enabled View */
              <div className="flex-1 flex flex-col justify-between space-y-4">
                {loadingConfig ? (
                  <div className="flex flex-col items-center gap-2 py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[#FF2E7E]" />
                    <span className="text-xs text-gray-400">Loading payment channels...</span>
                  </div>
                ) : isProcessingPayment ? (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-green-500" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Processing Payment...</h4>
                    <p className="text-xs text-gray-400 max-w-xs">Please wait while we prepare your secure checkout session.</p>
                  </div>
                ) : (
                  <div className="w-full space-y-4">
                    {/* Payment Method Selector Tabs */}
                    {(paypalClientId || hasStripeSecret) && (
                      <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 text-xs font-bold">
                        {paypalClientId && (
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('paypal')}
                            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                              paymentMethod === 'paypal'
                                ? 'bg-white dark:bg-gray-700 text-[#FF2E7E] shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            PayPal
                          </button>
                        )}
                        {hasStripeSecret && (
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('stripe')}
                            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              paymentMethod === 'stripe'
                                ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Credit Card (Stripe)
                          </button>
                        )}
                      </div>
                    )}

                    {/* PayPal Container */}
                    {paymentMethod === 'paypal' && paypalClientId && (
                      <div className="w-full space-y-2">
                        <div ref={buttonContainerRef} id="paypal-button-container" className="w-full min-h-[150px]" />
                      </div>
                    )}

                    {/* Stripe Credit Card Container */}
                    {paymentMethod === 'stripe' && hasStripeSecret && (
                      <div className="w-full space-y-3 pt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          Pay securely using your Visa, MasterCard, American Express, or Discover card.
                        </p>
                        <button
                          type="button"
                          onClick={handleStripeCheckout}
                          disabled={isProcessingPayment}
                          className="w-full py-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold rounded-2xl text-base shadow-lg shadow-[#8B5CF6]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CreditCard className="w-5 h-5" />
                          Pay with Credit Card
                        </button>
                      </div>
                    )}

                    {!paypalClientId && !hasStripeSecret && (
                      <div className="text-center py-6 text-xs text-amber-500 font-semibold bg-amber-500/10 rounded-xl p-3">
                        No online payment channel is configured for this website yet.
                      </div>
                    )}
                  </div>
                )}

                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 select-none">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>256-Bit SSL Encrypted & PCI Compliant Payment</span>
                </div>
              </div>
            )}
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
              Thank you for shopping with us! Your squishy order has been placed successfully.
            </p>
            <button 
              onClick={() => {
                setCheckoutStep('cart');
                setIsCartOpen(false);
              }}
              className="px-8 py-3 rounded-xl bg-[#FF2E7E] text-white text-sm font-bold cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
