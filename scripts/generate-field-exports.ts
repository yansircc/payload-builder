import fs from 'node:fs'
import path from 'node:path'
import { getAllFiles } from './utils/files'
import { generateHeroConstants } from './utils/hero-constants'
import { generateHeroConfig } from './utils/hero-config'

// 定义需要处理的目录配置
const dirsConfig = [
  {
    dir: 'src/fields',
    output: 'src/fields/index.ts',
    addExtension: false,
    generateConfig: {
      output: 'src/heros/config.ts',
      template: `import type { Field } from 'payload'

import * as fields from '@/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { getHeroOptions } from './constants'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: getHeroOptions(),
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
{{FIELD_ENTRIES}}
  ],
  label: false,
}
`,
    },
  },
  {
    dir: 'src/heros/custom',
    output: 'src/heros/custom/index.ts',
    addExtension: false,
    generateConstants: {
      output: 'src/heros/constants.ts',
      template: `import type { Page } from '@/payload-types'
import { HighImpactHero } from './HighImpact'
import * as heros from './custom'

/**
 * Hero 配置定义
 * @description 统一管理 hero 组件的类型、标签和组件映射
 */
export const HEROES = {
  NONE: {
    value: 'none',
    label: 'None',
    Component: () => null,
  },
  HIGH_IMPACT: {
    value: 'highImpact',
    label: '高冲击',
    Component: HighImpactHero,
  },
  {{HERO_ENTRIES}}
} as const

export type HeroType = (typeof HEROES)[keyof typeof HEROES]['value']
export type HeroComponent = (typeof HEROES)[keyof typeof HEROES]['Component']

// 用于快速访问的工具函数
export const getHeroOptions = () =>
  Object.values(HEROES).map(({ value, label }) => ({ value, label }))

// 获取组件映射
export const getHeroComponents = () =>
  Object.fromEntries(
    Object.values(HEROES).map(({ value, Component }) => [value, Component]),
  ) as Record<HeroType, React.FC<Page['hero']>>
`,
    },
  },
]

// 生成导出函数
function generateExports(
  dirPath: string,
  outputPath: string,
  addExtension: boolean,
  generateConstants?: {
    output: string
    template: string
  },
  generateConfig?: {
    output: string
    template: string
  },
) {
  const files = getAllFiles(dirPath)
  const defaultExportFiles = files.filter((file) => {
    const content = fs.readFileSync(file, 'utf-8')
    return content.includes('export default')
  })

  // 生成导出语句
  const exports = defaultExportFiles
    .map((file) => {
      const relativePath = path.relative(dirPath, file)
      const dirName = path.basename(path.dirname(relativePath))
      const fileName = path.basename(file, path.extname(file))
      const name = fileName === 'index' ? dirName : fileName
      let importPath = './' + relativePath.replace(/\.(ts|tsx)$/, '')
      importPath = importPath.replace(/\/index$/, '')
      if (addExtension && !relativePath.includes('index')) {
        importPath = importPath.replace(/\.ts$/, '')
        importPath += '.ts'
      }
      return `export { default as ${name} } from '${importPath}'`
    })
    .join('\n')

  // 写入 index.ts
  fs.writeFileSync(path.join(process.cwd(), outputPath), `${exports}\n`)

  // 如果需要生成常量文件
  if (generateConstants) {
    generateHeroConstants(
      defaultExportFiles,
      dirPath,
      generateConstants.output,
      generateConstants.template,
    )
  }

  // 如果需要生成配置文件
  if (generateConfig) {
    generateHeroConfig(defaultExportFiles, dirPath, generateConfig.output, generateConfig.template)
  }
}

// 处理所有配置的目录
dirsConfig.forEach(({ dir, output, addExtension, generateConstants, generateConfig }) => {
  const dirPath = path.join(process.cwd(), dir)
  generateExports(dirPath, output, addExtension, generateConstants, generateConfig)
})
