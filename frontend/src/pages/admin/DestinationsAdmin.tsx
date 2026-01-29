import { useState } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import { Destination } from "@/types/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyDestination: Omit<Destination, "id"> = {
  city: "",
  country: "",
  from: "",
  image: "",
};

export default function AdminDestinations() {
  const { data, updateDestinations } = useSiteData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [formData, setFormData] = useState<Omit<Destination, "id">>(emptyDestination);

  const openAddDialog = () => {
    setEditingDest(null);
    setFormData(emptyDestination);
    setIsDialogOpen(true);
  };

  const openEditDialog = (dest: Destination) => {
    setEditingDest(dest);
    setFormData(dest);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDest) {
      const updated = data.destinations.map(d => 
        d.id === editingDest.id ? { ...formData, id: editingDest.id } : d
      );
      updateDestinations(updated);
      toast({ title: "Destination Updated", description: "The destination has been updated." });
    } else {
      const newDest: Destination = {
        ...formData,
        id: Date.now().toString(),
      };
      updateDestinations([...data.destinations, newDest]);
      toast({ title: "Destination Added", description: "New destination has been added." });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      updateDestinations(data.destinations.filter(d => d.id !== id));
      toast({ title: "Destination Deleted", description: "The destination has been deleted." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Flight Destinations</h1>
          <p className="text-muted-foreground">Manage popular flight destinations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDest ? "Edit Destination" : "Add New Destination"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from">Starting Price</Label>
                <Input
                  id="from"
                  placeholder="e.g., PKR 85,000"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDest ? "Update" : "Add"} Destination
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
                <TableHead>City</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Starting Price</TableHead>
                <TableHead>Image</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.destinations.map((dest) => (
                <TableRow key={dest.id}>
                  <TableCell className="font-medium">{dest.city}</TableCell>
                  <TableCell>{dest.country}</TableCell>
                  <TableCell>{dest.from}</TableCell>
                  <TableCell>
                    {dest.image && (
                      <img src={dest.image} alt={dest.city} className="w-16 h-10 object-cover rounded" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(dest)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(dest.id)}>
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
