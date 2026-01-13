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

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const filterName = slug?.length && slug[0] !== 'all' ? slug[0] : 'All';

  const fullUrl = `/notes/filter/${slug?.join('/') || 'all'}`;

  return {
    title: `${filterName} Notes | NoteHub`,
    description: `Browse through your ${filterName.toLowerCase()} notes and stay organized.`,
    openGraph: {
      title: `${filterName} Notes | NoteHub`,
      description: `Browse through your ${filterName.toLowerCase()} notes and stay organized.`,
      url: fullUrl,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub ${filterName} Preview`,
        },
      ],
    },
  };
}

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
