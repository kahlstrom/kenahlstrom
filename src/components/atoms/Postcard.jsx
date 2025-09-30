import { motion } from 'framer-motion';

/**
 * Postcard - A container that mimics the look of a vintage postcard
 * Perfect for the digital nomad/travel theme
 */
export default function Postcard({ 
  children, 
  className = "", 
  delay = 0,
  hasStamp = true,
  stampColor = "amber"
}) {
  const stampColors = {
    amber: "border-amber-500 bg-amber-400/20",
    green: "border-green-500 bg-green-400/20",
    cyan: "border-cyan-500 bg-cyan-400/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-sm shadow-2xl p-6 ${className}`}
      style={{
        backgroundColor: '#fffbeb',
        backgroundImage: `
          linear-gradient(to bottom right, #fffbeb, #ffedd5),
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(251, 191, 36, 0.03) 1px,
            rgba(251, 191, 36, 0.03) 2px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 1px,
            rgba(251, 191, 36, 0.03) 1px,
            rgba(251, 191, 36, 0.03) 2px
          )
        `,
        boxShadow: `
          0 1px 3px rgba(0,0,0,0.12),
          0 1px 2px rgba(0,0,0,0.24),
          inset 0 0 0 1px rgba(251, 191, 36, 0.1),
          2px 2px 8px rgba(0,0,0,0.15)
        `
      }}
    >
      {/* Postcard edges - aged paper effect */}
      <div className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          border: '1px solid rgba(217, 119, 6, 0.3)',
          boxShadow: 'inset 0 0 30px rgba(217, 119, 6, 0.05)'
        }}
      />

      {/* Postcard stamp (top right) */}
      {hasStamp && (
        <div className="absolute top-3 right-3 w-16 h-20 border-2 border-dashed opacity-70 rotate-3 flex items-center justify-center text-xs font-mono"
          style={{
            borderColor: 'rgba(217, 119, 6, 0.4)'
          }}
        >
          <div className={`w-12 h-16 border-4 ${stampColors[stampColor]} flex flex-col items-center justify-center p-1`}>
            <div className="text-[10px] font-bold" style={{ color: '#92400e' }}>✈</div>
            <div className="text-[6px] font-mono" style={{ color: '#92400e' }}>NOMAD</div>
          </div>
        </div>
      )}

      {/* Postmark effect */}
      <div className="absolute top-4 right-24 w-12 h-12 rounded-full border-2 opacity-30 flex items-center justify-center text-[8px] font-mono rotate-12"
        style={{
          borderColor: 'rgba(217, 119, 6, 0.5)',
          color: '#92400e'
        }}
      >
        <div className="text-center">
          <div>DIGITAL</div>
          <div>NOMAD</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16 pb-8 md:pt-0 md:pr-24">
        {children}
      </div>

      {/* Bottom decorative line (like address lines on postcards) */}
      <div className="absolute bottom-4 left-6 right-6 opacity-20 pointer-events-none">
        <div className="border-b border-amber-900 mb-2"></div>
        <div className="border-b border-amber-900 mb-2"></div>
        <div className="border-b border-amber-900"></div>
      </div>
    </motion.div>
  );
}