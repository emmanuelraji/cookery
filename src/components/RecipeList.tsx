import Recipe from "./Recipe";

type recipeProps = {
  id: string;
  image: string;
  title: string;
};

function RecipeList({ recipes }: { recipes: recipeProps[] }) {
  return (
    <div>
      <h2>RecipeList</h2>
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;
