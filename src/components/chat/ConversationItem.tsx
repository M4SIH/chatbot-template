import {
  Box,
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  Badge,
} from "@mui/material";
import { tss } from "tss-react/mui";
import type { Conversation } from "../../types/chat";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: () => void;
  formatLastMessageTime: (timestamp?: Date) => string;
  truncateMessage: (text: string, maxLength?: number) => string;
  getInitials: (name: string) => string;
}

const useStyles = tss
  .withParams<{ isOnline: boolean }>()
  .create(({ theme, isOnline }) => ({
    listItemButton: {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      "&.Mui-selected": {
        backgroundColor: "#e3f2fd",
        "&:hover": {
          backgroundColor: "#e3f2fd",
        },
      },
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
    statusBadge: {
      marginRight: theme.spacing(2),
      "& .MuiBadge-badge": {
        backgroundColor: isOnline ? "#4caf50" : "#9e9e9e",
        border: "2px solid #ffffff",
      },
    },
    avatar: {
      backgroundColor: "#0088cc",
      width: 48,
      height: 48,
    },
    contentBox: {
      flex: 1,
      minWidth: 0,
    },
    headerBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(0.5),
    },
    participantName: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    messageRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    messageText: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    unreadBadge: {
      marginLeft: theme.spacing(1),
      "& .MuiBadge-badge": {
        backgroundColor: "#0088cc",
      },
    },
  }));

export const ConversationItem = ({
  conversation,
  isSelected,
  onSelect,
  formatLastMessageTime,
  truncateMessage,
  getInitials,
}: ConversationItemProps) => {
  const { classes } = useStyles({
    isOnline: conversation.participant.isOnline ?? false,
  });

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={isSelected}
        onClick={onSelect}
        className={classes.listItemButton}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          className={classes.statusBadge}
        >
          <Avatar className={classes.avatar}>
            {conversation.participant.avatar ? (
              <img
                src={conversation.participant.avatar}
                alt={conversation.participant.name}
              />
            ) : (
              getInitials(conversation.participant.name)
            )}
          </Avatar>
        </Badge>
        <Box className={classes.contentBox}>
          <Box className={classes.headerBox}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              className={classes.participantName}
            >
              {conversation.participant.name}
            </Typography>
            {conversation.lastMessage && (
              <Typography variant="caption" color="text.secondary">
                {formatLastMessageTime(conversation.lastMessage.timestamp)}
              </Typography>
            )}
          </Box>
          <Box className={classes.messageRow}>
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.messageText}
            >
              {conversation.lastMessage
                ? truncateMessage(conversation.lastMessage.content)
                : "No messages yet"}
            </Typography>
            {(conversation.unreadCount ?? 0) > 0 && (
              <Badge
                badgeContent={conversation.unreadCount}
                color="primary"
                className={classes.unreadBadge}
              />
            )}
          </Box>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
