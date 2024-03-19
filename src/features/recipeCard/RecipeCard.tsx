import { FC, Suspense, useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import * as React from 'react';
import { getFavorites } from '../../store/favoritesStore/favotitesSelectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../../store/favoritesStore/favotitesSlice.ts';
import { Recipe } from '../../store/recipeApi/recipesApi.ts';
import { getProductInCart } from '../../store/cartStore/cartSelectors.ts';
import { addToCart } from '../../store/cartStore/cartSlice.ts';
import { useNavigate } from 'react-router-dom';
import './recipeCard.css';

interface RecipeCardProps {
  recipe: Recipe;
}
export default function RecipeCard({ recipe }: RecipeCardProps) {
  const favoritesProducts = useSelector(getFavorites);
  const productsInCart = useSelector(getProductInCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHeartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(addToFavorites(recipe.id));
    event.stopPropagation();
  };

  const handleCartClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(addToCart(recipe.id));
    event.stopPropagation();
  };

  const handleGoToRecipe = () => {
    navigate(`recipe/${recipe.id}`);
  };

  return (
    <Suspense>
      <div className="card" onClick={handleGoToRecipe}>
        <div className="title">
          <span>{recipe.name}</span>
        </div>
        <div
          className="recipeImg"
          style={{
            backgroundImage: `url(${recipe.image})`,
          }}
        />
        <div className="actionPanel">
          <div className="information">
            <div>
              Cuisine: <span className="informationText">{recipe.cuisine}</span>
            </div>
            <div className="difficulty">
              Difficulty: <span className="informationText">{recipe.difficulty}</span>
              {recipe.difficulty === 'Easy' && (
                <StarIcon fontSize="small" sx={{ color: '#ffcc33' }} />
              )}
              {recipe.difficulty === 'Medium' && (
                <>
                  <StarIcon fontSize="small" sx={{ color: '#ffcc33' }} />
                  <StarIcon fontSize="small" sx={{ color: '#ffcc33' }} />
                </>
              )}
            </div>
          </div>
          <div className="actionButtons">
            <IconButton color="warning" onClick={handleHeartClick}>
              {favoritesProducts && favoritesProducts.includes(recipe.id) ? (
                <FavoriteIcon sx={{ color: '#ffcc33' }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton color="warning" onClick={handleCartClick}>
              {productsInCart && productsInCart.includes(recipe.id) ? (
                <ShoppingCartIcon sx={{ color: 'green' }} />
              ) : (
                <AddShoppingCartIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
