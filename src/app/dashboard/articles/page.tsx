import FilterProvider from "@contexts/FilterContext";

import { getArticles } from "@lib/articles";
import { getCategoriesAll } from "@lib/categories";

import DashboardArticlesHead from "./page-head";
import DashboardArticlesData from "./page-data";

export default async function DashboardArticles() {
  const articles = await getArticles({ page: 1, limit: 10 });
  const categories = await getCategoriesAll();
  const { total } = articles;

  return (
    <main id="skip">
      <section className="section" id="articles">
        <FilterProvider>
          <DashboardArticlesHead total={total} categories={categories}/>
          <DashboardArticlesData articles={articles}/>
        </FilterProvider>
      </section>
    </main>
  );
}
