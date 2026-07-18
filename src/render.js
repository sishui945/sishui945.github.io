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
 * 渲染技能标签云到指定容器
 * 标签越大表示掌握程度越高，使用 flex-wrap 自动换行
 * @param {HTMLElement} container - 标签云的父容器
 * @param {Array} tags - 标签数据数组，每项 { label, level }，level 为 1-100
 */
export function renderTagCloud(container, tags) {
  // 按 level 降序排列，掌握度高的排前面
  const sorted = [...tags].sort((a, b) => b.level - a.level);

  container.innerHTML = sorted.map(tag => {
    // 根据 level 动态计算字号：1 → 0.75rem, 100 → 1.25rem
    const size = 0.75 + (tag.level / 100) * 0.5;
    return `
      <span class="inline-block px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20
                   text-blue-700 dark:text-blue-300 rounded-full
                   hover:bg-blue-100 dark:hover:bg-blue-900/40
                   hover:scale-110 transition-all duration-200 cursor-default
                   border border-blue-200 dark:border-blue-800"
            style="font-size: ${size}rem"
            title="${tag.label}">
        ${tag.label}
      </span>
    `;
  }).join('');
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

/**
 * 渲染项目卡片到指定容器
 * 图片（或占位渐变）+ 标题 + 描述 + 技术标签，hover 上浮
 * @param {HTMLElement} container
 * @param {Array} data - 项目数组，每项 { title, desc, tags, image }
 */
export function renderProjects(container, data) {
  container.innerHTML = data.map(project => `
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <!-- 图片区：有图片就显示，没有就用渐变色占位 -->
      ${project.image
        ? `<img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover">`
        : `<div class="w-full h-40 bg-gradient-to-br from-blue-400 to-purple-500
                      flex items-center justify-center text-white text-4xl"
               aria-hidden="true">📂</div>`
      }

      <!-- 文字区 -->
      <div class="p-5">
        <h3 class="text-lg font-bold mb-2 dark:text-white">${project.title}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">${project.desc}</p>

        <!-- 技术标签 -->
        <!-- flex-wrap: 标签多了自动换行 -->
        <div class="flex flex-wrap gap-1.5">
          ${project.tags.map(tag => `
            <span class="px-2 py-0.5 text-xs rounded-full
                         bg-blue-50 dark:bg-blue-900/20
                         text-blue-600 dark:text-blue-400
                         border border-blue-100 dark:border-blue-800">
              ${tag}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}
