import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PlusCircle, Trash2, Download, Upload } from "lucide-react";

const AutoReply = () => {
  const [rules, setRules] = useState([
    { trigger: "", responses: [""], recipientType: "all", ignoredContacts: "", scheduledTime: "", aiService: "", followUpTime: "", mediaType: "text" }
  ]);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [enableWelcomeMessage, setEnableWelcomeMessage] = useState(false);

  const handleAddRule = () => {
    setRules([...rules, { trigger: "", responses: [""], recipientType: "all", ignoredContacts: "", scheduledTime: "", aiService: "", followUpTime: "", mediaType: "text" }]);
  };

  const handleRemoveRule = (index) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  const handleRuleChange = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);
  };

  const handleAddResponse = (ruleIndex) => {
    const newRules = [...rules];
    newRules[ruleIndex].responses.push("");
    setRules(newRules);
  };

  const handleRemoveResponse = (ruleIndex, responseIndex) => {
    const newRules = [...rules];
    newRules[ruleIndex].responses = newRules[ruleIndex].responses.filter((_, i) => i !== responseIndex);
    setRules(newRules);
  };

  const handleResponseChange = (ruleIndex, responseIndex, value) => {
    const newRules = [...rules];
    newRules[ruleIndex].responses[responseIndex] = value;
    setRules(newRules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving auto-reply settings:", { rules, welcomeMessage, enableWelcomeMessage });
    toast.success("Auto-reply configured successfully!");
  };

  const handleExportRules = () => {
    const dataStr = JSON.stringify({ rules, welcomeMessage, enableWelcomeMessage });
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'auto_reply_rules.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Rules exported successfully!");
  };

  const handleImportRules = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setRules(importedData.rules);
          setWelcomeMessage(importedData.welcomeMessage);
          setEnableWelcomeMessage(importedData.enableWelcomeMessage);
          toast.success("Rules imported successfully!");
        } catch (error) {
          toast.error("Error importing rules. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Auto-Reply Configuration</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="enableWelcome"
              checked={enableWelcomeMessage}
              onCheckedChange={setEnableWelcomeMessage}
            />
            <Label htmlFor="enableWelcome">Enable Welcome Message</Label>
          </div>
          {enableWelcomeMessage && (
            <Textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              placeholder="Enter welcome message"
              className="mt-2"
            />
          )}
        </div>

        {rules.map((rule, ruleIndex) => (
          <div key={ruleIndex} className="border p-4 rounded-md space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Rule {ruleIndex + 1}</h3>
              <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveRule(ruleIndex)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`trigger-${ruleIndex}`}>Trigger Word/Phrase</Label>
              <Input
                id={`trigger-${ruleIndex}`}
                value={rule.trigger}
                onChange={(e) => handleRuleChange(ruleIndex, "trigger", e.target.value)}
                placeholder="Enter trigger word or phrase"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`recipientType-${ruleIndex}`}>Recipient Type</Label>
              <Select
                value={rule.recipientType}
                onValueChange={(value) => handleRuleChange(ruleIndex, "recipientType", value)}
              >
                <SelectTrigger id={`recipientType-${ruleIndex}`}>
                  <SelectValue placeholder="Select recipient type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="groups">Groups</SelectItem>
                  <SelectItem value="unknown">Unknown Numbers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`ignoredContacts-${ruleIndex}`}>Ignored Contacts/Groups</Label>
              <Input
                id={`ignoredContacts-${ruleIndex}`}
                value={rule.ignoredContacts}
                onChange={(e) => handleRuleChange(ruleIndex, "ignoredContacts", e.target.value)}
                placeholder="Enter ignored contacts or groups (comma-separated)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`scheduledTime-${ruleIndex}`}>Scheduled Time</Label>
              <Input
                id={`scheduledTime-${ruleIndex}`}
                type="datetime-local"
                value={rule.scheduledTime}
                onChange={(e) => handleRuleChange(ruleIndex, "scheduledTime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`aiService-${ruleIndex}`}>AI Service</Label>
              <Select
                value={rule.aiService}
                onValueChange={(value) => handleRuleChange(ruleIndex, "aiService", value)}
              >
                <SelectTrigger id={`aiService-${ruleIndex}`}>
                  <SelectValue placeholder="Select AI service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  <SelectItem value="gpt3">GPT-3</SelectItem>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="dialogflow">Dialogflow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`followUpTime-${ruleIndex}`}>Follow-up Time (hours)</Label>
              <Input
                id={`followUpTime-${ruleIndex}`}
                type="number"
                value={rule.followUpTime}
                onChange={(e) => handleRuleChange(ruleIndex, "followUpTime", e.target.value)}
                placeholder="Enter follow-up time in hours"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`mediaType-${ruleIndex}`}>Media Type</Label>
              <Select
                value={rule.mediaType}
                onValueChange={(value) => handleRuleChange(ruleIndex, "mediaType", value)}
              >
                <SelectTrigger id={`mediaType-${ruleIndex}`}>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {rule.responses.map((response, responseIndex) => (
              <div key={responseIndex} className="space-y-2">
                <Label htmlFor={`response-${ruleIndex}-${responseIndex}`}>Response {responseIndex + 1}</Label>
                <div className="flex space-x-2">
                  {rule.mediaType === 'text' ? (
                    <Textarea
                      id={`response-${ruleIndex}-${responseIndex}`}
                      value={response}
                      onChange={(e) => handleResponseChange(ruleIndex, responseIndex, e.target.value)}
                      placeholder="Enter auto-reply message"
                      required
                    />
                  ) : (
                    <Input
                      id={`response-${ruleIndex}-${responseIndex}`}
                      type="file"
                      onChange={(e) => handleResponseChange(ruleIndex, responseIndex, e.target.files[0])}
                      accept={rule.mediaType === 'image' ? 'image/*' : rule.mediaType === 'audio' ? 'audio/*' : rule.mediaType === 'video' ? 'video/*' : '*/*'}
                      required
                    />
                  )}
                  <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveResponse(ruleIndex, responseIndex)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => handleAddResponse(ruleIndex)}>
              Add Response
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={handleAddRule}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Rule
        </Button>
        <div className="flex space-x-4">
          <Button type="submit">Save Auto-Reply Configuration</Button>
          <Button type="button" variant="secondary" onClick={handleExportRules}>
            <Download className="mr-2 h-4 w-4" /> Export Rules
          </Button>
          <div>
            <input
              type="file"
              id="importRules"
              className="hidden"
              onChange={handleImportRules}
              accept=".json"
            />
            <Button type="button" variant="secondary" onClick={() => document.getElementById('importRules').click()}>
              <Upload className="mr-2 h-4 w-4" /> Import Rules
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AutoReply;