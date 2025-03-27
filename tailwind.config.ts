import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['var(--font-noto-sans-arabic)'],
        tajawal: ['var(--font-tajawal)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        primary: "#3B82F6",
        "primary-dark": "#1D4ED8",
        "primary-light": "#BFDBFE",
        background: "#FFFFFF",
        border: "#DADDE1",
        text: "#1F2937",
        muted: "#6B7280",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1F2937',
            maxWidth: '100%',
            direction: 'rtl',
            textAlign: 'right',
            h1: { color: '#1E3A8A' },
            h2: { color: '#1E3A8A' },
            h3: { color: '#1E3A8A' },
            a: { color: '#3B82F6' },
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
