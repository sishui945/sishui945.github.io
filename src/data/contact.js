// 联系方式数据 —— 增删改联系方式只需修改这个数组
export const contacts = [
  {
    label: '邮箱',
    // mailto: 协议 —— 点击直接打开系统默认邮件客户端
    url: 'mailto:3693657762@qq.com',
    handle: '3693657762@qq.com',
    emoji: '📧',
    // 邮箱不需要 target="_blank"，直接用当前页跳转邮件客户端即可
    external: false
  },
  {
    label: 'GitHub',
    url: 'https://github.com/sishui945',
    handle: '@sishui945',
    emoji: '🐙',
    // target="_blank" 在新标签页打开 + rel="noopener noreferrer" 防安全漏洞
    external: true
  },
  {
    label: 'B站',
    url: 'https://space.bilibili.com/1909585735',
    handle: '@B站主页',
    emoji: '📺',
    external: true
  }
];
