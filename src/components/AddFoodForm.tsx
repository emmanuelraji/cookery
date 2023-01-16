import { FormEvent, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import Select from "react-select";

const categories = [
  { value: "fruit", label: "Fruit" },
  { value: "dairy", label: "Dairy" },
  { value: "protien", label: "Protien" },
  { value: "beverage", label: "Beverage" },
  { value: "grain", label: "Grain" },
  { value: "spice", label: "Spice" },
  { value: "sauce", label: "Sauce" },
];

type optionType = {
  value: string;
  label: string;
};

function AddFoodForm() {
  const [foodItem, setFoodItem] = useState("");
  const [qty, setQty] = useState("");
  const [category, setCategory] = useState<optionType | null>(null);

  const { addDocument } = useFirestore("foodstuffs");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // console.log({ foodItem, qty, category: category?.value });
    await addDocument({ foodItem, qty, category: category?.value });

    setFoodItem("");
    setQty("");
    setCategory(null);
  }

  return (
    <div className="bg-white p-8 rounded border">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="food">Food Name:</label>
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
          <label htmlFor="qty">Quantity:</label>
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
        <label htmlFor="category">Category:</label>
        <Select
          id="category"
          className="mb-4"
          options={categories}
          required
          onChange={(option) => setCategory(option)}
        />
        <button className="text-indigo-600 border border-indigo-600 py-1 w-full rounded hover:bg-indigo-600 hover:text-white">
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFoodForm;
