'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import noteService, { FetchNotesResponse } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import css from './NotesPage.module.css';
import Loading from '@/app/loading';
import Link from 'next/link';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const perPage = 12;

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => noteService.fetchNotes(page, perPage, debouncedSearch, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  if (isError) {
    throw new Error('Failed to load notes');
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={value => {
            setSearch(value);
            setPage(1);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page - 1}
            onPageChange={e => setPage(e.selected + 1)}
          />
        )}

        <Link href={'/notes/action/create'} className={css.button}>
          Create note +
        </Link>
      </div>

      {isLoading && <Loading />}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
