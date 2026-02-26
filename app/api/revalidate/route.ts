/**
 * /api/revalidate — Sanity webhook → revalidate síður
 *
 * Sanity kallar á þetta þegar efni breytist.
 * Stilltu webhook í Sanity dashboard:
 *   URL: https://eccogarden.vercel.app/api/revalidate
 *   Secret: SANITY_WEBHOOK_SECRET (í Vercel env vars)
 *   Trigger: create, update, delete
 */
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  // Athugum secret token
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const documentType: string = body?._type ?? ''
    const slug: string = body?.slug?.current ?? ''

    if (documentType === 'product') {
      revalidatePath('/products')
      if (slug) revalidatePath(`/products/${slug}`)
    } else if (documentType === 'homePage') {
      revalidatePath('/')
    } else if (documentType === 'siteSettings') {
      revalidatePath('/')
      revalidatePath('/about')
      revalidatePath('/contact')
    } else {
      revalidatePath('/')
    }

    return NextResponse.json({ revalidated: true, type: documentType, slug })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
