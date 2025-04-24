/*colors: {
  neonGreen: '#39FF14',
  neonPink: '#FF1493',
  neonBlue: '#00FFFF',
  neonPurple: '#A020F0',
},

fontFamily: {
  'instrument': ['"Instrument Sans"', 'sans-serif'], // Add Instrument Sans
},
*/



module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'instrument': ['"Instrument Sans"', 'sans-serif'], // Add Instrument Sans
      },
      boxShadow: {
        'custom': '0 .28vw .57vw 0 rgba(0, 0, 0, 0.2), 0 .42vw 1.42vw 0 rgba(0, 0, 0, 0.19)', // Add your custom shadow here
      },
      keyframes: {
        'fade-in-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-slide-up': 'fade-in-slide-up 0.5s ease-out forwards',
      },

      boxShadow: {
        'custom-gray': '10px 10px 5px gray',
      },

      colors: {
        'custom-dark': 'rgb(24, 26, 27)', // Existing color
        'custom-dark-2': 'rgb(55, 59, 61)', // New custom color
      },
      
    },
  },
  plugins: [],
}
