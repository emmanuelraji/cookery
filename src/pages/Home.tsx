import AddFoodForm from "../components/AddFoodForm";
import FoodList from "../components/FoodList";
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
      <div className="max-w-2xl m-auto mt-8 grid grid-cols-5 gap-8">
        <section className="col-start-1 col-end-4">
          <h2 className="mb-4">Food List</h2>
          {error && <p>{error}</p>}
          {documents && <FoodList foods={documents} />}
        </section>
        <aside className="col-start-4 col-end-6">
          <h2 className="mb-4">Add Food Item</h2>
          <AddFoodForm />
        </aside>
      </div>
    </main>
  );
}

export default Home;
