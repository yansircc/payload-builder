interface Script {
  name: string
  type: string
  trackingId?: string
  isEnabled: boolean
  position: string
  loadingStrategy: string
  urlPattern: string
  id: string
}

export const getGTMId = async () => {
  try {
    const res = await fetch(`${process.env.PAYLOAD_API_URL}/custom-codes?depth=0`, {
      cache: 'no-store',
    })
    const data = await res.json()
    console.log('data test', data)

    const gtmScript = data?.docs?.find(
      (script: Script) => script.type === 'google-tag-manager' && script.trackingId,
    )

    return { gtmId: gtmScript?.trackingId || null }
  } catch (error) {
    console.error('Failed to fetch GTM ID:', error)
    return { gtmId: null }
  }
}
