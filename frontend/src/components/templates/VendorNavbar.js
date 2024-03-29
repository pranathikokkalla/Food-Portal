import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const VendorNavbar = () => {
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
            Vendor
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/vendorhome")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendorprofile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendorfood")}>
            Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/vendororders")}>
            Orders
          </Button>
          <Button color="inherit" onClick={() => navigate("/statisticspage")}>
            Statistics Page
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default VendorNavbar;
