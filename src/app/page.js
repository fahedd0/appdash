import { redirect } from 'next/navigation';

// Redirect from home page to dashboard
export default function Home() {
  redirect('/login');
}