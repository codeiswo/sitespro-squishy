'use client';

const brands = [
  { name: 'Samsung', color: '#1428A0' },
  { name: 'GE', color: '#003DA5' },
  { name: 'LG', color: '#A50034' },
  { name: 'Whirlpool', color: '#003B5C' },
  { name: 'Maytag', color: '#B50000' },
  { name: 'Frigidaire', color: '#0066B2' },
  { name: 'KitchenAid', color: '#B50000' },
  { name: 'Kenmore', color: '#1D4488' },
];

export default function BrandWall() {
  // Double the brands for seamless infinite scroll
  const allBrands = [...brands, ...brands];

  return (
    <section id="brand-wall" className="section-padding bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container-custom mb-12 text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
          Trusted Compatibility
        </p>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white">
          Compatible with All Major Brands
        </h2>
      </div>

      {/* Scrolling brand track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {allBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className="w-44 h-24 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center px-6 group-hover:border-accent/30 group-hover:bg-accent/5 dark:group-hover:bg-accent/5 transition-all duration-300 group-hover:shadow-glow">
                <span
                  className="text-xl font-heading font-bold tracking-tight opacity-40 group-hover:opacity-90 transition-opacity duration-300"
                  style={{ color: brand.color }}
                >
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
