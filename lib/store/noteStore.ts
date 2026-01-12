import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CreateNote } from '@/types/note';

interface NoteState {
  draft: CreateNote;
  setDraft: (note: Partial<CreateNote>) => void;
  clearDraft: () => void;
}

const initialDraft: CreateNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: updatedFields =>
        set(state => ({
          draft: { ...state.draft, ...updatedFields },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
