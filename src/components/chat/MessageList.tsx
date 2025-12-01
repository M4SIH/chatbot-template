import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { tss } from "tss-react/mui";
import type { Message } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
}

const useStyles = tss.create(({ theme }) => ({
  messageList: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.mode === 'dark' ? theme.palette.grey[800] : "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.mode === 'dark' ? theme.palette.grey[600] : "#c1c1c1",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.mode === 'dark' ? theme.palette.grey[500] : "#a8a8a8",
    },
  },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    color: theme.palette.text.secondary,
  },
}));

export const MessageList = ({ messages }: MessageListProps) => {
  const { classes } = useStyles();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box className={classes.messageList}>
      {messages.length === 0 ? (
        <Box className={classes.emptyState}>
          No messages yet. Start a conversation!
        </Box>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </Box>
  );
};
