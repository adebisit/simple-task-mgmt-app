const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: "var(--font-roboto)",
    },
    extend: {
      colors: {
        text_color: "var(--color-text)",
        text_color_secondary: "var(--color-text-secondary)",
        background_btn: "var(--color-background-btn)",
        text_color_btn: "var(--color-text-btn)",
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
