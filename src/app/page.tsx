import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsplash Clone',
  description: 'Unsplash Clone with Next.js',
}

export default function Home() {
  redirect('/wallpapers');
}

