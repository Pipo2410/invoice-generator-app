/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  importOrder: ['<THIRD_PARTY_MODULES>', '^@(assets/|/)(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
