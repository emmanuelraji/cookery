type recipeProps = {
  id: string;
  image: string;
  title: string;
};

function Recipe({ recipe }: { recipe: recipeProps }) {
  return (
    <div>
      <img src={recipe.image} alt={recipe.title} />
      <h2>{recipe.title}</h2>
    </div>
  );
}

export default Recipe;
