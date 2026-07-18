// 渲染函数 —— 负责把数据变成 HTML DOM，数据和视图的唯一桥梁
// 未来如果要改卡片样式，只改这里的模板字符串即可

/**
 * 渲染技能卡片到指定容器
 * @param {HTMLElement} container - 技能卡片的父容器
 * @param {Array} data - 技能数据数组，每项 { name, desc, percent, emoji }
 */
export function renderSkills(container, data) {
  container.innerHTML = data.map(skill => `
    <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <!-- 图标 -->
      <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
                  rounded-lg flex items-center justify-center mb-4 text-2xl"
           aria-hidden="true">${skill.emoji}</div>

      <h3 class="text-lg font-bold mb-2 dark:text-white">${skill.name}</h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${skill.desc}</p>

      <!-- 进度条 -->
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-1">
        <span>掌握程度</span>
        <span>${skill.percent}%</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
           role="progressbar" aria-valuenow="${skill.percent}" aria-valuemin="0" aria-valuemax="100"
           aria-label="${skill.name} 掌握程度">
        <div class="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-1000"
             style="width: ${skill.percent}%"></div>
      </div>
    </div>
  `).join('');
}

/**
 * 渲染联系卡片到指定容器
 * @param {HTMLElement} container - 联系卡片的父容器
 * @param {Array} data - 联系数据数组
 */
export function renderContact(container, data) {
  container.innerHTML = data.map(item => {
    // 外部链接需要安全属性
    const extAttrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `
      <a href="${item.url}"${extAttrs}
         class="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
        <div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
                    rounded-xl flex items-center justify-center mx-auto mb-4 text-3xl
                    group-hover:scale-110 transition-transform"
             aria-hidden="true">${item.emoji}</div>
        <h3 class="text-lg font-bold mb-1 dark:text-white">${item.label}</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm break-all">${item.handle}</p>
      </a>
    `;
  }).join('');
}
