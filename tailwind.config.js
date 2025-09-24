/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}", 
    "./layouts/**/*.vue",            
    "./pages/**/*.vue",              
    "./plugins/**/*.{js,ts}",        
    "./app.vue", 
  ],
  theme: {
    extend: {
      colors: {
        primary_white: {
          DEFAULT: "#dddddd",       // main
          foreground: "#dddddd",    // text color on primary
        },
        secondary: {
          DEFAULT: "#64748b",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
      },
    },
  },
  plugins: [],
}

