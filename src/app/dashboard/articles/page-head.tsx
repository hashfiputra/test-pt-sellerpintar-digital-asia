"use client";

import { type ChangeEvent, type MouseEvent, useCallback, useState } from "react";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

import { useFilter } from "@contexts/FilterContext";
import { Categories } from "@lib/categories";

import Input from "@ui/Input";
import { Button } from "@ui/Button";
import * as SelectUI from "@ui/Select";

export type DashboardArticlesHeadProps = {
  total: number;
  categories: Categories;
};

export default function DashboardArticlesHead({ total, categories }: DashboardArticlesHeadProps) {
  const { category, setCategory, setTitle } = useFilter();
  const [controlled, setControlled] = useState(category);

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget || event.target;
    const value = target.value;
    setTitle(value);
  }, [setTitle]);

  const onCategoryChange = useCallback((value: string) => {
    setControlled(value);
    setCategory(value);
  }, [setCategory]);

  const onCategoryReset = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setControlled("");
    setCategory("");
  }, [setCategory]);

  return (
    <div className="head">
      <div className="title">
        <span>Total articles : {total}</span>
      </div>
      <div className="utility">
        <div className="filters">
          <SelectUI.Select value={controlled} onValueChange={onCategoryChange}>
            <div className="filters__category">
              {controlled && <SelectUI.SelectReset onClick={onCategoryReset}/>}
              <SelectUI.SelectTrigger data-empty={!controlled}>
                <SelectUI.SelectValue placeholder="Category"/>
              </SelectUI.SelectTrigger>
            </div>
            <SelectUI.SelectContent>
              {categories.data.map((category) => category.id ? (
                <SelectUI.SelectItem value={category.id} key={category.id}>
                  {category.name}
                </SelectUI.SelectItem>
              ) : null)}
            </SelectUI.SelectContent>
          </SelectUI.Select>
          <div className="filters__search">
            <Search className="filters__search-icon"/>
            <Input className="filters__search-control" placeholder="Search by title" onChange={onSearchChange}/>
          </div>
        </div>
        <Button asChild>
          <Link href="/dashboard/articles-create">
            <Plus/> Add Articles
          </Link>
        </Button>
      </div>
    </div>
  );
}
