import { IconButton, styled } from "@mui/material";

export const DrawerButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.background.elevated,
  },
}));
