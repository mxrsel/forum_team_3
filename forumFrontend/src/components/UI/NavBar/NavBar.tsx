import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { NavLink } from "react-router-dom";
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../store/slices/userSlice.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import Grid from '@mui/material/Grid2';

const NavBar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none" }}
          >
            Home
          </Typography>
          <Grid>
            {user ? (
              <UserMenu user={user}/>
            ) : (
              <AnonymousMenu/>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
