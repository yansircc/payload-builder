import { NavGroup } from '@payloadcms/ui'
import Link from 'next/link'

export default function WordpressMigrationNav() {
  return (
    <NavGroup label="Tools">
      <Link href="/admin/wordpress-migration">Wordpress Migration</Link>
    </NavGroup>
  )
}
