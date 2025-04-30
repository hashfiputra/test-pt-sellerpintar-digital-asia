import { getCategoriesAll } from "@lib/categories";

import Header from "@common/Header";
import Footer from "@common/Footer";

import HomeHero from "./page-hero";

export default async function Home() {
  const categories = await getCategoriesAll();

  return (
    <>
      <Header border={false}/>
      <main className="home" id="skip">
        <HomeHero categories={categories}/>
      </main>
      <Footer/>
    </>
  );
}
