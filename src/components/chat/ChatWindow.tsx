import { Box } from "@mui/material";
import { tss } from "tss-react/mui";
import type { Message } from "../../types/chat";
import type { User } from "../../types/chat";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

interface ChatWindowProps {
  participant: User | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const useStyles = tss.create(({ theme }) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
}));

export const ChatWindow = ({
  participant,
  messages,
  onSendMessage,
}: ChatWindowProps) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <ChatHeader participant={participant} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </Box>
  );
};
