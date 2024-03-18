import { useParams } from 'react-router-dom';
import { RecipePageContent } from '../features/RecipePageContent/RecipePageContent.tsx';

export const RecipePage = () => {
  const { recipeId } = useParams();

  return <RecipePageContent recipeId={recipeId} />;
};
