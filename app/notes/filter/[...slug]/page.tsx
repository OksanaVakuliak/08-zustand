import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import noteService, { FetchNotesResponse } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface NotePageProps {
  params: Promise<{ slug: string[] }>;
}

export const metadata: Metadata = {
  title: 'Notes | NoteHub',
  description: 'Create a new note and organize your tasks effectively.',
  openGraph: {
    title: 'Notes | NoteHub',
    description: 'Create a new note and organize your tasks effectively.',
    url: '/notes/filter/all',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub Preview',
      },
    ],
  },
};

export default async function NotesPage({ params }: NotePageProps) {
  const { slug } = await params;
  const tag = slug?.length && slug[0] !== 'all' ? slug[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => noteService.fetchNotes(1, 12, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
