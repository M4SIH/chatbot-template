import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { tss } from "tss-react/mui";
import type { Conversation } from "../../types/chat";
import { NavigationSidebar } from "./NavigationSidebar";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { useMessages } from "../../hooks/useMessages";

interface ChatLayoutProps {
  conversations: Conversation[];
}

const useStyles = tss.create(({ theme }) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  conversationListContainer: {
    width: 320,
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: "hidden",
  },
}));

export const ChatLayout = ({ conversations }: ChatLayoutProps) => {
  const { classes } = useStyles();
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();

  const selectedConversationId = conversationId || null;

  useEffect(() => {
    if (!conversationId) {
      navigate("/chats", { replace: true });
    }
  }, [conversationId, navigate]);

  const selectedConversation =
    conversations.find((c) => c.id === selectedConversationId) || null;

  const { messages, handleSendMessage } = useMessages({
    selectedConversationId,
    selectedConversation,
  });

  return (
    <Box className={classes.root}>
      <NavigationSidebar />
      <Box className={classes.conversationListContainer}>
        <ConversationList
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={(conversationId) => {
            navigate(`/chats/${conversationId}`);
          }}
          showBorder={false}
        />
      </Box>
      <ChatWindow
        participant={selectedConversation?.participant || null}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </Box>
  );
};
