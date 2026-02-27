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

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const documentType: string = body?._type ?? ''
    const slug: string = body?.slug?.current ?? ''

    switch (documentType) {
      case 'homePage':
        revalidatePath('/')
        break
      case 'aboutPage':
        revalidatePath('/about')
        break
      case 'contactPage':
        revalidatePath('/contact')
        break
      case 'siteSettings':
        revalidatePath('/about')
        revalidatePath('/contact')
        break
      case 'product':
        revalidatePath('/products')
        if (slug) revalidatePath(`/products/${slug}`)
        break
      case 'category':
        revalidatePath('/')
        revalidatePath('/products')
        break
      default:
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, type: documentType, slug })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
