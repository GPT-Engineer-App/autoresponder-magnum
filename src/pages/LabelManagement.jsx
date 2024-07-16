import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const LabelManagement = () => {
  const [labelName, setLabelName] = useState("");
  const [syncEnabled, setSyncEnabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock function to manage labels
    console.log("Managing label:", { labelName, syncEnabled });
    toast.success("Label configured successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Label Management</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="labelName">Label Name</Label>
          <Input
            id="labelName"
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
            placeholder="Enter label name"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="sync"
            checked={syncEnabled}
            onCheckedChange={setSyncEnabled}
          />
          <Label htmlFor="sync">Enable Sync</Label>
        </div>
        <Button type="submit">Configure Label</Button>
      </form>
    </div>
  );
};

export default LabelManagement;