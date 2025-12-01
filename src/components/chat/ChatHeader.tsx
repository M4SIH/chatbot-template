import { Box, Avatar, Typography, Badge, IconButton } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { tss } from "tss-react/mui";
import { type User } from "../../types/chat";
import { getInitials } from "../../utils/userUtils";

interface ChatHeaderProps {
  participant: User | null;
}

const useStyles = tss
  .withParams<{ isOnline: boolean }>()
  .create(({ theme, isOnline }) => ({
    headerEmpty: {
      height: 64,
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: "#ffffff",
    },
    header: {
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: "#ffffff",
    },
    badge: {
      "& .MuiBadge-badge": {
        backgroundColor: isOnline ? "#4caf50" : "#9e9e9e",
        border: "2px solid #ffffff",
      },
    },
    avatar: {
      backgroundColor: "#0088cc",
      width: 40,
      height: 40,
    },
    participantInfo: {
      flex: 1,
    },
    statusText: {
      color: isOnline ? "#4caf50" : theme.palette.text.secondary,
      fontWeight: isOnline ? 500 : 400,
    },
    actionButtons: {
      display: "flex",
      gap: theme.spacing(0.5),
    },
  }));

export const ChatHeader = ({ participant }: ChatHeaderProps) => {
  const { classes } = useStyles({ isOnline: participant?.isOnline ?? false });

  if (!participant) {
    return (
      <Box className={classes.headerEmpty}>
        <Typography variant="h6" color="text.secondary">
          Select a conversation
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={classes.header}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        className={classes.badge}
      >
        <Avatar className={classes.avatar}>
          {participant.avatar ? (
            <img src={participant.avatar} alt={participant.name} />
          ) : (
            getInitials(participant.name)
          )}
        </Avatar>
      </Badge>
      <Box className={classes.participantInfo}>
        <Typography variant="subtitle1" fontWeight={600}>
          {participant.name}
        </Typography>
        <Typography variant="caption" className={classes.statusText}>
          {participant.isOnline ? "Online" : "Offline"}
        </Typography>
      </Box>
      <Box className={classes.actionButtons}>
        <IconButton size="small">
          <VideocamIcon />
        </IconButton>
        <IconButton size="small">
          <PhoneIcon />
        </IconButton>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
