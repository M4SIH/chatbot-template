import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Badge,
  Button,
  Switch,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tss } from "tss-react/mui";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { currentUser } from "../../data/mockData";
import { getInitials } from "../../utils/userUtils";
import { useThemeMode } from "../../contexts/ThemeContext";

interface DashboardHeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const useStyles = tss.create(({ theme }) => ({
  header: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    fontSize: 20,
  },
  textField: {
    maxWidth: 400,
    "& .MuiOutlinedInput-root": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.grey[800]
          : theme.palette.grey[100],
      borderRadius: theme.spacing(2),
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  newChatButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textTransform: "none",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1, 2),
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginLeft: "auto",
  },
  themeToggle: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(0.5),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: 36,
    height: 36,
    cursor: "pointer",
  },
}));

export const DashboardHeader = ({
  searchValue = "",
  onSearchChange,
}: DashboardHeaderProps) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { mode, toggleMode } = useThemeMode();

  const handleNewChat = () => {
    navigate("/chats/new");
  };

  return (
    <Box className={classes.header}>
      <Button
        startIcon={<AddIcon />}
        onClick={handleNewChat}
        className={classes.newChatButton}
      >
        New Chat
      </Button>
      <TextField
        fullWidth
        placeholder="Search chats..."
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          ),
        }}
        className={classes.textField}
      />
      <Box className={classes.actions}>
        <Box className={classes.themeToggle}>
          <LightModeIcon fontSize="small" />
          <Tooltip
            title={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            <Switch
              checked={mode === "dark"}
              onChange={toggleMode}
              size="small"
            />
          </Tooltip>
          <DarkModeIcon fontSize="small" />
        </Box>
        <IconButton>
          <Badge badgeContent={3} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar className={classes.avatar}>
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name} />
          ) : (
            getInitials(currentUser.name)
          )}
        </Avatar>
      </Box>
    </Box>
  );
};
