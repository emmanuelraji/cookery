import { DocumentData } from "firebase/firestore";

type foodProp = {
  foodItem: DocumentData;
  handleChange: (name: DocumentData) => void;
};

function PantryItem({ foodItem, handleChange }: foodProp) {
  const styles = {
    backgroundColor: foodItem.selected ? "bg-lime-500" : "bg-neutral-100",
    textColor: foodItem.selected ? "text-white" : "text-gray-500",
  };

  return (
    <span
      onClick={() => handleChange(foodItem)}
      className={` font-light p-2 rounded inline-block mr-2 mt-2 ${styles.backgroundColor} ${styles.textColor}`}
    >
      {foodItem.name}
    </span>
  );
}

export default PantryItem;
