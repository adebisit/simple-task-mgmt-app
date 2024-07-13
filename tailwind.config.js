const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)", "sans-serif"],
    },
    extend: {
      colors: {
        text_color: "var(--color-text)",
        text_color_secondary: "var(--text-color-secondary)",
        background_color_btn: "var(--color-btn)",
        text_color_btn: "var(--text-btn)",
        radio_btn_checked: "var(--color-radio-btn-checked)",
        radio_btn_unchecked: "var(--color-radio-btn-unchecked)",
      },
      backgroundColor: {
        background: "var(--color-background)",
      },
    },
  },
};

module.exports = config;
