import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritesCount } from '../../store/favoritesStore/favotitesSelectors.ts';
import { getCartCount } from '../../store/cartStore/cartSelectors.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addToSearchHistory } from '../../store/searchHistoryStore/searchHistorySlice.ts';
import { getSearchesCount } from '../../store/searchHistoryStore/searchHistorySelectors.ts';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const { handleLogOut } = useAuth();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favoritesCount = useSelector(getFavoritesCount);
  const productsInCartCount = useSelector(getCartCount);
  const searchesCount = useSelector(getSearchesCount);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseWithLogOut = () => {
    handleLogOut();
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleGoToMainPage = () => {
    navigate('/');
  };

  const handleGoToFavorites = () => {
    navigate('/favorites');
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleGotoSearchHistory = () => {
    navigate('/searchHistory');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSearchClick = () => {
    dispatch(addToSearchHistory(`http://${window.location.host}/search/${searchValue}`));
    navigate(`/search/${searchValue}`);
    setSearchValue('');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuCloseWithLogOut}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit" onClick={handleGotoSearchHistory}>
          <Badge badgeContent={searchesCount} color="error">
            <FindInPageIcon />
          </Badge>
        </IconButton>
        <p>Searches list</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit" onClick={handleGoToCart}>
          <Badge badgeContent={productsInCartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit" onClick={handleGoToFavorites}>
          <Badge badgeContent={favoritesCount} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ width: '100%' }} position="fixed" zIndex="1">
      <AppBar sx={{ bgcolor: '#ffcc33' }} position="static">
        <Toolbar>
          <Box onClick={handleGoToMainPage}>
            <img src={logo} style={{ width: '70px' }} alt="logo" />
          </Box>

          <Search>
            <StyledInputBase
              placeholder="Find recipe…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
              value={searchValue}
            />
          </Search>

          <IconButton
            style={{
              color: '#ffcc33',
              backgroundColor: 'black',
              opacity: searchValue !== '' ? 1 : 0.2,
              width: '36px',
              height: '36px',
            }}
            size="large"
            aria-label="show 4 products"
            color="inherit"
            onClick={onSearchClick}
            disabled={searchValue === ''}
          >
            <SearchIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              style={{ color: 'black' }}
              size="large"
              aria-label="show 4 products"
              color="inherit"
              onClick={handleGotoSearchHistory}
            >
              <Badge badgeContent={searchesCount} color="error">
                <FindInPageIcon />
              </Badge>
            </IconButton>
            <IconButton
              style={{ color: 'black' }}
              size="large"
              aria-label="show 4 products"
              color="inherit"
              onClick={handleGoToCart}
            >
              <Badge badgeContent={productsInCartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              style={{ color: 'black' }}
              size="large"
              color="inherit"
              onClick={handleGoToFavorites}
            >
              <Badge badgeContent={favoritesCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton
              style={{ color: 'black' }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              style={{ color: 'black' }}
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
