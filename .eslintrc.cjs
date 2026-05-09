module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "import"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-undef": "off",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            target: "./src/features/animal-data",
            from: "./src/features",
            except: ["./animal-data"],
          },
          {
            target: "./src/features/animal-search",
            from: "./src/features",
            except: ["./animal-search"],
          },
          {
            target: "./src/features/animal-results",
            from: "./src/features",
            except: ["./animal-results"],
          },
          {
            target: "./src/features",
            from: "./src/app",
          },
          {
            target: "./src/shared",
            from: ["./src/app", "./src/features"],
          },
        ],
      },
    ],
  },
};
