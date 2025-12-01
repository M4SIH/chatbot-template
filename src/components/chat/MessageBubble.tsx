import { Box, Typography, Avatar } from "@mui/material";
import { tss } from "tss-react/mui";
import type { Message, User } from "../../types/chat";
import { currentUser } from "../../data/mockData";
import { getInitials } from "../../utils/userUtils";
import { formatTime } from "../../utils/dateUtils";
import { getMessageSender } from "../../utils/messageUtils";

interface MessageBubbleProps {
  message: Message;
  sender?: User;
}

const useStyles = tss
  .withParams<{ isFromCurrentUser: boolean }>()
  .create(({ theme, isFromCurrentUser }) => ({
    messageContainer: {
      display: "flex",
      justifyContent: isFromCurrentUser ? "flex-end" : "flex-start",
      alignItems: "flex-end",
      gap: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
      flexShrink: 0,
    },
    bubble: {
      maxWidth: "70%",
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
      paddingTop: theme.spacing(0.75),
      paddingBottom: theme.spacing(0.75),
      borderRadius: theme.spacing(2),
      backgroundColor: isFromCurrentUser 
        ? theme.palette.primary.main 
        : (theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]),
      color: isFromCurrentUser 
        ? theme.palette.primary.contrastText 
        : theme.palette.text.primary,
      borderTopLeftRadius: isFromCurrentUser
        ? theme.spacing(2)
        : theme.spacing(0.5),
      borderTopRightRadius: isFromCurrentUser
        ? theme.spacing(0.5)
        : theme.spacing(2),
      wordBreak: "break-word",
    },
    messageText: {
      fontSize: "0.9375rem",
      lineHeight: 1.4,
      marginBottom: theme.spacing(0.25),
    },
    timeText: {
      fontSize: "0.75rem",
      opacity: isFromCurrentUser ? 0.7 : 0.6,
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(0.25),
    },
  }));

export const MessageBubble = ({ message, sender }: MessageBubbleProps) => {
  const isFromCurrentUser = message.senderId === currentUser.id;
  const senderUser = getMessageSender(message, sender);

  const { classes } = useStyles({ isFromCurrentUser });

  return (
    <Box className={classes.messageContainer}>
      {!isFromCurrentUser && (
        <Avatar className={classes.avatar}>
          {senderUser?.avatar ? (
            <img src={senderUser.avatar} alt={senderUser.name} />
          ) : (
            getInitials(senderUser?.name || "U")
          )}
        </Avatar>
      )}
      <Box className={classes.bubble}>
        <Typography variant="body1" className={classes.messageText}>
          {message.content}
        </Typography>
        <Typography variant="caption" className={classes.timeText}>
          {formatTime(message.timestamp)}
        </Typography>
      </Box>
      {isFromCurrentUser && (
        <Avatar className={classes.avatar}>
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name} />
          ) : (
            getInitials(currentUser.name)
          )}
        </Avatar>
      )}
    </Box>
  );
};
