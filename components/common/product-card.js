'use client';

import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { formatPrice, parseJSON } from '@/lib/utils';

export default function ProductCard({ product, index = 0 }) {
  const features = parseJSON(product.features);
  const discount = product.compare_price
    ? Math.round((1 - product.price / product.compare_price) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      id={`product-card-${product.slug}`}
      className="group block card-premium card-3d rounded-2xl overflow-hidden transition-all duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700">
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Featured badge */}
        {product.is_featured ? (
          <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-gold text-white text-xs font-bold shadow-lg">
            Featured
          </div>
        ) : null}

        {/* Product image */}
        <div className="w-full h-full flex items-center justify-center p-8 group-hover:scale-110 transition-transform duration-700 ease-out">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-contain drop-shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-primary/40" />
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold text-sm rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Details
            <ShoppingCart className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-5">
        {/* Brand */}
        {product.brand && (
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {product.brand}
          </span>
        )}

        {/* Title */}
        <h3 className="mt-1.5 text-sm font-heading font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
          {product.title}
        </h3>

        {/* Rating stars */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
          ))}
          <span className="text-xs text-gray-400 ml-1">(4.8)</span>
        </div>

        {/* Features tags */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {features.slice(0, 2).map((f, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary/10 text-primary dark:text-accent-400 font-medium">
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-bold text-primary dark:text-accent">
            {formatPrice(product.price)}
          </span>
          {product.compare_price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compare_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
