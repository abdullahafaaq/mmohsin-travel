import { useState } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import { CounterStat } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Calendar, Users, Award, Clock, Building, Plane, Star, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const iconOptions = [
  { value: "Calendar", label: "Calendar", Icon: Calendar },
  { value: "Users", label: "Users", Icon: Users },
  { value: "Award", label: "Award", Icon: Award },
  { value: "Clock", label: "Clock", Icon: Clock },
  { value: "Building", label: "Building", Icon: Building },
  { value: "Plane", label: "Plane", Icon: Plane },
  { value: "Star", label: "Star", Icon: Star },
  { value: "Globe", label: "Globe", Icon: Globe },
];

const getIcon = (iconName: string) => {
  const found = iconOptions.find(o => o.value === iconName);
  return found ? found.Icon : Calendar;
};

const emptyStat: Omit<CounterStat, "id"> = {
  icon: "Calendar",
  target: 0,
  suffix: "+",
  label: "",
};

export default function AdminCounterStats() {
  const { data, updateCounterStats } = useSiteData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<CounterStat | null>(null);
  const [formData, setFormData] = useState<Omit<CounterStat, "id">>(emptyStat);

  const openAddDialog = () => {
    setEditingStat(null);
    setFormData(emptyStat);
    setIsDialogOpen(true);
  };

  const openEditDialog = (stat: CounterStat) => {
    setEditingStat(stat);
    setFormData(stat);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStat) {
      const updated = data.counterStats.map(s => 
        s.id === editingStat.id ? { ...formData, id: editingStat.id } : s
      );
      updateCounterStats(updated);
      toast({ title: "Stat Updated", description: "The counter stat has been updated." });
    } else {
      const newStat: CounterStat = {
        ...formData,
        id: Date.now().toString(),
      };
      updateCounterStats([...data.counterStats, newStat]);
      toast({ title: "Stat Added", description: "New counter stat has been added." });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this stat?")) {
      updateCounterStats(data.counterStats.filter(s => s.id !== id));
      toast({ title: "Stat Deleted", description: "The counter stat has been deleted." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Counter Stats</h1>
          <p className="text-muted-foreground">Manage the statistics shown on the homepage</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Stat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingStat ? "Edit Stat" : "Add New Stat"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.Icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Number</Label>
                <Input
                  id="target"
                  type="number"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suffix">Suffix</Label>
                <Input
                  id="suffix"
                  placeholder="e.g., + or %"
                  value={formData.suffix}
                  onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  placeholder="e.g., Happy Clients"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingStat ? "Update" : "Add"} Stat
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.counterStats.map((stat) => {
          const IconComponent = getIcon(stat.icon);
          return (
            <Card key={stat.id} className="text-center">
              <CardHeader className="pb-2">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(stat)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(stat.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">
                  {stat.target.toLocaleString()}{stat.suffix}
                </CardTitle>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
