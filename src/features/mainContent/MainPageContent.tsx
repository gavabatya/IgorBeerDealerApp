import * as React from 'react';
import { useGetRecipesQuery } from '../../store/recipeApi/recipesApi.ts';
import { RecipeCard } from '../recipeCard/RecipeCard.tsx';
import './mainPageContent.css';
import '../../components/logo/logo.css';
import { Loader } from '../../components/loader/Loader.tsx';

export const MainPageContent = () => {
  const { data, error, isLoading } = useGetRecipesQuery();

  return (
    <>
      {isLoading && <Loader />}
      {data && (
        <div className="cardsContainer">
          {data.recipes.length > 0 &&
            data.recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      )}
    </>
  );
};
