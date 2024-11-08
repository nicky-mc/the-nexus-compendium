/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this based on your project structure
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom D&D themed colors
        primary: "#7f1d1d", // Dark Red (Primary D&D theme)
        secondary: "#1e293b", // Dark Blue Gray
        accent: "#f59e0b", // Golden Yellow
        neutral: "#111827", // Dark Gray
        "base-100": "#1f2937", // Slate Gray for backgrounds
      },
    },
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin
  daisyui: {
    themes: [
      {
        dndtheme: {
          primary: "#7f1d1d",
          secondary: "#1e293b",
          accent: "#f59e0b",
          neutral: "#111827",
          "base-100": "#1f2937",
          info: "#3b82f6",
          success: "#10b981",
          warning: "#fbbf24",
          error: "#ef4444",
        },
      },
    ],
  },
};
