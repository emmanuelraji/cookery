import AddFoodForm from "../components/AddFoodForm";

function Home() {
  return (
    <main>
      <div className="max-w-4xl m-auto grid grid-cols-3">
        <section>
          <h2>Food List</h2>
        </section>
        <aside>
          <AddFoodForm />
        </aside>
      </div>
    </main>
  );
}

export default Home;
