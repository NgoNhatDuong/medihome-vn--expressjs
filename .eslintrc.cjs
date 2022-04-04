module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
        project: ['./tsconfig.json'],
    },
    rules: {
        'prettier/prettier': ['error'],
        'no-unused-vars': 0, // khai báo biến mà không sử dụng sẽ lỗi
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': 0, // class interface không được để trống :()
        '@typescript-eslint/no-empty-function': 0, // hàm phải có thân hàm
        'class-methods-use-this': 0, // bắt buộc phải có 'this' trong thân hàm của class, nếu không hàm đấy phải là hàm static, vc chưa
        '@typescript-eslint/no-explicit-any': 0, // không cho dùng type any
        'no-console': 0,
        'no-useless-concat': 0, // Bắt buộc viết 1 chuỗi, ko để dạng cộng 2 chuỗi, vcc
        'prefer-template': 0, // Bắt buộc dùng template string khi cộng chuỗi, vcc
        'import/prefer-default-export': 0, // Nếu export 1 biến thì mặc định phải là default, vcc
        'max-classes-per-file': 0, // lỗi tối đa 1 class trong 1 file
        'no-underscore-dangle': 0, // lỗi không được sử dụng ký tự _
        'import/no-cycle': 0, // lỗi A import B, B import A ==> vẫn cần thiết phải sử dụng khi dùng entity
    },
}
