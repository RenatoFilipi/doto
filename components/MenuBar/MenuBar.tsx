import { MouseEvent, useState } from "react";
import { MyAppBar, MyLogoTypography } from "./MenuBar.style";

import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";

export default function MenuBar() {
  const router = useRouter();

  async function SignOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyAppBar position="static" variant="outlined">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <MyLogoTypography variant="h6" sx={{ flexGrow: 1 }}>
            Doto
          </MyLogoTypography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={SignOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </MyAppBar>
    </Box>
  );
}
