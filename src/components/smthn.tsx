import { motion } from "framer-motion";

function ParallaxFarmBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
      >
        {/* Sky */}
        <rect width="1440" height="600" fill="#FDF6E3" />

        {/* Sun */}
        <circle cx="220" cy="120" r="40" fill="#FFD60A" opacity="0.7" />

        {/* Hills */}
        <path d="M0 400 Q 360 300 720 400 T 1440 400 V600 H0Z" fill="#A7C957" />
        <path d="M0 500 Q 480 450 960 500 T 1440 500 V600 H0Z" fill="#6A994E" />

        {/* Barn */}
        <rect
          x="1200"
          y="350"
          width="80"
          height="60"
          fill="#BC6C25"
          stroke="#99582A"
          strokeWidth="4"
        />
        <polygon points="1200,350 1240,320 1280,350" fill="#99582A" />

        {/* Wheat group */}
        <g>
          {[300, 320, 340, 360].map((x, i) => (
            <motion.g
              key={x}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{ transformOrigin: `${x + 4}px 560px` }} // pivot at stalk bottom
            >
              <rect
                x={x}
                y="520"
                width="8"
                height="40"
                rx="4"
                fill="#FFD60A"
                opacity="0.85"
              />
            </motion.g>
          ))}
        </g>
      </motion.svg>
    </div>
  );
}

export default ParallaxFarmBackground;
