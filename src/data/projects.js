// 项目展示数据 —— 增删改项目只需编辑这个数组
// image: 项目截图或封面图路径（可留空用占位渐变）
// status: 'done' | 'building' | 'experiment' —— 分别显示"已完成"/"进行中"/"实验性"
// links: 外部链接 [{ label, url }]，支持 GitHub、演示等
// tags: 技术标签，渲染为彩色小标签
export const projects = [
  {
    title: '个人网站',
    desc: 'Vite + Tailwind CSS 构建的个人作品集，暗色模式、响应式、数据驱动渲染。边学边做，持续迭代中。',
    tags: ['HTML', 'Tailwind CSS', 'JavaScript', 'Vite'],
    image: '',
    status: 'building',
    links: [
      { label: '源代码', url: 'https://github.com/sishui945/my-portfolio' },
    ],
  },
  {
    title: 'BMP 图片解析器',
    desc: 'C++ 写的 BMP 格式解析工具，支持读取文件头、信息头、像素数据，输出为 PPM 格式验证正确性。',
    tags: ['C++', '二进制格式', 'RAII', 'CMake'],
    image: '',
    status: 'building',
    links: [
      { label: '源代码', url: 'https://github.com/sishui945/bmp-parser' },
    ],
  },
  {
    title: 'Minecraft Mod',
    desc: 'Fabric 模组开发入门项目，自定义方块、物品、合成配方，实现右键交互功能。',
    tags: ['Java', 'Fabric', 'Gradle'],
    image: '',
    status: 'experiment',
    links: [],
  },
  {
    title: 'Blender 建模作品',
    desc: '低多边形场景与角色建模练习，包含材质贴图、灯光、渲染输出。',
    tags: ['Blender', '3D建模', '材质'],
    image: '',
    status: 'done',
    links: [],
  },
];
