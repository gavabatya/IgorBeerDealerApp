import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Recipe {
  id: number;
  name: string;
  cookTimeMinutes: number;
  cuisine: string;
  difficulty: 'Easy' | 'Medium';
  ingredients: string[];
  image: string;
  instructions: string[];
}
interface RecipesResponseDTO {
  recipes: Recipe[];
}

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipesResponseDTO, void>({
      query: () => '/recipes',
    }),
    getRecipeById: builder.query<Recipe, string | undefined>({
      query: (id) => `recipes/${id}`,
    }),
  }),
});

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipesApi;
