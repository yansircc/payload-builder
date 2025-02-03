import React from 'react'

import { Login } from '@/app/components/Login/client.page'
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = headers()
  const host = (await headersList).get('host') || ''
  const tenantDomain = host.split(':')[0] // Remove port if exists

  return <Login tenantDomain={tenantDomain} />
}
