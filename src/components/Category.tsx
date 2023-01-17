import { useEffect, useState } from "react";
import { categories } from "../lib/categories";
import cusine from "../assets/all-cuisines.png";

type foodType = {
  name: string;
  selected: boolean;
};

function Category() {
  const [foodItems, setFoodItems] = useState<foodType[]>([]);
  const [numOfItemsSelected, setNumOfItemsSelectedCount] = useState(0);
  const [limit, setLimit] = useState(10);
  // const [isActive, setIsActive] = useState(false);
  const numOfCategoryItem = categories.essentials.length;

  useEffect(() => {
    const foods = categories.essentials.filter((_, index) => index < limit);
    setFoodItems(foods);
  }, [limit]);

  function handleChange(name: string) {
    const foods = foodItems.map((food) => {
      return food.name === name ? { ...food, selected: !food.selected } : food;
    });

    const count = foods.filter((item) => item.selected === true).length;

    setFoodItems(foods);
    setNumOfItemsSelectedCount(count);
  }

  return (
    <div className="bg-white shadow-md rounded">
      <div className="flex mb-1 p-6 justify-between">
        <img src={cusine} alt="all-cusines" className="w-12 h-12" />
        <div>
          <h2>Pantry Essentials</h2>
          <p className="font-light text-gray-500">
            {numOfItemsSelected}/{numOfCategoryItem} Ingredients
          </p>
        </div>
        <div>
          {limit === 10 ? (
            <span onClick={() => setLimit(numOfCategoryItem)}>+</span>
          ) : (
            <span onClick={() => setLimit(10)}>-</span>
          )}
        </div>
      </div>
      <div className="px-6 pb-6">
        {foodItems.map((item) => {
          const styles = {
            backgroundColor: item.selected ? "bg-lime-500" : "",
            textColor: item.selected ? "text-white" : "text-gray-500",
          };
          return (
            <span
              key={item.name}
              onClick={() => handleChange(item.name)}
              className={` font-light p-2 bg-neutral-100 rounded inline-block mr-2 mt-2 ${styles.backgroundColor} ${styles.textColor}`}
            >
              {item.name}
            </span>
          );
        })}
        {limit === 10 && (
          <span
            onClick={() => setLimit(numOfCategoryItem)}
            className="text-gray-500 font-light p-2 bg-neutral-100 rounded inline-block mr-2 mt-2"
          >
            +{numOfCategoryItem - foodItems.length} More
          </span>
        )}
      </div>
    </div>
  );
}

export default Category;
