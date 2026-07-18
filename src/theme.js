// 暗色模式 —— 手动切换 + 记住用户选择
// 原理：在 <html> 上切换 'dark' class，Tailwind 的 darkMode: 'class' 会自动响应
// localStorage 存用户偏好，刷新页面不丢失

const DARK_CLASS = 'dark';
const STORAGE_KEY = 'theme';

/**
 * 获取初始主题：用户之前选过就用它，否则跟系统走
 * prefers-color-scheme 是浏览器层面的系统主题偏好
 */
function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored; // 用户手动选过
  // matchMedia 查询系统是深色还是浅色
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** 应用主题到页面 */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add(DARK_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
  }
}

/** 切换主题并保存 */
function toggleTheme() {
  const isDark = document.documentElement.classList.contains(DARK_CLASS);
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
  updateIcon(next);
}

/** 更新切换按钮图标 */
function updateIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  // 浅色模式显示月亮（准备切到暗色），暗色模式显示太阳（准备切到亮色）
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式');
}

/**
 * 初始化主题系统
 * 调用时机：页面 DOM 加载完成后
 */
export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
  updateIcon(theme);

  // 绑定切换按钮
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
}
