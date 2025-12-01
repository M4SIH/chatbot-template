import { useState, type KeyboardEvent } from "react";

interface UseMessageInputReturn {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSend: () => void;
  handleKeyPress: (event: KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Custom hook for managing message input state and handlers
 * Handles input value, send functionality, and keyboard events
 */
export const useMessageInput = (
  onSendMessage: (content: string) => void
): UseMessageInputReturn => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return {
    inputValue,
    setInputValue,
    handleSend,
    handleKeyPress,
  };
};

