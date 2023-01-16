import { useFirestore } from "../hooks/useFirestore";

type foodProps = {
  foods: foodType[];
};

type foodType = {
  id: string;
  foodItem: string;
  qty: string;
  category: string;
};

function FoodList({ foods }: foodProps) {
  const { deleteDocument } = useFirestore("foodstuffs");

  return (
    <div className="mt-8">
      {foods.map((food) => (
        <article
          key={food.id}
          className="bg-white py-4 px-4 mb-4 rounded border drop-shadow-lg border-l-4 border-l-indigo-600"
        >
          <div className="flex justify-between items-center relative">
            <h3>
              {food.foodItem} ({food.category})
            </h3>
            <p className="mr-8">
              Qty
              <span> {food.qty}</span>
            </p>
          </div>
          <button
            onClick={() => deleteDocument(food.id)}
            className="bg-gray-300 py px-2 absolute top-0 right-0"
          >
            x
          </button>
        </article>
      ))}
    </div>
  );
}

export default FoodList;
