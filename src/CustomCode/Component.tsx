import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { CustomCode as CustomCodeType } from '@/payload-types'

export const CustomCode = async () => {
  const payload = await getPayload({ config: configPromise })

  try {
    const customCodeQuery = await payload.find({
      collection: 'custom-codes',
      limit: 1,
    })

    const customCode = customCodeQuery.docs[0] as CustomCodeType

    if (!customCode) return null

    return {
      headerScripts: customCode.headerScripts ? (
        <script
          key="header-scripts"
          dangerouslySetInnerHTML={{ __html: customCode.headerScripts }}
        />
      ) : null,
      bodyStartScripts: customCode.bodyStartScripts ? (
        <script
          key="body-start-scripts"
          dangerouslySetInnerHTML={{ __html: customCode.bodyStartScripts }}
        />
      ) : null,
      bodyEndScripts: customCode.bodyEndScripts ? (
        <script
          key="body-end-scripts"
          dangerouslySetInnerHTML={{ __html: customCode.bodyEndScripts }}
        />
      ) : null,
    }
  } catch (error) {
    console.error('Error fetching custom code:', error)
    return null
  }
}
