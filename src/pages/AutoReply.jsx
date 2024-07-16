import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AutoReply = () => {
  const [trigger, setTrigger] = useState("");
  const [response, setResponse] = useState("");
  const [includeMedia, setIncludeMedia] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [includeVoice, setIncludeVoice] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock function to save auto-reply settings
    console.log("Saving auto-reply settings:", { trigger, response, includeMedia, mediaType, mediaFile, includeVoice, voiceMessage });
    toast.success("Auto-reply configured successfully!");
  };

  const handleMediaFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  const handleVoiceMessageChange = (e) => {
    setVoiceMessage(e.target.files[0]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Auto-Reply Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="trigger">Trigger Word/Phrase</Label>
          <Input
            id="trigger"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="Enter trigger word or phrase"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="response">Auto-Reply Message</Label>
          <Textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Enter auto-reply message"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="includeMedia"
            checked={includeMedia}
            onCheckedChange={setIncludeMedia}
          />
          <Label htmlFor="includeMedia">Include Media</Label>
        </div>
        {includeMedia && (
          <div className="space-y-2">
            <Label htmlFor="mediaType">Media Type</Label>
            <Select value={mediaType} onValueChange={setMediaType}>
              <SelectTrigger id="mediaType">
                <SelectValue placeholder="Select media type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="document">Document</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="mediaFile"
              type="file"
              onChange={handleMediaFileChange}
              accept={mediaType === 'image' ? 'image/*' : mediaType === 'video' ? 'video/*' : '*/*'}
            />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Switch
            id="includeVoice"
            checked={includeVoice}
            onCheckedChange={setIncludeVoice}
          />
          <Label htmlFor="includeVoice">Include Voice Message</Label>
        </div>
        {includeVoice && (
          <div className="space-y-2">
            <Label htmlFor="voiceMessage">Voice Message</Label>
            <Input
              id="voiceMessage"
              type="file"
              onChange={handleVoiceMessageChange}
              accept="audio/*"
            />
          </div>
        )}
        <Button type="submit">Save Auto-Reply</Button>
      </form>
    </div>
  );
};

export default AutoReply;