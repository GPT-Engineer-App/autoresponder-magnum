import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { navItems } from "@/nav-items";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Autoresponder Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems.slice(1).map((item) => (
          <Card key={item.to}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {item.icon}
                <Link to={item.to} className="hover:underline">
                  {item.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {item.title === "Auto-Reply" ? (
                  <>
                    Manage your auto-reply settings, including:
                    <ul className="list-disc list-inside mt-2">
                      <li>Ignore specific contacts/groups</li>
                      <li>Schedule messages</li>
                      <li>AI-powered responses</li>
                      <li>Automatic follow-ups</li>
                      <li>Backup and restore rules</li>
                    </ul>
                  </>
                ) : (
                  `Manage your ${item.title.toLowerCase()} settings and configurations.`
                )}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;