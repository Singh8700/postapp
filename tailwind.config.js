const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
};