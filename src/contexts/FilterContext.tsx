"use client";

import { type PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { useDebounceValue } from "usehooks-ts";

export type FilterContextType = {
  title?: string;
  category?: string;
  setTitle: (value: string) => void;
  setCategory: (value: string) => void;
};

export type FilterProviderType = PropsWithChildren<{
  category?: string;
  title?: string;
}>;

export const FilterContext = createContext<
  FilterContextType | null
>(null);

export const FilterProvider = (props: FilterProviderType) => {
  const { children, category: initialCategory, title: initialTitle } = props;
  const [category, setCategory] = useDebounceValue(initialCategory, 500);
  const [title, setTitle] = useDebounceValue(initialTitle, 500);

  return (
    <FilterContext.Provider value={{ category, title, setCategory, setTitle }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter should be used within <FilterProvider>");

  return context;
};

export default FilterProvider;
