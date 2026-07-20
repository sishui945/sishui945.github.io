// 渲染函数 —— 负责把数据变成 HTML DOM，数据和视图的唯一桥梁

// ========== 辅助函数 ==========

/** 等级对应的中文和颜色 */
const LEVEL_MAP = {
  comfortable: { label: '熟练', cls: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800' },
  learning:    { label: '学习中', cls: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800' },
  exploring:   { label: '初探', cls: 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600' },
};

const STATUS_MAP = {
  building:   { label: '进行中', cls: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800' },
  done:       { label: '已完成', cls: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800' },
  experiment: { label: '实验性', cls: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800' },
};

// ========== Hero 兴趣徽章 ==========

/**
 * 渲染兴趣徽章到 Hero 区
 * @param {HTMLElement} container
 * @param {Array} data — [{ label, emoji }]
 */
export function renderInterests(container, data) {
  container.innerHTML = data.map(item => `
    <span class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full
                 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm
                 border border-gray-200/60 dark:border-gray-700/60
                 text-gray-700 dark:text-gray-300
                 hover:scale-105 transition-transform cursor-default">
      <span aria-hidden="true">${item.emoji}</span>
      ${item.label}
    </span>
  `).join('');
}

// ========== 技能卡片（按类别分组） ==========

/**
 * 渲染技能卡片到指定容器，按类别分组
 * @param {HTMLElement} container
 * @param {Array} categories — [{ category, icon, skills: [{ name, desc, level, emoji }] }]
 */
export function renderSkills(container, categories) {
  container.innerHTML = categories.map(cat => `
    <!-- 类别标题 -->
    <div class="md:col-span-2 lg:col-span-3 flex items-center gap-3 mt-8 first:mt-0">
      <span class="text-2xl" aria-hidden="true">${cat.icon}</span>
      <h3 class="text-xl font-bold dark:text-white">${cat.category}</h3>
      <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
    </div>

    ${cat.skills.map(skill => {
      const lv = LEVEL_MAP[skill.level];
      return `
        <div class="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700
                    hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-center justify-between mb-2">
            <span class="text-2xl" aria-hidden="true">${skill.emoji}</span>
            <span class="px-2 py-0.5 text-xs rounded-full border ${lv.cls}">${lv.label}</span>
          </div>
          <h4 class="font-bold mb-1 dark:text-white">${skill.name}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">${skill.desc}</p>
        </div>
      `;
    }).join('')}
  `).join('');
}

// ========== 项目卡片 ==========

/**
 * 渲染项目卡片到指定容器
 * @param {HTMLElement} container
 * @param {Array} data — [{ title, desc, tags, image, status, links }]
 */
export function renderProjects(container, data) {
  container.innerHTML = data.map(project => {
    const st = STATUS_MAP[project.status] || STATUS_MAP.building;
    return `
      <div class="relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                  overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <!-- 状态角标 -->
        <span class="absolute top-3 right-3 z-10 px-2 py-0.5 text-xs rounded-full border ${st.cls}">${st.label}</span>

        <!-- 图片区 -->
        ${project.image
          ? `<img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover">`
          : `<div class="w-full h-40 bg-gradient-to-br from-indigo-400 to-purple-500
                        flex items-center justify-center text-white text-4xl"
                 aria-hidden="true">📂</div>`
        }

        <!-- 文字区 -->
        <div class="p-5">
          <h3 class="text-lg font-bold mb-2 dark:text-white">${project.title}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">${project.desc}</p>

          <!-- 技术标签 -->
          <div class="flex flex-wrap gap-1.5 mb-3">
            ${project.tags.map(tag => `
              <span class="px-2 py-0.5 text-xs rounded-full
                           bg-indigo-50 dark:bg-indigo-900/20
                           text-indigo-600 dark:text-indigo-400
                           border border-indigo-100 dark:border-indigo-800">
                ${tag}
              </span>
            `).join('')}
          </div>

          <!-- 外部链接 -->
          ${project.links && project.links.length
            ? `<div class="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-700">
                ${project.links.map(link => `
                  <a href="${link.url}" target="_blank" rel="noopener noreferrer"
                     class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline
                            inline-flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    ${link.label}
                  </a>
                `).join('')}
               </div>`
            : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ========== 技能标签云 ==========

/**
 * 渲染技能标签云到指定容器
 * @param {HTMLElement} container
 * @param {Array} tags — [{ label, level }]，level 为 1-100
 */
export function renderTagCloud(container, tags) {
  const sorted = [...tags].sort((a, b) => b.level - a.level);

  container.innerHTML = sorted.map(tag => {
    const size = 0.75 + (tag.level / 100) * 0.5;
    return `
      <span class="inline-block px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20
                   text-indigo-700 dark:text-indigo-300 rounded-full
                   hover:bg-indigo-100 dark:hover:bg-indigo-900/40
                   hover:scale-110 transition-all duration-200 cursor-default
                   border border-indigo-200 dark:border-indigo-800"
            style="font-size: ${size}rem"
            title="${tag.label}">
        ${tag.label}
      </span>
    `;
  }).join('');
}

// ========== 博客预览卡片 ==========

/**
 * 渲染博客文章预览卡片
 * @param {HTMLElement} container
 * @param {Array} posts — [{ title, date, excerpt, tags[], slug }]
 */
export function renderBlogPreview(container, posts) {
  container.innerHTML = posts.map(post => `
    <article class="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
        <time datetime="${post.date}">${post.date}</time>
      </div>
      <h3 class="text-lg font-bold mb-2 dark:text-white">
        <a href="/blog/post.html?slug=${post.slug}"
           class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          ${post.title}
        </a>
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">${post.excerpt}</p>
      <div class="flex flex-wrap gap-1.5">
        ${post.tags.map(tag => `
          <span class="px-2 py-0.5 text-xs rounded-full
                       bg-indigo-50 dark:bg-indigo-900/20
                       text-indigo-600 dark:text-indigo-400
                       border border-indigo-100 dark:border-indigo-800">
            ${tag}
          </span>
        `).join('')}
      </div>
    </article>
  `).join('');
}

// ========== 联系卡片 ==========

/**
 * 渲染联系卡片到指定容器
 * @param {HTMLElement} container
 * @param {Array} data
 */
export function renderContact(container, data) {
  container.innerHTML = data.map(item => {
    const extAttrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `
      <a href="${item.url}"${extAttrs}
         class="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800
                rounded-full border border-gray-200 dark:border-gray-700
                hover:border-indigo-300 dark:hover:border-indigo-700
                hover:shadow-sm transition-all duration-300 text-sm">
        <span class="text-lg" aria-hidden="true">${item.emoji}</span>
        <span class="font-medium dark:text-white">${item.label}</span>
        <span class="text-gray-400 dark:text-gray-500">${item.handle}</span>
      </a>
    `;
  }).join('');
}
