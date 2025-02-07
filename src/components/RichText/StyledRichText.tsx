import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as BaseRichText } from '@payloadcms/richtext-lexical/react'
import React from 'react'
import { createRichTextConverter, type NodeStyle } from '@/utilities/rich-text'
import { cn } from '@/utilities/ui'

export interface StyledRichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  data: SerializedEditorState
  styles: NodeStyle[]
}

export function StyledRichText({ data, styles, className, ...props }: StyledRichTextProps) {
  const jsxConverters = React.useMemo(() => createRichTextConverter(styles), [styles])

  return (
    <BaseRichText
      data={data}
      converters={jsxConverters}
      className={cn('space-y-4', className)}
      {...props}
    />
  )
}
