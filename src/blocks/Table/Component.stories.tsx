import type { Meta, StoryObj } from '@storybook/react'
import { TableBlock } from './RenderTable'

const meta: Meta<typeof TableBlock> = {
  title: 'blocks/Table',
  component: TableBlock,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof TableBlock>

const sampleTable = `
<table class="w-full">
  <thead>
    <tr class="border-b">
      <th class="py-2 px-4 text-left">Product</th>
      <th class="py-2 px-4 text-left">Category</th>
      <th class="py-2 px-4 text-left">Price</th>
      <th class="py-2 px-4 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b">
      <td class="py-2 px-4">Product A</td>
      <td class="py-2 px-4">Electronics</td>
      <td class="py-2 px-4">$299.99</td>
      <td class="py-2 px-4">In Stock</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 px-4">Product B</td>
      <td class="py-2 px-4">Furniture</td>
      <td class="py-2 px-4">$599.99</td>
      <td class="py-2 px-4">Out of Stock</td>
    </tr>
    <tr>
      <td class="py-2 px-4">Product C</td>
      <td class="py-2 px-4">Accessories</td>
      <td class="py-2 px-4">$49.99</td>
      <td class="py-2 px-4">In Stock</td>
    </tr>
  </tbody>
</table>
`

const complexTable = `
<table class="w-full">
  <thead>
    <tr class="border-b">
      <th class="py-2 px-4 text-left" colspan="2">Company Performance</th>
      <th class="py-2 px-4 text-left">Q1</th>
      <th class="py-2 px-4 text-left">Q2</th>
      <th class="py-2 px-4 text-left">Q3</th>
      <th class="py-2 px-4 text-left">Q4</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b">
      <td class="py-2 px-4" rowspan="2">Revenue</td>
      <td class="py-2 px-4">Domestic</td>
      <td class="py-2 px-4">$1.2M</td>
      <td class="py-2 px-4">$1.4M</td>
      <td class="py-2 px-4">$1.6M</td>
      <td class="py-2 px-4">$1.8M</td>
    </tr>
    <tr class="border-b">
      <td class="py-2 px-4">International</td>
      <td class="py-2 px-4">$0.8M</td>
      <td class="py-2 px-4">$0.9M</td>
      <td class="py-2 px-4">$1.1M</td>
      <td class="py-2 px-4">$1.3M</td>
    </tr>
    <tr>
      <td class="py-2 px-4" colspan="2">Total Revenue</td>
      <td class="py-2 px-4">$2.0M</td>
      <td class="py-2 px-4">$2.3M</td>
      <td class="py-2 px-4">$2.7M</td>
      <td class="py-2 px-4">$3.1M</td>
    </tr>
  </tbody>
</table>
`

export const Default: Story = {
  args: {
    content: sampleTable,
    caption: 'Sample Product Table',
  },
}

export const ComplexTable: Story = {
  args: {
    content: complexTable,
    caption: 'Quarterly Revenue Report',
  },
}

export const WithoutCaption: Story = {
  args: {
    content: sampleTable,
  },
}

export const CustomClassName: Story = {
  args: {
    content: sampleTable,
    caption: 'Custom Styled Table',
    className: 'max-w-2xl',
  },
}
