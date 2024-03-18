import { FC } from 'react';
import { useGetRecipeByIdQuery } from '../../store/recipeApi/recipesApi.ts';
import { Loader } from '../../components/loader/Loader.tsx';

interface Props {
  recipeId?: string;
}
export const RecipePageContent: FC<Props> = ({ recipeId }) => {
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId, { skip: !recipeId });

  if (!recipeId || !recipe || isLoading) return <Loader />;
  return <div>{recipe.name}</div>;
};
