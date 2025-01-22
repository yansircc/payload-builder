# Hero 组件开发指南

本指南旨在帮助开发者理解和实现 Hero 组件的开发流程。通过遵循这个指南，你可以创建出一个新的 Hero 组件。

## 目录

1. [文件结构](#1-文件结构)
2. [配置文件](#2-配置文件)
3. [组件开发](#3-组件开发)
4. [常见问题](#4-常见问题)
5. [开发步骤](#5-开发步骤)
6. [注意事项](#6-注意事项)
7. [代码审查](#7-代码审查)

## 1. 文件结构

每个 Hero 组件都应该遵循以下文件结构：

```
src/heros/custom/Hero{N}/
├── index.tsx      // 主组件文件
└── config.ts      // 配置文件
```

## 2. 配置文件

`config.ts` 文件定义了组件的数据结构和管理界面配置。以下是一个基础配置示例，你可以根据实际需求进行调整：

```typescript
import { Block } from 'payload/types'

export const HeroNConfig: Block = {
  slug: 'heroN', // 替换N为你的组件编号
  labels: {
    singular: 'Hero N',
    plural: 'Hero Ns',
  },
  fields: [
    // 基础字段
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },

    // 媒体字段
    {
      name: 'media', // 或 logo, background 等
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    // 链接字段 - 方式1：单个链接
    {
      name: 'primaryLink',
      type: 'link',
    },

    // 链接字段 - 方式2：链接组（推荐）
    {
      name: 'linkGroup',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'link',
              required: true,
            },
          ],
        },
      ],
    },

    // 其他可选字段
    {
      name: 'theme',
      type: 'select',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}
```

### 2.1 配置注意事项

1. **字段命名规范**

   - 使用驼峰命名
   - 名称要具有描述性
   - 保持与其他 Hero 组件的一致性

2. **链接处理**

   - 推荐使用 `linkGroup` 而不是单独的 `link` 字段
   - `linkGroup` 必须包含 `label` 和 `link` 两个子字段
   - 注意 `link` 字段的嵌套层级，错误的层级会导致类型问题

3. **常见陷阱**
   - `link` 字段必须放在 `group` 类型内
   - 避免过深的字段嵌套
   - 必填字段要谨慎设置，考虑实际需求

## 3. 组件开发

### 3.1 类型定义

首先定义组件的数据类型：

```typescript
type HeroNData = NonNullable<NonNullable<Page['hero']>['heroN']>
```

### 3.2 图片处理

图片处理是一个关键点，需要特别注意尺寸控制：

```typescript
// 推荐的图片容器结构
<div className="inline-flex h-16">
  <Media
    resource={logo}
    className="h-full w-auto"
    imgClassName="h-full w-auto object-contain"
  />
</div>
```

关键点：

- 使用 `inline-flex` 让容器自适应内容大小
- 只设置高度，让宽度自动适应
- 使用 `object-contain` 保持图片比例

### 3.3 动画效果

使用 `ClientMotionDiv` 实现动画效果：

```typescript
<ClientMotionDiv
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* 内容 */}
</ClientMotionDiv>
```

动画建议：

- 为不同元素设置不同的延迟
- 使用适当的动画持续时间
- 考虑性能影响

### 3.4 主题控制

使用 `ThemeEffect` 组件控制主题：

```typescript
<ThemeEffect theme="dark" />
```

## 4. 常见问题

### 4.1 图片尺寸问题

问题：图片超出容器尺寸
解决方案：

```typescript
// ❌ 错误示例
<div className="h-16">
  <Media resource={logo} className="h-16" />
</div>

// ✅ 正确示例
<div className="inline-flex h-16">
  <Media
    resource={logo}
    className="h-full w-auto"
    imgClassName="h-full w-auto object-contain"
  />
</div>
```

### 4.2 链接处理

使用 `CMSLink` 组件处理所有链接：

```typescript
<CMSLink
  {...link}
  suffixElement={i === 1 ? <ExternalLink className="ml-2 h-4" /> : undefined}
/>
```

### 4.3 链接组处理

处理 `linkGroup` 时的常见问题：

```typescript
// ❌ 错误示例：直接使用 link 字段
{
  name: 'links',
  type: 'array',
  fields: [
    {
      name: 'link',
      type: 'link',  // 这样会导致类型错误
    }
  ]
}

// ✅ 正确示例：使用 group 包装
{
  name: 'linkGroup',
  type: 'array',
  fields: [
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'link',
          required: true,
        }
      ]
    }
  ]
}
```

使用时的正确方式：

```typescript
{linkGroup?.map(({ link: { label, link } }, i) => (
  <CMSLink
    key={i}
    {...link}
    label={label}
    suffixElement={i === 1 ? <ExternalLink className="ml-2 h-4" /> : undefined}
  />
))}
```

## 5. 开发步骤

1. 创建基础文件

   - 创建组件目录
   - 创建 `config.ts` 和 `index.tsx`

2. 配置文件开发

   - 定义组件字段
   - 设置验证规则
   - 添加必要的关联

3. 组件实现

   - 实现基础布局
   - 添加动画效果
   - 处理响应式设计
   - 实现主题切换

4. 测试和优化
   - 测试所有属性
   - 验证响应式布局
   - 检查动画效果
   - 验证图片尺寸

## 6. 注意事项

### 6.1 类型安全

- 使用 TypeScript 类型定义
- 处理可能的空值
- 验证数据结构

### 6.2 性能优化

- 合理使用动画
- 优化图片加载
- 控制重渲染

### 6.3 代码规范

- 添加中文注释
- 保持代码结构清晰
- 使用语义化命名

### 6.4 响应式设计

- 使用 Tailwind 响应式类
- 测试多种屏幕尺寸
- 确保移动端体验

## 7. 代码审查

在提交代码前，请检查以下项目：

- [ ] 类型定义完整
- [ ] 图片尺寸约束正确
- [ ] 动画效果流畅
- [ ] 响应式布局正常
- [ ] 主题切换正常
- [ ] 代码注释完整
- [ ] 没有未使用的导入
- [ ] 组件命名规范

## 最佳实践示例

完整的组件示例：

```typescript
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { ClientMotionDiv } from '@/heros/share/motion'
import { ThemeEffect } from '@/heros/share/ThemeEffect'

type HeroNData = NonNullable<NonNullable<Page['hero']>['heroN']>

export default function HeroN({ badge, title, description, logo, links, partners }: HeroNData) {
  return (
    <section className="relative overflow-hidden py-32">
      <ThemeEffect theme="dark" />
      <div className="container">
        {/* 主要内容 */}
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <ClientMotionDiv
            className="z-10 flex flex-col items-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            {logo && typeof logo === 'object' && (
              <div className="inline-flex h-16">
                <Media
                  resource={logo}
                  className="h-full w-auto"
                  imgClassName="h-full w-auto object-contain"
                />
              </div>
            )}

            {/* 其他内容... */}
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  )
}
```

## 结语

遵循本指南可以帮助你创建高质量的 Hero 组件。记住要关注类型安全、性能优化和用户体验。如有任何问题，请参考现有的 Hero 组件实现或咨询团队成员。
