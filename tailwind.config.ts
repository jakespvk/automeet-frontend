import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontSize: {
            sm: '0.9rem',
            base: '1.15rem',
            lg: '1.25rem',
            xl: '1.35rem',
            '2xl': '1.5rem',
            '3xl': '1.9rem',
            '4xl': '2.4rem',
            '5xl': '3.0rem',
            '6xl': '4.0rem',
            '7xl': '4.5rem',
            '8xl': '6.0rem',
            '9xl': '8.0rem',
        },
        extend: {
        },
    },
    plugins: [require("tailwindcss-animate")],
}
export default config;
