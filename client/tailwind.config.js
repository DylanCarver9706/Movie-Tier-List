/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "tier-s": "#ff6b6b",
        "tier-a": "#4ecdc4",
        "tier-b": "#45b7d1",
        "tier-c": "#96ceb4",
        "tier-d": "#feca57",
        "tier-f": "#ff9ff3",
      },
    },
  },
  plugins: [],
};
