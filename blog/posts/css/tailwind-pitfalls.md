用 Tailwind CSS 从零搭这个个人网站时，踩了几个坑。记录一下。

## 1. dark mode 配置

Tailwind 默认用 `media` 策略（跟随系统），但我需要手动切换，所以用 `class` 策略：

```js
// tailwind.config.js
export default {
  darkMode: 'class',  // 通过 <html class="dark"> 控制
  // ...
}
```

坑点：写 `dark:` 前缀的时候，必须保证父元素的 `dark:` 也设置了，否则会出现"子元素变黑了但父元素还是白的"的尴尬情况。尤其是嵌套的 `bg-white dark:bg-gray-800` 这种，漏一个就穿帮。

## 2. Grid 的 fr 单位

用 Tailwind 的 grid 类时，`grid-cols-[5fr_4fr]` 这种任意值写法需要注意：

- Tailwind 的任意值用下划线代替空格：`[5fr_4fr]` ✅，`[5fr 4fr]` ❌
- `md:grid-cols-2` 会**覆盖**自定义值，不是叠加
- 如果想让小屏 1 列、大屏 5fr 4fr：`grid-cols-1 lg:grid-cols-[5fr_4fr]`

## 3. class 优先级覆盖

Tailwind 类名没有 CSS 优先级问题（基本都在同一层级），但和自定义 CSS 混用时要注意：

```css
/* 这个会覆盖 Tailwind 的 text-indigo-600 */
.my-link { color: blue; }
```

解决办法：要么都用 Tailwind 类，要么在自定义 CSS 里用 `@apply`：

```css
.my-link {
  @apply text-indigo-600 hover:text-indigo-400;
}
```

## 4. 一些好用的 Tailwind 类

- `prose` — 文章内容排版（需要 `@tailwindcss/typography` 插件）
- `line-clamp-2` — 文本截断，超过 2 行显示省略号
- `backdrop-blur-md` — 导航栏毛玻璃效果
- `group` / `group-hover:` — 父元素 hover 时改变子元素样式

---

这些坑踩完一遍之后，Tailwind 写起来确实比手写 CSS 快很多。关键是**先想清楚设计再写类名**，而不是一边写一边调。
