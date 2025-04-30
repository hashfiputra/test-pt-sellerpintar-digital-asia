import { getCategoriesAll } from "@lib/categories";
import { getArticles } from "@lib/articles";

import FilterProvider from "@contexts/FilterContext";

import Header from "@common/Header";
import Footer from "@common/Footer";

import HomeHero from "./page-hero";
import HomeArticles from "./page-articles";

export default async function Home() {
  const categories = await getCategoriesAll();
  const articles = await getArticles({ limit: 9 });

  return (
    <>
      <Header border={false}/>
      <main className="home" id="skip">
        <FilterProvider>
          <HomeHero categories={categories}/>
          <HomeArticles articles={articles}/>
        </FilterProvider>
      </main>
      <Footer/>
    </>
  );
}
