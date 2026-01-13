import { Metadata } from 'next';
import css from './Home.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found | NoteHub',
  description: 'Sorry, the page you are looking for does not exist on NoteHub.',
  openGraph: {
    title: 'Page Not Found | NoteHub',
    description:
      'Sorry, the page you are looking for does not exist on NoteHub.',
    url: '/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Not Found',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
