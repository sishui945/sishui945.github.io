<template>
  <footer class="bg-gray-900 dark:bg-black text-gray-400 dark:text-gray-500 py-10 px-6" role="contentinfo">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      <!-- 品牌 -->
      <div>
        <p class="text-white dark:text-gray-200 font-bold mb-2">似水Sishui</p>
        <p>边学边做，在代码、物理与画笔之间探索世界。</p>
      </div>
      <!-- 快速链接 -->
      <div>
        <p class="text-white dark:text-gray-200 font-bold mb-2">快速链接</p>
        <ul class="space-y-1">
          <li><RouterLink to="/" class="hover:text-white dark:hover:text-gray-300 transition-colors">首页</RouterLink></li>
          <li><a href="/#projects" class="hover:text-white dark:hover:text-gray-300 transition-colors">项目</a></li>
          <li><RouterLink to="/blog" class="hover:text-white dark:hover:text-gray-300 transition-colors">博客</RouterLink></li>
        </ul>
      </div>
      <!-- 社交 -->
      <div>
        <p class="text-white dark:text-gray-200 font-bold mb-2">社交链接</p>
        <ul class="space-y-1">
          <li><a href="https://github.com/sishui945" target="_blank" rel="noopener noreferrer" class="hover:text-white dark:hover:text-gray-300 transition-colors">GitHub</a></li>
          <li><a href="https://space.bilibili.com/1909585735" target="_blank" rel="noopener noreferrer" class="hover:text-white dark:hover:text-gray-300 transition-colors">B站</a></li>
          <li><a href="mailto:3693657762@qq.com" class="hover:text-white dark:hover:text-gray-300 transition-colors">邮箱</a></li>
        </ul>
      </div>
    </div>
    <div class="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 dark:border-gray-800 text-center">
      <p>&copy; 2026 似水Sishui &middot; 使用 Vue + Tailwind CSS 构建</p>
    </div>
  </footer>
</template>
