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
                link: "#097099"
            },
            screens: {
                xs: "400px",
                "3xl": "2000px",
            },
            minWidth: {
                0: "0",
                "1/5": "20%",
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "75%",
                full: "100%",
            },
            spacing: {
                half: "50vh",
            },
            backgroundSize: {
                80: "80%",
                100: "100%",
                120: "120%",
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
            fontSize: ["hover", "focus", "group-hover"],
            backgroundSize: ["hover"],
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
