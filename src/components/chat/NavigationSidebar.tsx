import { Box, List, Avatar, Typography, Badge } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { tss } from "tss-react/mui";
import { currentUser } from "../../data/mockData";
import { getInitials } from "../../utils/userUtils";
import { useNavigation } from "../../hooks/useNavigation";
import { NavItem } from "./NavItem";

interface NavigationSidebarProps {
  activeNavItem?: string;
  onNavItemClick?: (item: string) => void;
}

const useBaseStyles = tss.create(({ theme }) => ({
  sidebar: {
    width: 280,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  brandingSection: {
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  brandingRow: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#0088cc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    color: "#ffffff",
    fontSize: 20,
  },
  navList: {
    flex: 1,
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  userSection: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  userBadge: {
    "& .MuiBadge-badge": {
      backgroundColor: "#4caf50",
      border: "2px solid #ffffff",
    },
  },
  userAvatar: {
    backgroundColor: "#0088cc",
    width: 40,
    height: 40,
  },
  userInfo: {
    flex: 1,
    minWidth: 0,
  },
  logoutIcon: {
    color: theme.palette.text.secondary,
    fontSize: 20,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}));

export const NavigationSidebar = ({
  activeNavItem,
  onNavItemClick,
}: NavigationSidebarProps) => {
  const navigate = useNavigate();
  const { currentActiveNavItem } = useNavigation({ activeNavItem });

  const handleNavClick = (itemId: string, route: string) => {
    onNavItemClick?.(itemId);
    navigate(route);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, route: "/" },
    { id: "chats", label: "All Chats", icon: ChatBubbleIcon, route: "/chats" },
    { id: "groups", label: "Groups", icon: GroupIcon, route: "/groups" },
    { id: "contacts", label: "Contacts", icon: PersonIcon, route: "/contacts" },
    {
      id: "settings",
      label: "Settings",
      icon: SettingsIcon,
      route: "/settings",
    },
  ];

  const { classes } = useBaseStyles();

  return (
    <Box className={classes.sidebar}>
      <Box className={classes.brandingSection}>
        <Box className={classes.brandingRow}>
          <Box className={classes.logoCircle}>
            <ChatBubbleIcon className={classes.logoIcon} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="#0088cc">
            Chargoon Chat
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Corporate Messenger
        </Typography>
      </Box>

      <List className={classes.navList}>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            route={item.route}
            isActive={currentActiveNavItem === item.id}
            onClick={handleNavClick}
          />
        ))}
      </List>

      <Box className={classes.userSection}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          className={classes.userBadge}
        >
          <Avatar className={classes.userAvatar}>
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} />
            ) : (
              getInitials(currentUser.name)
            )}
          </Avatar>
        </Badge>
        <Box className={classes.userInfo}>
          <Typography variant="subtitle2" fontWeight={600} noWrap>
            {currentUser.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {currentUser.isOnline ? "Online" : "Offline"}
          </Typography>
        </Box>
        <LogoutIcon className={classes.logoutIcon} />
      </Box>
    </Box>
  );
};
