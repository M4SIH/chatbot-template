import { useState, useMemo } from "react";
import type { Conversation } from "../types/chat";
import { messagesByConversation } from "../data/mockData";

interface UseConversationSearchReturn {
  searchValue: string;
  setSearchValue: (value: string) => void;
  filteredConversations: Conversation[];
}

/**
 * Custom hook for searching and filtering conversations
 * Handles search state and filters conversations based on search query
 */
export const useConversationSearch = (
  conversations: Conversation[]
): UseConversationSearchReturn => {
  const [searchValue, setSearchValue] = useState("");

  const filteredConversations = useMemo(() => {
    if (!searchValue.trim()) return conversations;

    const searchLower = searchValue.toLowerCase().trim();

    return conversations.filter((conv) => {
      // Search in participant name
      if (conv.participant.name.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in participant email if available
      if (conv.participant.email?.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in last message content
      if (conv.lastMessage?.content.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search through all messages in this conversation
      const messages = messagesByConversation[conv.id] || [];
      const foundInMessages = messages.some((message) =>
        message.content.toLowerCase().includes(searchLower)
      );

      return foundInMessages;
    });
  }, [conversations, searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredConversations,
  };
};

