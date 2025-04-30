import { Search } from "lucide-react";

import Input from "@ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/Select";

import { Categories } from "@lib/categories";

export type HomeHeroProps = {
  categories: Categories;
};

export default async function HomeHero({ categories }: HomeHeroProps) {
  return (
    <section className="section" id="hero">
      <div className="container">
        <div className="headline">
          <h3>Blog genzet</h3>
          <h1>The Journal: Design Resources, Interviews, and Industry News</h1>
          <h2>Your daily dose of design insights!</h2>
        </div>
        <div className="filters">
          <Select>
            <SelectTrigger className="filters__category">
              <SelectValue placeholder="Select category"/>
            </SelectTrigger>
            <SelectContent>
              {categories.data.map((category) => (
                <SelectItem value={category.name} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="filters__search">
            <Search className="filters__search-icon"/>
            <Input className="filters__search-control" name="search" type="text" placeholder="Search articles"/>
          </div>
        </div>
      </div>
    </section>
  );
}
