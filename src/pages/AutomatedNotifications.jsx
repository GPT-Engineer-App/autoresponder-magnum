import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AutomatedNotifications = () => {
  const [notificationType, setNotificationType] = useState("");
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock function to send notification
    console.log("Sending notification:", { notificationType, message, delay });
    toast.success("Notification configured successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Automated Notifications</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="notificationType">Notification Type</Label>
          <Select value={notificationType} onValueChange={setNotificationType} required>
            <SelectTrigger id="notificationType">
              <SelectValue placeholder="Select notification type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="order">Order Notification</SelectItem>
              <SelectItem value="reminder">Reminder</SelectItem>
              <SelectItem value="update">Update</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your notification message"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="delay">Delay (in minutes)</Label>
          <Input
            id="delay"
            type="number"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            placeholder="Enter delay in minutes"
            required
          />
        </div>
        <Button type="submit">Configure Notification</Button>
      </form>
    </div>
  );
};

export default AutomatedNotifications;