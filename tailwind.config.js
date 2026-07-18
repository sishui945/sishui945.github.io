/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // 使用 class 策略：手动在 <html> 上加 'dark' class 切换暗色模式
    // 比 'media' 策略灵活：用户可以手动选择，不受系统设置限制
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [],
}