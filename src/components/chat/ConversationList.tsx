import { Box, List, Divider } from "@mui/material";
import { tss } from "tss-react/mui";
import type { Conversation } from "../../types/chat";
import { ConversationItem } from "./ConversationItem";
import { getInitials } from "../../utils/userUtils";
import { formatLastMessageTime } from "../../utils/dateUtils";
import { truncateMessage } from "../../utils/textUtils";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  showBorder?: boolean;
}

const useStyles = tss
  .withParams<{ showBorder: boolean }>()
  .create(({ theme, showBorder }) => ({
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
      ...(showBorder && {
        borderRight: `1px solid ${theme.palette.divider}`,
      }),
    },
    list: {
      flex: 1,
      overflowY: "auto",
      padding: 0,
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#c1c1c1",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#a8a8a8",
      },
    },
  }));

export const ConversationList = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  showBorder = false,
}: ConversationListProps) => {
  const { classes } = useStyles({ showBorder });

  return (
    <Box className={classes.container}>
      <List className={classes.list}>
        {conversations.map((conversation, index) => (
          <Box key={conversation.id}>
            <ConversationItem
              conversation={conversation}
              isSelected={selectedConversationId === conversation.id}
              onSelect={() => onSelectConversation(conversation.id)}
              formatLastMessageTime={formatLastMessageTime}
              truncateMessage={truncateMessage}
              getInitials={getInitials}
            />
            {index < conversations.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Box>
  );
};
