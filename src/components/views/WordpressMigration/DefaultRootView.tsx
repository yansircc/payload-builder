import { DefaultTemplate } from '@payloadcms/next/templates'
import type { AdminViewProps } from 'payload'
import React from 'react'
import { DefaultRootViewClient } from './DefaultRootView.client'

export const DefaultRootView: React.FC<AdminViewProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
      viewType="dashboard"
    >
      <DefaultRootViewClient user={initPageResult.req.user} />
    </DefaultTemplate>
  )
}
