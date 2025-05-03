import {
  styled,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  useTheme,
  Box,
} from "@mui/material";
import { DrawerHeaderProps, drawerWidth } from "./types";
import smallLogoDark from "../../assets/small-logo-dark.png";
import smallLogoLight from "../../assets/small-logo-light.png";
import Menu from "../menu/Menu";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerAppBar: React.FC<DrawerHeaderProps> = ({ open = false }) => {
  const theme = useTheme();

  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar disableGutters>
        {!open && (
          <Box
            component="img"
            src={theme.palette.mode === "dark" ? smallLogoDark : smallLogoLight}
            alt="Logo"
            sx={{
              height: 32,
              width: "auto",
              ml: 2.25,
            }}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Menu />
      </Toolbar>
    </AppBar>
  );
};

export default DrawerAppBar;
