module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-for-in-array': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/prefer-nullish-coalescing':'off',
    '@typescript-eslint/no-invalid-void-type':'off'
  }
}
