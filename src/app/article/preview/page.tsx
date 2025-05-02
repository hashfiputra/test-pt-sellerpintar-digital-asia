import { cookies } from "next/headers";
import { decrypt } from "@lib/auth";

import Header from "@common/Header";
import Footer from "@common/Footer";

import ArticlePreviewContent from "./page-content";

export default async function ArticlePreview() {
  const store = await cookies();
  const session = store.get("session")?.value;
  const { username } = await decrypt(session);

  return (
    <>
      <Header fixed={true}/>
      <main className="article" id="skip">
        <ArticlePreviewContent username={username}/>
      </main>
      <Footer/>
    </>
  );
}
