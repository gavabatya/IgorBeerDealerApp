import { FC, useEffect } from 'react';
import {
  useGetRecipeByIdQuery,
  useGetRecipeBySearchStringQuery,
} from '../../store/recipeApi/recipesApi.ts';
import { Loader } from '../../components/loader/Loader.tsx';
import * as React from 'react';
import './searchPageContent.css';
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
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface Props {
  searchString?: string;
}
export const SearchPageContent: FC<Props> = ({ searchString }) => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  const { data, isLoading } = useGetRecipeBySearchStringQuery(searchString, {
    skip: !searchString,
  });
  const favoritesProducts = useSelector(getFavorites);
  const productsInCart = useSelector(getProductInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHeartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipeId: number,
  ) => {
    dispatch(addToFavorites(recipeId));
    event.stopPropagation();
  };

  const handleCartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipeId: number,
  ) => {
    dispatch(addToCart(recipeId));
    event.stopPropagation();
  };

  const handleGoToRecipe = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (data && data.recipes.length === 0) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SearchOffIcon sx={{ color: '#ffcc33', fontSize: '60px' }} />
          No recipes found
        </div>
      </div>
    );
  }

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mx: 4, mb: 2 }} variant="h6" component="div">
        {`Results for: ${searchString}`}
      </Typography>
      <List dense={true}>
        {data?.recipes.map((recipe) => {
          return (
            <React.Fragment key={recipe.id}>
              <ListItem
                onClick={() => handleGoToRecipe(recipe.id)}
                sx={{ py: 3 }}
                secondaryAction={
                  // <IconButton edge="end" aria-label="delete">
                  //   <DeleteIcon />
                  // </IconButton>

                  <div className="actionIcons">
                    <IconButton
                      color="warning"
                      onClick={(event) => handleHeartClick(event, recipe.id)}
                    >
                      {favoritesProducts && favoritesProducts.includes(recipe.id) ? (
                        <FavoriteIcon sx={{ color: '#ffcc33' }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                    <IconButton
                      color="warning"
                      onClick={(event) => handleCartClick(event, recipe.id)}
                    >
                      {productsInCart && productsInCart.includes(recipe.id) ? (
                        <ShoppingCartIcon sx={{ color: 'green' }} />
                      ) : (
                        <AddShoppingCartIcon />
                      )}
                    </IconButton>
                  </div>
                }
              >
                <ListItemAvatar sx={{ height: '127px', width: '127px' }}>
                  <Avatar sx={{ height: '127px', width: '127px', border: '3px solid #ffcc33' }}>
                    <div
                      className="favoritesRecipeImg"
                      style={{
                        backgroundImage: `url(${recipe.image})`,
                      }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ px: 5 }}
                  primary={`${recipe.name}`}
                  secondary={`difficulty: ${recipe.difficulty}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </Grid>
  );
};
