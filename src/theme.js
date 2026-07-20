// 暗色模式 —— 通过 <theme-button> Web Component 切换
const DARK_CLASS = 'dark';
const STORAGE_KEY = 'theme';

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add(DARK_CLASS);
  } else {
    document.documentElement.classList.remove(DARK_CLASS);
  }
}

export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);

  const btn = document.querySelector('theme-button');
  if (!btn) return;

  // 设置组件初始状态
  btn.setAttribute('value', theme);

  // 用户点击按钮 → 同步到页面
  btn.addEventListener('change', (e) => {
    applyTheme(e.detail);
    localStorage.setItem(STORAGE_KEY, e.detail);
  });

  // 系统主题变化 → 同步到按钮（仅在用户未手动设置时）
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      btn.setAttribute('value', e.matches ? 'dark' : 'light');
    }
  });
}
