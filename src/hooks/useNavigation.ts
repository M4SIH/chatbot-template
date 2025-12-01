import { useLocation } from "react-router-dom";

interface UseNavigationProps {
  activeNavItem?: string;
}

interface UseNavigationReturn {
  currentActiveNavItem: string;
}

/**
 * Custom hook for determining active navigation item based on route
 */
export const useNavigation = ({
  activeNavItem,
}: UseNavigationProps): UseNavigationReturn => {
  const location = useLocation();

  const getActiveNavItem = () => {
    if (activeNavItem) return activeNavItem;
    if (location.pathname === "/") return "dashboard";
    if (location.pathname.startsWith("/chats")) return "chats";
    return "";
  };

  const currentActiveNavItem = getActiveNavItem();

  return {
    currentActiveNavItem,
  };
};
