import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { initialConversations } from "./data/mockData";

// Lazy load route components
const DashboardPage = lazy(() =>
  import("./components/chat/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  }))
);
const DashboardLayout = lazy(() =>
  import("./components/chat/DashboardLayout").then((module) => ({
    default: module.DashboardLayout,
  }))
);
const ChatLayout = lazy(() =>
  import("./components/chat/ChatLayout").then((module) => ({
    default: module.ChatLayout,
  }))
);
const NewChatPage = lazy(() =>
  import("./components/chat/NewChatPage").then((module) => ({
    default: module.NewChatPage,
  }))
);

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route
            path="/chats"
            element={<DashboardLayout conversations={initialConversations} />}
          />
          <Route path="/chats/new" element={<NewChatPage />} />
          <Route
            path="/chats/:conversationId"
            element={<ChatLayout conversations={initialConversations} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
