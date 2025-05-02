"use client";

import { type PropsWithChildren, createContext, useContext } from "react";
import { useDebounceValue } from "usehooks-ts";

export type CategoryContextType = {
  category?: string;
  setCategory: (value: string) => void;
};

export type CategoryProviderType = PropsWithChildren<{
  category?: string;
  title?: string;
}>;

export const CategoryContext = createContext<
  CategoryContextType | null
>(null);

export const CategoryProvider = (props: CategoryProviderType = {}) => {
  const { children, category: initialCategory } = props;
  const [category, setCategory] = useDebounceValue(initialCategory, 500);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategory should be used within <CategoryProvider>");

  return context;
};

export default CategoryProvider;
