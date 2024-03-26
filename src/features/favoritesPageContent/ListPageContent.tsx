import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { FC, useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import { getFavorites } from '../../store/favoritesStore/favotitesSelectors.ts';
import { addToFavorites } from '../../store/favoritesStore/favotitesSlice.ts';
import { useGetRecipesQuery } from '../../store/recipeApi/recipesApi.ts';
import './listPageContent.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from '../../store/cartStore/cartSlice.ts';
import { getProductInCart } from '../../store/cartStore/cartSelectors.ts';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../components/loader/Loader.tsx';

interface Props {
  listType: 'favorites' | 'cart';
}

export const ListPageContent: FC<Props> = ({ listType }) => {
  const favoritesProducts = useSelector(getFavorites);
  const productsInCart = useSelector(getProductInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useGetRecipesQuery();

  const iteratedArray = useMemo(() => {
    if (listType === 'cart') {
      return productsInCart;
    }
    return favoritesProducts;
  }, [favoritesProducts, listType, productsInCart]);

  if (!iteratedArray || iteratedArray?.length === 0) {
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
          <RemoveShoppingCartOutlinedIcon sx={{ color: '#ffcc33', fontSize: '60px' }} />
          There is nothing here yet, add recipes
        </div>
      </div>
    );
  }

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

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

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mx: 4, mb: 2 }} variant="h6" component="div">
        {listType.toUpperCase()}
      </Typography>
      <Demo>
        <List dense={true}>
          {data?.map((recipe) => {
            if (iteratedArray && iteratedArray.includes(recipe.id)) {
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
            }
            return null;
          })}
        </List>
      </Demo>
    </Grid>
  );
};
