// 暗色模式 —— 通过 <theme-button> Web Component 切换
// theme-button 自行从 localStorage 读取初始状态，保证视觉一致
const DARK_CLASS = 'dark';
const STORAGE_KEY = 'theme';

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
}

export function initTheme() {
  applyTheme(getInitialTheme());

  const btn = document.querySelector('theme-button');
  if (!btn) return;

  btn.addEventListener('change', (e) => {
    applyTheme(e.detail);
    localStorage.setItem(STORAGE_KEY, e.detail);
  });
}
