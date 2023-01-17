import { useEffect, useState } from "react";
import cusine from "../assets/all-cuisines.png";
import PantryItem from "./PantryItem";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { DocumentData } from "firebase/firestore";
import { useCollection } from "../hooks/useCollection";

function PantryList() {
  const { documents } = useCollection("essentials");
  const numOfItemsSelected = documents?.filter((doc) => doc.selected).length;

  const [foodItems, setFoodItems] = useState<DocumentData[] | null>([]);
  const [numOfDocumentItems, setNumOfDocuments] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    let count = 0;
    let foods =
      documents?.filter((item, index) => {
        count++;
        if (index < limit) {
          return item;
        }
      }) ?? [];

    setNumOfDocuments(count);
    setFoodItems(foods);
  }, [documents, limit]);

  async function handleChange(document: DocumentData) {
    const ref = doc(db, "essentials", document.id);
    await setDoc(ref, {
      name: document.name,
      selected: !document.selected,
    });
  }

  return (
    <div className="bg-white shadow-md rounded">
      <div className="flex mb-1 p-6 justify-between">
        <img src={cusine} alt="all-cusines" className="w-12 h-12" />
        <div>
          <h2>Pantry Essentials</h2>
          <p className="font-light text-gray-500">
            {numOfItemsSelected}/{numOfDocumentItems} Ingredients
          </p>
        </div>
        <div className="basis-4">
          {limit === 10 ? (
            <span onClick={() => setLimit(documents?.length ?? 0)}>+</span>
          ) : (
            <span onClick={() => setLimit(10)}>-</span>
          )}
        </div>
      </div>
      <div className="px-6 pb-6">
        {foodItems?.map((item) => (
          <PantryItem
            key={item.name}
            foodItem={item}
            handleChange={handleChange}
          />
        ))}
        {limit === 10 && (
          <span
            onClick={() => setLimit(numOfDocumentItems)}
            className="text-gray-500 font-light p-2 bg-neutral-100 rounded inline-block mr-2 mt-2"
          >
            +{numOfDocumentItems - (foodItems?.length ?? 0)} More
          </span>
        )}
      </div>
    </div>
  );
}

export default PantryList;
