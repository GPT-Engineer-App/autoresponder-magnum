import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ChatbotIntegration = () => {
  const [apiKey, setApiKey] = useState("");
  const [defaultResponse, setDefaultResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock function to configure chatbot
    console.log("Configuring chatbot:", { apiKey, defaultResponse });
    toast.success("Chatbot configured successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Chatbot Integration</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="defaultResponse">Default Response</Label>
          <Textarea
            id="defaultResponse"
            value={defaultResponse}
            onChange={(e) => setDefaultResponse(e.target.value)}
            placeholder="Enter default chatbot response"
            required
          />
        </div>
        <Button type="submit">Configure Chatbot</Button>
      </form>
    </div>
  );
};

export default ChatbotIntegration;