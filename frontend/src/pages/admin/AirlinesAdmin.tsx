import { useState } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import { Airline } from "@/types/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyAirline: Omit<Airline, "id"> = {
  name: "",
  logo: "",
};

export default function AdminAirlines() {
  const { data, updateAirlines } = useSiteData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAirline, setEditingAirline] = useState<Airline | null>(null);
  const [formData, setFormData] = useState<Omit<Airline, "id">>(emptyAirline);

  const openAddDialog = () => {
    setEditingAirline(null);
    setFormData(emptyAirline);
    setIsDialogOpen(true);
  };

  const openEditDialog = (airline: Airline) => {
    setEditingAirline(airline);
    setFormData(airline);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAirline) {
      const updated = data.airlines.map(a => 
        a.id === editingAirline.id ? { ...formData, id: editingAirline.id } : a
      );
      updateAirlines(updated);
      toast({ title: "Airline Updated", description: "The airline has been updated." });
    } else {
      const newAirline: Airline = {
        ...formData,
        id: Date.now().toString(),
      };
      updateAirlines([...data.airlines, newAirline]);
      toast({ title: "Airline Added", description: "New airline has been added." });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this airline?")) {
      updateAirlines(data.airlines.filter(a => a.id !== id));
      toast({ title: "Airline Deleted", description: "The airline has been deleted." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Airline Partners</h1>
          <p className="text-muted-foreground">Manage your airline partners</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Airline
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAirline ? "Edit Airline" : "Add New Airline"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Airline Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  type="url"
                  placeholder="https://... or /placeholder.svg"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAirline ? "Update" : "Add"} Airline
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Airline Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.airlines.map((airline) => (
                <TableRow key={airline.id}>
                  <TableCell>
                    <img 
                      src={airline.logo || "/placeholder.svg"} 
                      alt={airline.name} 
                      className="w-12 h-12 object-contain bg-muted rounded" 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{airline.name}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(airline)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(airline.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
