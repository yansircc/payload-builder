# 工作流程

1. 创建/修改字段

   - 在创建collection、field或block时，使用英文填写label字段
   - 确保使用清晰、描述性的英文标签
   - 可以添加JSDoc注释来提供更详细的字段描述

2. 生成类型文件

   ```bash
   bun generate:types
   ```

   - 这会生成payload-types.ts
   - 该文件包含所有collection和field的类型定义
   - 翻译脚本会扫描这个文件来收集需要翻译的内容

3. 生成翻译文件

   ```bash
   bun generate:translations
   ```

   - 这会生成以下的5个文件

     ```bash
     src/i18n
     ├── collections.template.ts # 集合相关的翻译模板文件
     ├── collections.ts # 实际的集合翻译文件（包含已翻译内容）
     ├── common-fields.template.ts # 公共字段的翻译模板文件
     ├── common-fields.ts # 实际的公共字段翻译文件（包含已翻译内容）
     └── types.ts # 翻译相关的TypeScript类型定义
     ```

   - template文件（\*.template.ts）包含所有需要翻译的英文内容
   - 实际翻译文件（不带.template）保存了已翻译的内容

4. 翻译工作流

   - 检查.template.ts文件中的新增内容
   - 在对应的实际翻译文件中添加翻译
   - 不要直接修改.template.ts文件，它们会在每次运行脚本时重新生成
   - 已有的中文翻译会被保留，不会被覆盖

5. 翻译文件说明

   - common-fields.ts：存储在多个collection中重复使用的字段翻译
   - collections.ts：存储每个collection特有的字段翻译
   - 每个翻译条目都包含en（英文）和zh（中文）两个字段

6. 使用翻译

```typescript
import { createFieldLabel } from '@/i18n'

// Basic Collection Config
export const PostsConfig = {
  label: createFieldLabel('posts', undefined, 'Posts'),
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: createFieldLabel('title'),
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: createFieldLabel('heroImage', 'posts', 'Hero Image'),
    },
  ],
}

// Table Columns
export const tableColumns = [
  {
    header: createFieldLabel('title'),
    accessorKey: 'title',
  },
]

// Validation Messages
export const validationMessages = {
  required: (fieldName: string) => {
    const label = toTranslation(createFieldLabel(fieldName))
    return {
      en: `${label.en} is required`,
      zh: `${label.zh}是必填项`,
    }
  },
}
```

# 注意事项

1. 模板文件（\*.template.ts）

   - 这些文件会在每次运行generate:translations时重新生成
   - 不要手动修改这些文件，因为修改会被覆盖
   - 用于跟踪需要翻译的最新内容

2. 实际翻译文件

   - collections.ts和common-fields.ts保存实际的翻译内容
   - 这些文件会保留已有的中文翻译
   - 只有新增的英文内容会被更新
   - 删除的字段对应的翻译会被自动清理

3. 类型安全

   - types.ts提供了完整的类型定义
   - 所有的翻译操作都是类型安全的
   - 使用TypeScript的类型检查来确保翻译的完整性

4. 最佳实践
   - 定期运行generate:translations来同步最新的翻译需求
   - 在添加新字段时，提供清晰的英文描述
   - 使用JSDoc注释来提供更详细的字段说明
   - 保持翻译文件的整洁，删除不再使用的翻译
   - 生成之前，为了防止丢失，可以先备份一下
