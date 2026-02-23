import { redirect } from 'next/navigation';

// CMS removed - redirect any unknown slugs to home
export default function CatchAllPage() {
  redirect('/');
}
