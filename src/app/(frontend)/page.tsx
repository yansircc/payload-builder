export default async function Page() {
  return (
    <div>
      <h1>Multi-Tenant Example</h1>
      <p>
        This multi-tenant example allows you to explore multi-tenancy with domains and with slugs.
      </p>

      <h2>Domains</h2>
      <p>When you visit a tenant by domain, the domain is used to determine the tenant.</p>
      <p>
        For example, visiting{' '}
        <a href="http://gold.localhost.com:3000/tenant-domains/login">
          http://gold.localhost.com:3000/tenant-domains/login
        </a>{' '}
        will show the tenant with the domain &quot;gold.localhost.com&quot;.
      </p>

      <h2>Slugs</h2>
      <p>When you visit a tenant by slug, the slug is used to determine the tenant.</p>
      <p>
        For example, visiting{' '}
        <a href="http://localhost:3000/tenant-slugs/silver/login">
          http://localhost:3000/tenant-slugs/silver/login
        </a>{' '}
        will show the tenant with the slug &quot;silver&quot;.
      </p>
    </div>
  )
}
