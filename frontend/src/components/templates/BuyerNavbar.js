import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const BuyerNavbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Buyer
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button color="inherit" onClick={() => navigate("/buyer")}>
            Buyers
          </Button> */}
          {/* {/* <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button> */}
          <Button color="inherit" onClick={() => navigate("/buyerhome")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/buyerprofile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/buyeritemslist")}>
            Food items
          </Button>
          <Button color="inherit" onClick={() => navigate("/favourites")}>
            Favourites
          </Button>
          <Button color="inherit" onClick={() => navigate("/myorders")}>
            My orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BuyerNavbar;
