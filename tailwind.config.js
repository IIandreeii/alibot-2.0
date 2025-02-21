module.exports = {
    content: [
      "./src/**/*.{html,ts,scss}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ["DM Serif Display", 'serif'],
          sans: ["DM Sans", 'sans-serif'],
        },
        colors: {
          primary: {
            light: '#67e8f9',
            default: '#ffc525',
            dark: '#5D5D77',
            darkDefault: '#23303B',
            black: '#181726'
          },
          secondary: {
            light: '#ECE7F8',
            light80: '#B49EE3',
            light20: '#ECE7F8',
            default: '#A186DC',
            dark: '#353455',
            purple: '#C7B6EA',
            purple80: '#5D5D77',
          },
          status: {
            error: '#DA4100'
          }
        },
        keyframes: {
          scroll: {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(calc(-250px * 7))' },
          },
        },
        animation: {
          scroll: 'scroll 40s linear infinite',
        },
      },
    },
    plugins: [],
  }
  