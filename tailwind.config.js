/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SangSangShin: ["SangSangShin"],
        PyeongChangPeace: ["PyeongChangPeace-Bold"],
        JeonjuCraftGoR: ["JeonjuCraftGoR"],
        WhiteAngelica: ["WhiteAngelica.ttf"],
      },
    },
  },
  plugins: [],
};
