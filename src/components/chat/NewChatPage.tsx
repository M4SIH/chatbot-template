import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { tss } from "tss-react/mui";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavigationSidebar } from "./NavigationSidebar";
import { NewChatForm } from "./NewChatForm";

const useStyles = tss.create(({ theme }) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    backgroundColor: "#f5f5f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#ffffff",
  },
  backButton: {
    color: theme.palette.text.primary,
  },
  content: {
    flex: 1,
    overflow: "auto",
    padding: theme.spacing(4, 0),
  },
}));

export const NewChatPage = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box className={classes.root}>
      <NavigationSidebar />
      <Box className={classes.mainContent}>
        <Box className={classes.header}>
          <IconButton onClick={handleBack} className={classes.backButton}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600}>
            New Chat
          </Typography>
        </Box>
        <Box className={classes.content}>
          <NewChatForm />
        </Box>
      </Box>
    </Box>
  );
};

