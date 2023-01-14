import { useFirestore } from "../hooks/useFirestore";

type foodProps = {
  foods: foodType[];
};

type foodType = {
  id: string;
  foodItem: string;
  qty: string;
};

function FoodList({ foods }: foodProps) {
  const { deleteDocument } = useFirestore("foodstuffs");
  return (
    <div>
      {foods.map((food) => (
        <div key={food.id} className="bg-white p-8 mb-4 rounded">
          <h3>{food.foodItem}</h3>
        </div>
      ))}
    </div>
  );
}

export default FoodList;
