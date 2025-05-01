"use client";

import { type MouseEvent, useCallback, useState } from "react";
import { Search } from "lucide-react";

import Input from "@ui/Input";
import { Select, SelectContent, SelectItem, SelectReset, SelectTrigger, SelectValue } from "@ui/Select";

import { useFilter } from "@contexts/FilterContext";
import { type Categories } from "@lib/categories";

export type HomeHeroProps = {
  categories: Categories;
};

export default function HomeHero({ categories }: HomeHeroProps) {
  const { category, setCategory, setTitle } = useFilter();
  const [controlled, setControlled] = useState(category);

  const onChange = useCallback((value: string) => {
    setControlled(value);
    setCategory(value);
  }, [setCategory]);

  const onReset = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setControlled("");
    setCategory("");
  }, [setCategory]);

  return (
    <section className="section" id="hero">
      <div className="container">
        <div className="headline">
          <h3>Blog genzet</h3>
          <h1>The Journal: Design Resources, Interviews, and Industry News</h1>
          <h2>Your daily dose of design insights!</h2>
        </div>
        <div className="filters">
          <Select value={controlled} onValueChange={onChange}>
            <SelectTrigger className="filters__category" data-empty={!controlled}>
              {controlled && <SelectReset onClick={onReset}/>}
              <SelectValue placeholder="Select category"/>
            </SelectTrigger>
            <SelectContent>
              {categories.data.map((category) => (
                <SelectItem value={category.id} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="filters__search">
            <Search className="filters__search-icon"/>
            <Input
              className="filters__search-control"
              name="search"
              type="text"
              placeholder="Search articles"
              onChange={(event) => setTitle(event.currentTarget.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
