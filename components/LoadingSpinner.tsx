import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
  text?: string;
  textColor?: string;
}

export const LoadingSpinner = ({ 
  size = 24, 
  color = "currentColor",
  thickness = 2,
  text,
  textColor = "#4D79FF"
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeOpacity="0.2"
          />
          <motion.path
            d="M12 2C6.48 2 2 6.48 2 12"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
          />
        </motion.svg>
      </div>
      {text && (
        <span className="text-sm font-medium" style={{ color: textColor }}>
          {text}
        </span>
      )}
    </div>
  );
};
