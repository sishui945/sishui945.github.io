bat 双击（删文章）：
双击 delete-post.bat，输入 slug → 回车

  命令行（删任意类型）：
  cd backend
  npx tsx delete.ts post cpp-fundation     # 删文章
  npx tsx delete.ts tutorial cpp           # 删教程
  npx tsx delete.ts project 1              # 删项目（用 id）
  npx tsx delete.ts tag tutorial           # 删标签