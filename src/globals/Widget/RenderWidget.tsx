import type { Widget } from '@/payload-types'
import { getWidgets } from '@/utilities/getGlobals'
import { widgetComponents } from '.'

interface RenderWidgetProps {
  type?: Widget['widgetType']
}

export const RenderWidget = async ({ type }: RenderWidgetProps = {}) => {
  const widgetData: Widget | null = await getWidgets()
  if (!widgetData) return null

  // Only render that specific widget
  if (type) {
    const widgetConfig = widgetData[type]

    // Type guard to check if widgetConfig has isActive property
    if (!widgetConfig || typeof widgetConfig !== 'object' || !('isActive' in widgetConfig)) {
      return null
    }

    if (!widgetConfig.isActive) return null
    const WidgetToRender = widgetComponents[type]
    if (!WidgetToRender) return null
    return <WidgetToRender {...widgetData} />
  }

  return null
}
