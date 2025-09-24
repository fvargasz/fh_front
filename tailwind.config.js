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
        'sky-primary': '#3B82F6',
        'sky-secondary': '#DBEAFE', 
        'cloud-white': '#FFFFFF',
        'horizon': '#F8FAFC',
        'text-foreground': {
          light: 'hsl(215 20% 15%)',
          dark: 'hsl(210 40% 98%)',
        },
      },
    },
  },
  plugins: [],
}

