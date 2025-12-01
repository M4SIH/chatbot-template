import { Box, Typography, Paper } from "@mui/material";
import { tss } from "tss-react/mui";
import { NavigationSidebar } from "./NavigationSidebar";

const useStyles = tss.create(({ theme }) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f2f5",
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 600,
    textAlign: "center",
  },
}));

export const DashboardPage = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <NavigationSidebar />
      <Box className={classes.content}>
        <Paper className={classes.paper}>
          <Typography variant="h4" fontWeight={600} color="primary" gutterBottom>
            Welcome to Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is the default dashboard page. Navigate to "All Chats" to start
            messaging.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

