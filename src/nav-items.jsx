import { Home, Bell, MessageSquare, Users, Tag, Shield, Reply } from "lucide-react";
import Index from "./pages/Index.jsx";
import AutomatedNotifications from "./pages/AutomatedNotifications.jsx";
import ChatbotIntegration from "./pages/ChatbotIntegration.jsx";
import BulkMessaging from "./pages/BulkMessaging.jsx";
import LabelManagement from "./pages/LabelManagement.jsx";
import AntiBanFeatures from "./pages/AntiBanFeatures.jsx";
import AutoReply from "./pages/AutoReply.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Automated Notifications",
    to: "/automated-notifications",
    icon: <Bell className="h-4 w-4" />,
    page: <AutomatedNotifications />,
  },
  {
    title: "Chatbot Integration",
    to: "/chatbot-integration",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <ChatbotIntegration />,
  },
  {
    title: "Bulk Messaging",
    to: "/bulk-messaging",
    icon: <Users className="h-4 w-4" />,
    page: <BulkMessaging />,
  },
  {
    title: "Label Management",
    to: "/label-management",
    icon: <Tag className="h-4 w-4" />,
    page: <LabelManagement />,
  },
  {
    title: "Anti-Ban Features",
    to: "/anti-ban-features",
    icon: <Shield className="h-4 w-4" />,
    page: <AntiBanFeatures />,
  },
  {
    title: "Auto-Reply",
    to: "/auto-reply",
    icon: <Reply className="h-4 w-4" />,
    page: <AutoReply />,
  },
];