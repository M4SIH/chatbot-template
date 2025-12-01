import { useState, useMemo } from "react";
import type { Message, Conversation } from "../types/chat";
import { currentUser, messagesByConversation } from "../data/mockData";

interface UseMessagesProps {
  selectedConversationId: string | null;
  selectedConversation: Conversation | null;
}

interface UseMessagesReturn {
  messages: Message[];
  handleSendMessage: (content: string) => void;
}

/**
 * Custom hook for managing messages in a conversation
 * Handles message state, sending messages, and auto-response simulation
 */
export const useMessages = ({
  selectedConversationId,
  selectedConversation,
}: UseMessagesProps): UseMessagesReturn => {
  // Store new messages added during the session, keyed by conversation ID
  const [newMessages, setNewMessages] = useState<Record<string, Message[]>>({});

  // Derive messages by combining initial messages with new messages
  const messages = useMemo(() => {
    if (!selectedConversationId) return [];
    const initialMessages =
      messagesByConversation[selectedConversationId] || [];
    const sessionMessages = newMessages[selectedConversationId] || [];
    return [...initialMessages, ...sessionMessages];
  }, [selectedConversationId, newMessages]);

  const handleSendMessage = (content: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedConversation?.participant.id || "",
      content,
      timestamp: new Date(),
      isRead: false,
    };

    // Add message to new messages for this conversation
    setNewMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [
        ...(prev[selectedConversationId] || []),
        newMessage,
      ],
    }));

    // Simulate receiving a response after a delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: `msg-${Date.now()}-response`,
        senderId: selectedConversation?.participant.id || "",
        receiverId: currentUser.id,
        content: `Thanks for your message: "${content}"`,
        timestamp: new Date(),
        isRead: false,
      };
      setNewMessages((prev) => ({
        ...prev,
        [selectedConversationId]: [
          ...(prev[selectedConversationId] || []),
          responseMessage,
        ],
      }));
    }, 1000);
  };

  return {
    messages,
    handleSendMessage,
  };
};

