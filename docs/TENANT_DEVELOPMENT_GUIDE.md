# Multi-Tenant Development Guide

## Overview
Multi-tenancy allows a single application instance to serve multiple customers (tenants) while keeping their data separate. Each tenant has their own set of users, pages, and other data scoped specifically to them.

## Core Features
- Tenant-specific data isolation
- Tenant field integration in collections
- Admin panel tenant selector
- Filtered list views by tenant
- Filtered relationship fields by tenant
- Global collection support (1 document per tenant)
- Automatic tenant assignment for new documents

## Basic Configuration

```typescript
import { buildConfig } from 'payload'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'

const config = buildConfig({
  collections: [
    {
      slug: 'tenants',
      admin: {
        useAsTitle: 'name'
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
        {
          name: 'domain',
          type: 'text',
          required: true,
        }
      ],
    },
  ],
  plugins: [
    multiTenantPlugin({
      collections: {
        pages: {},
        header: {
          isGlobal: true,
        }
      },
    }),
  ],
})
```

## Access Control
- **Super Admin**: Full access to manage all tenants and operations
- **Tenant Admin**: Limited access to specific tenant operations
- **Users**: Access restricted to their assigned tenant's data

## Frontend Integration

### Querying Tenant Data
```typescript
const pagesByTenant = await payload.find({
  collection: 'pages',
  depth: 1,
  draft: false,
  limit: 1000,
  where: {
    'tenant.slug': {
      equals: 'tenant-slug',
    },
  },
})
```

### NextJS Domain-Based Routing
```typescript
  async rewrites() {
    return [
      {
        source: '/((?!admin|api))tenant-domains/:path*',
        destination: '/tenant-domains/:tenant/:path*',
        has: [
          {
            type: 'host',
            value: '(?<tenant>.*)',
          },
        ],
      },
    ]
  },
```

## Plugin Configuration Options

- `cleanupAfterTenantDelete`: Controls document cleanup after tenant deletion
- `collections`: Specify collections for tenant integration
- `debug`: Enables debug mode for admin UI visibility
- `enabled`: Toggles plugin functionality
- `tenantField`: Configures the tenant field in collections
- `tenantsArrayField`: Configures user-tenant relationship fields
- `tenantsSlug`: Defines the tenant collection slug
- `userHasAccessToAllTenants`: Function to determine super-admin access
- `useTenantsCollectionAccess`: Controls tenant collection access constraints

## Security Considerations
- Implement strong access control for tenant collection
- Configure CORS policies appropriately
- Manage tenant deletion carefully
- Secure domain-based tenant routing
- Control draft document access between tenants
