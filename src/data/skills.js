// 技能数据 —— 按类别分组
// level: 'comfortable' = 能独立完成 | 'learning' = 正在学 | 'exploring' = 初探
export const skillCategories = [
  {
    category: '语言',
    icon: '💻',
    skills: [
      { name: 'C/C++',         desc: 'STL、RAII、现代C++特性',       level: 'comfortable', emoji: '⚙️' },
      { name: 'Java',          desc: 'OOP、集合框架、Gradle',        level: 'comfortable', emoji: '☕' },
      { name: 'JavaScript',    desc: 'ES6+、Promise、DOM 操作',      level: 'learning',    emoji: '⚡' },
      { name: 'Python',        desc: 'NumPy、SciPy、科学计算',       level: 'exploring',   emoji: '🐍' },
      { name: 'TypeScript',    desc: '类型系统、泛型、接口',          level: 'exploring',   emoji: '📘' },
    ],
  },
  {
    category: '前端',
    icon: '🎨',
    skills: [
      { name: 'HTML5 & CSS3',  desc: '语义化标签、Flexbox、Grid',    level: 'comfortable', emoji: '🌐' },
      { name: 'Tailwind CSS',  desc: 'Utility-first、响应式、暗色模式', level: 'learning',  emoji: '💨' },
      { name: 'Vue 3',         desc: 'Composition API、Router、Pinia', level: 'exploring',  emoji: '🟢' },
      { name: 'React',         desc: 'Hooks、JSX、组件化',            level: 'exploring',   emoji: '🔵' },
    ],
  },
  {
    category: '工具',
    icon: '🛠️',
    skills: [
      { name: 'VS Code',       desc: '日常主力编辑器',                level: 'comfortable', emoji: '🖥️' },
      { name: 'Git & GitHub',  desc: '版本控制、分支管理、协作流程',  level: 'learning',    emoji: '📦' },
      { name: 'Vite',          desc: '极速冷启动、ES Module 原生支持', level: 'learning',    emoji: '⚡' },
      { name: 'CMake',         desc: '跨平台构建、依赖管理',          level: 'exploring',   emoji: '📐' },
    ],
  },
  {
    category: '创意',
    icon: '✨',
    skills: [
      { name: 'Blender',       desc: '建模、材质、灯光、渲染',        level: 'learning',    emoji: '🧊' },
      { name: '游戏开发',      desc: 'Fabric Mod、UE5 入门',          level: 'exploring',   emoji: '🎮' },
      { name: '绘画',          desc: '数字绘画练习中',                level: 'exploring',   emoji: '🎨' },
    ],
  },
];
