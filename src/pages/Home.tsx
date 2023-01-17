import Category from "../components/Category";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "foodstuffs",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <main>
      <div className=" mt-8 grid grid-cols-8 gap-8">
        <section className="col-start-1 col-end-4">
          <Category />
        </section>
        <aside className="col-start-4 col-end-9"></aside>
      </div>
    </main>
  );
}

export default Home;
