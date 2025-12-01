import { ListItem, ListItemButton, Typography } from "@mui/material";
import { tss } from "tss-react/mui";

interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  route: string;
  isActive: boolean;
  onClick: (itemId: string, route: string) => void;
}

const useNavItemStyles = tss
  .withParams<{ isActive: boolean }>()
  .create(({ theme, isActive }) => ({
    navListItem: {
      marginBottom: theme.spacing(0.5),
    },
    navItemButton: {
      borderRadius: theme.spacing(2),
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      backgroundColor: isActive 
        ? (theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light)
        : "transparent",
      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
      "&:hover": {
        backgroundColor: isActive 
          ? (theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light)
          : theme.palette.action.hover,
      },
    },
    navIcon: {
      marginRight: theme.spacing(2),
      fontSize: 20,
      color: isActive ? theme.palette.primary.main : "inherit",
    },
    navLabel: {
      flex: 1,
    },
  }));

export const NavItem = ({
  id,
  label,
  icon: Icon,
  route,
  isActive,
  onClick,
}: NavItemProps) => {
  const { classes } = useNavItemStyles({ isActive });

  return (
    <ListItem disablePadding className={classes.navListItem}>
      <ListItemButton
        onClick={() => onClick(id, route)}
        className={classes.navItemButton}
      >
        <Icon className={classes.navIcon} />
        <Typography
          variant="body1"
          fontWeight={isActive ? 600 : 400}
          className={classes.navLabel}
        >
          {label}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
};

