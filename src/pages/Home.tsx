import PantryList from "../components/PantryList";
import { useState } from "react";
import RecipeList from "../components/RecipeList";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { documents } = useCollection("essentials");

  return (
    <main>
      <div className=" mt-8 grid grid-cols-8 gap-8 px-4">
        <aside className="col-start-1 col-end-4">
          <PantryList documents={documents} />
        </aside>
        <section className="col-start-4 col-end-9"></section>
      </div>
    </main>
  );
}

export default Home;
