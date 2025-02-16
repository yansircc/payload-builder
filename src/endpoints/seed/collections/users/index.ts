import type { Payload } from 'payload'

export async function seedUsers({
  payload,
  tenants,
}: {
  payload: Payload
  tenants: {
    tenant1: { id: string }
    tenant2: { id: string }
    tenant3: { id: string }
  }
}) {
  // Create super admin
  const superAdmin = await payload.create({
    collection: 'users',
    data: { email: 'demo@payloadcms.com', password: 'demo', roles: ['super-admin'] },
  })

  // Create demo author
  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      username: 'demo',
      email: 'demo-author@example.com',
      password: 'password',
      roles: ['super-admin'],
    },
  })

  // Create tenant users
  const [tenant1User, tenant2User, tenant3User, multiTenantUser] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        email: 'tenant1@payloadcms.com',
        password: 'test',
        tenants: [{ roles: ['tenant-admin'], tenant: tenants.tenant1.id }],
        username: 'tenant1',
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        email: 'tenant2@payloadcms.com',
        password: 'test',
        tenants: [{ roles: ['tenant-admin'], tenant: tenants.tenant2.id }],
        username: 'tenant2',
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        email: 'tenant3@payloadcms.com',
        password: 'test',
        tenants: [{ roles: ['tenant-admin'], tenant: tenants.tenant3.id }],
        username: 'tenant3',
      },
    }),
    payload.create({
      collection: 'users',
      data: {
        email: 'multi-admin@payloadcms.com',
        password: 'test',
        tenants: [
          { roles: ['tenant-admin'], tenant: tenants.tenant1.id },
          { roles: ['tenant-admin'], tenant: tenants.tenant2.id },
          { roles: ['tenant-admin'], tenant: tenants.tenant3.id },
        ],
        username: 'multi-admin',
      },
    }),
  ])

  return {
    superAdmin,
    demoAuthor,
    tenant1User,
    tenant2User,
    tenant3User,
    multiTenantUser,
  }
}
