import { FC } from 'react';
import PropTypes from 'prop-types';
import { useGetRecipeByIdQuery } from '../../store/recipeApi/recipesApi.ts';
import { Loader } from '../../components/loader/Loader.tsx';
import * as React from 'react';
import './recipePageContent.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../../store/favoritesStore/favotitesSelectors.ts';
import { getProductInCart } from '../../store/cartStore/cartSelectors.ts';
import { addToFavorites } from '../../store/favoritesStore/favotitesSlice.ts';
import { addToCart } from '../../store/cartStore/cartSlice.ts';
import logo from '../../assets/logo.svg';

interface Props {
  recipeId?: string;
}
const RecipePageContent: FC<Props> = ({ recipeId }) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  const { data: recipe, isLoading } = useGetRecipeByIdQuery(recipeId, { skip: !recipeId });
  const navigate = useNavigate();
  const favoritesProducts = useSelector(getFavorites);
  const productsInCart = useSelector(getProductInCart);
  const dispatch = useDispatch();

  const handleHeartClick = () => {
    dispatch(addToFavorites(recipe?.id));
  };

  const handleCartClick = () => {
    dispatch(addToCart(recipe?.id));
  };

  const handleGoToMain = () => {
    navigate('/');
  };

  if (!recipeId || !recipe || isLoading) return <Loader />;

  return (
    <div className="recipeCardContainer">
      <div
        className="recipeDetailsImg"
        style={{
          backgroundImage: `url(${recipe.image})`,
        }}
      />
      <div className="cardDescription">
        <div className="recipeTitle">{recipe.name}</div>
        <div className="cookTimeMinutes">Cook time: {recipe.cookTimeMinutes} min</div>
        <div className="cookTimeMinutes">Difficulty: {recipe.difficulty}</div>
        <div className="ingredientsDescriptionTitle">Ingredients:</div>
        <div className="ingredientsDescription">
          {recipe.ingredients.map((ingredient, index) => {
            if (index > 5) return null;
            return <div key={ingredient}>{ingredient}</div>;
          })}
        </div>
        <div className="buyText">Buy the recipe to see the full ingredients</div>
        <div className="instructionsTitle">Instruction:</div>
        <div className="recipeInstructions">{recipe.instructions.join(' ')}</div>
        <div className="buyText">Buy the recipe to see the full instruction</div>
        <img src={logo} className="smallLogo" alt="logo" />
      </div>

      <div className="buttonContainer">
        <IconButton style={{ backgroundColor: 'white' }} onClick={handleGoToMain}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton style={{ backgroundColor: 'white' }} onClick={handleHeartClick}>
          {favoritesProducts && favoritesProducts.includes(recipe.id) ? (
            <FavoriteIcon sx={{ color: '#ffcc33' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton style={{ backgroundColor: 'white' }} onClick={handleCartClick}>
          {productsInCart && productsInCart.includes(recipe.id) ? (
            <ShoppingCartIcon sx={{ color: 'green' }} />
          ) : (
            <AddShoppingCartIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
};

RecipePageContent.propTypes = {
  recipeId: PropTypes.string,
};

export default RecipePageContent;
