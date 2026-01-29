import { useSiteData } from "@/hooks/useSiteData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plane, Building2, Users, BarChart3, RefreshCw, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { data, resetToDefaults } = useSiteData();
  const { toast } = useToast();

  const stats = [
    { label: "Umrah Packages", value: data.umrahPackages.length, icon: Package, to: "/admin/packages", color: "bg-blue-500" },
    { label: "Destinations", value: data.destinations.length, icon: Plane, to: "/admin/destinations", color: "bg-green-500" },
    { label: "Airlines", value: data.airlines.length, icon: Building2, to: "/admin/airlines", color: "bg-purple-500" },
    { label: "Team Members", value: data.teamMembers.length, icon: Users, to: "/admin/team", color: "bg-orange-500" },
  ];

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all data to defaults? This cannot be undone.")) {
      resetToDefaults();
      toast({
        title: "Data Reset",
        description: "All site data has been reset to defaults.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the admin panel</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              View Site
            </a>
          </Button>
          <Button variant="destructive" onClick={handleReset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.to}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your site content</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
            <Link to="/admin/packages">
              <Package className="h-6 w-6" />
              <span>Manage Packages</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
            <Link to="/admin/destinations">
              <Plane className="h-6 w-6" />
              <span>Manage Destinations</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
            <Link to="/admin/settings">
              <BarChart3 className="h-6 w-6" />
              <span>Site Settings</span>
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">Important Note</CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 text-sm space-y-2">
          <p>This admin panel uses localStorage for data storage.</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Changes are saved to your browser only</li>
            <li>Clearing browser data will delete all changes</li>
            <li>Other users/devices won't see your changes</li>
            <li>Use "Reset to Defaults" to restore original content</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
