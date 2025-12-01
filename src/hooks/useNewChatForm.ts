import { useState, useMemo } from "react";
import Joi from "joi";
import type { User } from "../types/chat";
import { employees, currentUser } from "../data/mockData";

type FormMode = "message" | "group";

interface NewMessageFormData {
  selectedUser: User | null;
}

interface NewGroupFormData {
  name: string;
  description: string;
  selectedUsers: User[];
}

const newMessageSchema = Joi.object({
  selectedUser: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
  })
    .required()
    .messages({
      "any.required": "Please select a user to start a conversation",
      "object.base": "Please select a valid user",
    }),
});

const newGroupSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.min": "Group name must be at least 3 characters",
      "string.empty": "Group name is required",
      "any.required": "Group name is required",
    }),
  description: Joi.string().allow("").optional(),
  selectedUsers: Joi.array()
    .min(1)
    .required()
    .messages({
      "array.min": "Please select at least one user",
      "any.required": "Please select at least one user",
    }),
});

interface UseNewChatFormReturn {
  mode: FormMode;
  messageFormData: NewMessageFormData;
  groupFormData: NewGroupFormData;
  messageErrors: Record<string, string>;
  groupErrors: Record<string, string>;
  searchQuery: string;
  availableUsers: User[];
  handleModeChange: (
    _event: React.MouseEvent<HTMLElement>,
    newMode: FormMode | null
  ) => void;
  setMessageFormData: React.Dispatch<React.SetStateAction<NewMessageFormData>>;
  setGroupFormData: React.Dispatch<React.SetStateAction<NewGroupFormData>>;
  setSearchQuery: (query: string) => void;
  validateMessageForm: () => boolean;
  validateGroupForm: () => boolean;
  handleMessageSubmit: () => void;
  handleGroupSubmit: () => void;
  resetForm: () => void;
  clearMessageError: (field: string) => void;
  clearGroupError: (field: string) => void;
}

/**
 * Custom hook for managing new chat form state and validation
 * Handles form mode, data, errors, validation, and submission
 */
export const useNewChatForm = (): UseNewChatFormReturn => {
  const [mode, setMode] = useState<FormMode>("message");
  const [messageFormData, setMessageFormData] = useState<NewMessageFormData>({
    selectedUser: null,
  });
  const [groupFormData, setGroupFormData] = useState<NewGroupFormData>({
    name: "",
    description: "",
    selectedUsers: [],
  });
  const [messageErrors, setMessageErrors] = useState<Record<string, string>>(
    {}
  );
  const [groupErrors, setGroupErrors] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query, excluding current user
  const availableUsers = useMemo(() => {
    const filtered = employees.filter(
      (user) =>
        user.id !== currentUser.id &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return filtered;
  }, [searchQuery]);

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: FormMode | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
      // Reset errors when switching modes
      setMessageErrors({});
      setGroupErrors({});
    }
  };

  const validateMessageForm = (): boolean => {
    const { error } = newMessageSchema.validate(messageFormData, {
      abortEarly: false,
    });

    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach((detail) => {
        const path = detail.path[0] as string;
        errors[path] = detail.message;
      });
      setMessageErrors(errors);
      return false;
    }

    setMessageErrors({});
    return true;
  };

  const validateGroupForm = (): boolean => {
    const { error } = newGroupSchema.validate(groupFormData, {
      abortEarly: false,
    });

    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach((detail) => {
        const path = detail.path[0] as string;
        errors[path] = detail.message;
      });
      setGroupErrors(errors);
      return false;
    }

    setGroupErrors({});
    return true;
  };

  const handleMessageSubmit = () => {
    if (validateMessageForm()) {
      console.log("New Message Form Data:", messageFormData);
      // TODO: Implement actual submission logic
    }
  };

  const handleGroupSubmit = () => {
    if (validateGroupForm()) {
      console.log("New Group Form Data:", groupFormData);
      // TODO: Implement actual submission logic
    }
  };

  const resetForm = () => {
    setMessageFormData({ selectedUser: null });
    setGroupFormData({ name: "", description: "", selectedUsers: [] });
    setMessageErrors({});
    setGroupErrors({});
  };

  return {
    mode,
    messageFormData,
    groupFormData,
    messageErrors,
    groupErrors,
    searchQuery,
    availableUsers,
    handleModeChange,
    setMessageFormData,
    setGroupFormData,
    setSearchQuery,
  validateMessageForm,
  validateGroupForm,
  handleMessageSubmit,
  handleGroupSubmit,
  resetForm,
  clearMessageError: (field: string) => {
    setMessageErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  },
  clearGroupError: (field: string) => {
    setGroupErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  },
};
};

