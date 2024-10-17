import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/store/mmkv-storage";

export interface IBookmark {
    id: string,
}

export interface IBookmarkState {
    bookmarks: Array<IBookmark>;
    addBookmark: (boomark: IBookmark) => void;
    clearAllBookmarks: () => void;
}
export const useNewsBookmarkStore = create<IBookmarkState>()(
    persist(
        (set, get) => ({
          bookmarks: [],
          addBookmark: (bookmark: IBookmark) => {
            set((state) => {
              const bookmarkExists = state.bookmarks.some((b) => b.id === bookmark.id);
    
              if (bookmarkExists) {
                // Remove bookmark if it already exists
                return {
                  bookmarks: state.bookmarks.filter((b) => b.id !== bookmark.id),
                };
              } else {
                // Add new bookmark if it doesn't exist
                return {
                  bookmarks: [...state.bookmarks, bookmark],
                };
              }
            });
          },          
          clearAllBookmarks: () => {
            set({ bookmarks: []});
          },
        }),
        {
          name: "bookmark",
          storage: createJSONStorage(() => zustandStorage),
        }
      )
)