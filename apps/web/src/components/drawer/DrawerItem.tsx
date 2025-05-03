import React from "react";
import {
  ListItemButton as MuiListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { DrawerItemProps } from "./types";

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DrawerItem: React.FC<DrawerItemProps> = ({
  icon: IconComponent,
  text,
  route,
  isCollapsed = false,
  selected = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  const itemContent = (
    <ListItemButton
      onClick={handleClick}
      selected={selected}
      sx={{
        justifyContent: isCollapsed ? "center" : "flex-start",
        alignItems: "center",
        alignContent: "center",
        minHeight: 48,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: isCollapsed ? 0 : 40,
          marginRight: isCollapsed ? 0 : 2,
          justifyContent: "center",
        }}
      >
        <IconComponent />
      </ListItemIcon>
      {!isCollapsed && <ListItemText primary={text} />}
    </ListItemButton>
  );

  return isCollapsed ? (
    <Tooltip title={text} placement="right">
      {itemContent}
    </Tooltip>
  ) : (
    itemContent
  );
};

export default DrawerItem;
