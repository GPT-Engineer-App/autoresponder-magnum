import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PlusCircle, Trash2 } from "lucide-react";

const AutoReply = () => {
  const [rules, setRules] = useState([
    { trigger: "", responses: [""], recipientType: "all" }
  ]);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [enableWelcomeMessage, setEnableWelcomeMessage] = useState(false);

  const handleAddRule = () => {
    setRules([...rules, { trigger: "", responses: [""], recipientType: "all" }]);
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
            {rule.responses.map((response, responseIndex) => (
              <div key={responseIndex} className="space-y-2">
                <Label htmlFor={`response-${ruleIndex}-${responseIndex}`}>Response {responseIndex + 1}</Label>
                <div className="flex space-x-2">
                  <Textarea
                    id={`response-${ruleIndex}-${responseIndex}`}
                    value={response}
                    onChange={(e) => handleResponseChange(ruleIndex, responseIndex, e.target.value)}
                    placeholder="Enter auto-reply message"
                    required
                  />
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
        <Button type="submit">Save Auto-Reply Configuration</Button>
      </form>
    </div>
  );
};

export default AutoReply;