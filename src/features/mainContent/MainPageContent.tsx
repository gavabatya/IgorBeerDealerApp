import * as React from 'react';
import { useGetRecipesQuery } from '../../store/recipeApi/recipesApi.ts';
import './mainPageContent.css';
import { Suspense } from 'react';

const Recipe = React.lazy(() => import('../recipeCard/RecipeCard.tsx'));
export const MainPageContent = () => {
  const { data } = useGetRecipesQuery();

  return (
    <Suspense>
      {data && (
        <div className="cardsContainer">
          {data.length > 0 && data.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)}
        </div>
      )}
    </Suspense>
  );
};
