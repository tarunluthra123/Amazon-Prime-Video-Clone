module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                hulublue: "#06202A",
            },
            screens: {
                "3xl": "2000px",
            },
        },
    },
    variants: {
        extend: {
            animation: ["hover", "focus", "group-hover"],
            textColor: ["active", "hover", "group-hover"],
            padding: ["last"],
            opacity: ["group-hover"],
            textOpacity: ["group-hover"],
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
