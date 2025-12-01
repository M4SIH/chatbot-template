import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { tss } from "tss-react/mui";
import type { Conversation } from "../../types/chat";
import { NavigationSidebar } from "./NavigationSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { ConversationList } from "./ConversationList";
import { useConversationSearch } from "../../hooks/useConversationSearch";

interface DashboardLayoutProps {
  conversations: Conversation[];
  onSelectConversation?: (conversationId: string) => void;
}

const useStyles = tss.create(() => ({
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
    overflow: "hidden",
  },
  conversationListContainer: {
    flex: 1,
    overflow: "hidden",
  },
}));

export const DashboardLayout = ({
  conversations,
  onSelectConversation,
}: DashboardLayoutProps) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { searchValue, setSearchValue, filteredConversations } =
    useConversationSearch(conversations);

  const handleSelectConversation = (conversationId: string) => {
    onSelectConversation?.(conversationId);
    navigate(`/chats/${conversationId}`);
  };

  return (
    <Box className={classes.root}>
      <NavigationSidebar />
      <Box className={classes.mainContent}>
        <DashboardHeader
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        <Box className={classes.conversationListContainer}>
          <ConversationList
            conversations={filteredConversations}
            selectedConversationId={null}
            onSelectConversation={handleSelectConversation}
          />
        </Box>
      </Box>
    </Box>
  );
};
