import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const BulkMessaging = () => {
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock function to send bulk messages
    console.log("Sending bulk messages:", { recipients, message });
    toast.success("Bulk messages sent successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Bulk Messaging</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="recipients">Recipients (comma-separated)</Label>
          <Input
            id="recipients"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="Enter recipient phone numbers"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            required
          />
        </div>
        <Button type="submit">Send Bulk Messages</Button>
      </form>
    </div>
  );
};

export default BulkMessaging;