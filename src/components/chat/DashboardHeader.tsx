import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Badge,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tss } from "tss-react/mui";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import { currentUser } from "../../data/mockData";
import { getInitials } from "../../utils/userUtils";

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
    backgroundColor: "#ffffff",
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    fontSize: 20,
  },
  textField: {
    maxWidth: 400,
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#f0f2f5",
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
    backgroundColor: "#0088cc",
    color: "#ffffff",
    textTransform: "none",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1, 2),
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#0077b3",
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: "#0088cc",
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
