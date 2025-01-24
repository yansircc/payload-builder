# CTA 组件开发指南

本指南旨在帮助开发者理解和实现 CTA (Call to Action) 组件的开发流程。

## 目录

1. [文件结构](#1-文件结构)
2. [配置文件](#2-配置文件)
3. [组件开发](#3-组件开发)
4. [最佳实践](#4-最佳实践)

## 1. 文件结构

每个 CTA 组件应遵循以下文件结构：

```
src/blocks/CallToAction/custom/CTA{N}/
├── index.tsx      // 主组件文件
└── config.ts      // 配置文件
```

## 2. 配置文件

`config.ts` 文件定义了组件的数据结构和管理界面配置：

```typescript
import type { Block } from 'payload/types'

export const cta1Config: Block = {
  slug: 'cta1',
  labels: {
    singular: 'CTA 1',
    plural: 'CTA 1s',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'primaryButton',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
    // ... 其他字段
  ],
}
```

## 3. 组件开发

### 3.1 基本结构

```typescript
import type { Page } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ClientMotionDiv } from '@/components/motion'

type CTA1Data = NonNullable<NonNullable<Page['layout']>[0]>['cta1']

export default function CTA1({ title, description, buttons }: CTA1Data) {
  return (
    <section className="py-32">
      {/* 组件内容 */}
    </section>
  )
}
```

### 3.2 动画效果

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

## 4. 最佳实践

### 4.1 响应式设计

- 使用 Tailwind 的响应式类
- 移动优先的设计方法
- 合理的间距和布局

### 4.2 按钮处理

- 使用 `Button` 组件
- 提供合适的变体选项
- 处理链接和点击事件

### 4.3 性能优化

- 使用 `ClientMotionDiv` 进行动画
- 避免不必要的重渲染
- 优化图片和资源加载

### 4.4 代码规范

- 添加中文注释
- 使用语义化命名
- 保持代码结构清晰

## 示例实现

完整的 CTA 组件示例：

```typescript
export default function CTA1({ title, description, buttons }: CTA1Data) {
  return (
    <section className="py-32">
      <div className="container">
        <ClientMotionDiv
          className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground lg:text-lg">{description}</p>
            )}
          </div>
          {buttons && (
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {buttons.map((button, i) => (
                <Button
                  key={i}
                  variant={i === 0 ? 'outline' : 'default'}
                  asChild
                >
                  <a href={button.link}>{button.label}</a>
                </Button>
              ))}
            </div>
          )}
        </ClientMotionDiv>
      </div>
    </section>
  )
}
```

## 检查清单

提交代码前，请检查以下项目：

- [ ] 类型定义完整
- [ ] 响应式布局正常
- [ ] 动画效果流畅
- [ ] 按钮交互正常
- [ ] 代码注释完整
- [ ] 没有未使用的导入
- [ ] 组件命名规范 