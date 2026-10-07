/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Cue card navy from the exam document
  			navy: {
  				'50': '#EEF2F9',
  				'100': '#DCE4F2',
  				'200': '#B9C8E4',
  				'500': '#3D5C98',
  				'600': '#2B4A80',
  				DEFAULT: '#1F3864',
  				'800': '#172A4C',
  				'900': '#0F1C33'
  			},
  			// Sulaiman Alrajhi University logo colours
  			brand: {
  				cyan: '#00ADD9',
  				purple: '#4F2385',
  				gray: '#9EA9AE'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '0 1px 2px rgba(15, 28, 51, 0.06), 0 24px 60px -24px rgba(31, 56, 100, 0.35)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'card-in': {
  				from: {
  					opacity: '0',
  					transform: 'perspective(1200px) translateY(18px) rotateX(6deg) scale(0.985)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'none'
  				}
  			},
  			'rise-in': {
  				from: {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'none'
  				}
  			},
  			blink: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.35'
  				}
  			},
  			attention: {
  				'0%': {
  					boxShadow: '0 0 0 0 rgba(125, 211, 252, 0.7)'
  				},
  				'70%, 100%': {
  					boxShadow: '0 0 0 14px rgba(125, 211, 252, 0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'card-in': 'card-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
  			'rise-in': 'rise-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
  			blink: 'blink 1s ease-in-out infinite',
  			attention: 'attention 1.6s ease-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
