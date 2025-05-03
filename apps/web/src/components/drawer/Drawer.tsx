import {
  CSSObject,
  Drawer as MuiDrawer,
  styled,
  Theme,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { DrawerButton } from "./DrawerButton";
import DrawerItems from "./DrawerItems";
import { navigationSections } from "@/config/navigation";
import { drawerWidth } from "./types";
import DrawerAppBar from "./DrawerAppBar";
import fullLogoDark from "../../assets/full-logo-dark.png";
import fullLogoLight from "../../assets/full-logo-light.png";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const CustomDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    borderRight: "none",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const Drawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const buttonLeft = open ? drawerWidth - 20 : parseInt(theme.spacing(7)) - 12;

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DrawerAppBar open={open} />

      <CustomDrawer variant="permanent" open={open}>
        <DrawerHeader>
          {open && (
            <Box
              component="img"
              src={theme.palette.mode === "dark" ? fullLogoDark : fullLogoLight}
              alt="Logo"
              sx={{
                height: 32,
                width: "auto",
                mr: 2,
              }}
            />
          )}
        </DrawerHeader>
        <Box sx={{ position: "relative", height: "100%" }}>
          <DrawerItems isCollapsed={!open} sections={navigationSections} />
        </Box>
      </CustomDrawer>

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: `${buttonLeft}px`,
          transform: "translateY(-50%)",
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create("left", {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.sharp,
          }),
        }}
      >
        <DrawerButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </DrawerButton>
      </Box>
    </Box>
  );
};

export default Drawer;
