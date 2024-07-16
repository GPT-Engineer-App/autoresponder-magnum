import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const AntiBanFeatures = () => {
  const [messageLimit, setMessageLimit] = useState("");
  const [delayBetweenMessages, setDelayBetweenMessages] = useState("");
  const [enableRandomDelay, setEnableRandomDelay] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock function to save anti-ban settings
    console.log("Saving anti-ban settings:", { messageLimit, delayBetweenMessages, enableRandomDelay });
    toast.success("Anti-ban features configured successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Anti-Ban Features</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="messageLimit">Message Limit (per day)</Label>
          <Input
            id="messageLimit"
            type="number"
            value={messageLimit}
            onChange={(e) => setMessageLimit(e.target.value)}
            placeholder="Enter message limit"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="delayBetweenMessages">Delay Between Messages (seconds)</Label>
          <Input
            id="delayBetweenMessages"
            type="number"
            value={delayBetweenMessages}
            onChange={(e) => setDelayBetweenMessages(e.target.value)}
            placeholder="Enter delay in seconds"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="randomDelay"
            checked={enableRandomDelay}
            onCheckedChange={setEnableRandomDelay}
          />
          <Label htmlFor="randomDelay">Enable Random Delay</Label>
        </div>
        <Button type="submit">Save Anti-Ban Settings</Button>
      </form>
    </div>
  );
};

export default AntiBanFeatures;