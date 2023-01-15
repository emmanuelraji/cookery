import { FormEvent, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

function AddFoodForm() {
  const [foodItem, setFoodItem] = useState("");
  const [qty, setQty] = useState("");

  const { addDocument } = useFirestore("foodstuffs");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // console.log({ foodItem, qty });
    await addDocument({ foodItem, qty });
    setFoodItem("");
    setQty("");
  }

  return (
    <div className="bg-white p-8 rounded border">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="food">Food name</label>
          <input
            type="text"
            id="food"
            autoComplete="off"
            required
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            className="border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            id="qty"
            autoComplete="off"
            required
            min="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border rounded w-full"
          />
        </div>
        <button className="text-indigo-600 border border-indigo-600 py-1 w-full rounded hover:bg-indigo-600 hover:text-white">
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFoodForm;
