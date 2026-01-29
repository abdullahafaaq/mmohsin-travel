import { useState } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import { UmrahPackage } from "@/types/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyPackage: Omit<UmrahPackage, "id"> = {
  name: "",
  duration: "",
  price: "",
  hotel: "",
  hotelRating: 3,
  distance: "",
  inclusions: [],
  featured: false,
  image: "",
};

export default function AdminUmrahPackages() {
  const { data, updateUmrahPackages } = useSiteData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UmrahPackage | null>(null);
  const [formData, setFormData] = useState<Omit<UmrahPackage, "id">>(emptyPackage);
  const [inclusionsText, setInclusionsText] = useState("");

  const openAddDialog = () => {
    setEditingPackage(null);
    setFormData(emptyPackage);
    setInclusionsText("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (pkg: UmrahPackage) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setInclusionsText(pkg.inclusions.join("\n"));
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inclusions = inclusionsText.split("\n").filter(i => i.trim());
    
    if (editingPackage) {
      const updated = data.umrahPackages.map(p => 
        p.id === editingPackage.id 
          ? { ...formData, id: editingPackage.id, inclusions } 
          : p
      );
      updateUmrahPackages(updated);
      toast({ title: "Package Updated", description: "The package has been updated successfully." });
    } else {
      const newPackage: UmrahPackage = {
        ...formData,
        id: Date.now().toString(),
        inclusions,
      };
      updateUmrahPackages([...data.umrahPackages, newPackage]);
      toast({ title: "Package Added", description: "New package has been added successfully." });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      updateUmrahPackages(data.umrahPackages.filter(p => p.id !== id));
      toast({ title: "Package Deleted", description: "The package has been deleted." });
    }
  };

  const toggleFeatured = (id: string) => {
    const updated = data.umrahPackages.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    updateUmrahPackages(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Umrah Packages</h1>
          <p className="text-muted-foreground">Manage your Umrah packages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPackage ? "Edit Package" : "Add New Package"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Package Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 7 Days / 6 Nights"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="e.g., PKR 185,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hotel">Hotel Name</Label>
                  <Input
                    id="hotel"
                    value={formData.hotel}
                    onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hotelRating">Hotel Rating (1-5)</Label>
                  <Input
                    id="hotelRating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.hotelRating}
                    onChange={(e) => setFormData({ ...formData, hotelRating: parseInt(e.target.value) || 3 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance from Haram</Label>
                  <Input
                    id="distance"
                    placeholder="e.g., 500m from Haram"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    required
                  />
                </div>
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

              <div className="space-y-2">
                <Label htmlFor="inclusions">Inclusions (one per line)</Label>
                <Textarea
                  id="inclusions"
                  rows={5}
                  placeholder="Umrah Visa Processing&#10;Return Flights&#10;Hotel Accommodation"
                  value={inclusionsText}
                  onChange={(e) => setInclusionsText(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Package</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPackage ? "Update Package" : "Add Package"}
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
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.umrahPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>{pkg.duration}</TableCell>
                  <TableCell>{pkg.price}</TableCell>
                  <TableCell>
                    {pkg.hotel}
                    <span className="ml-2 text-amber-500">
                      {"★".repeat(pkg.hotelRating)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(pkg.id)}
                      className={pkg.featured ? "text-amber-500" : "text-muted-foreground"}
                    >
                      <Star className={`h-4 w-4 ${pkg.featured ? "fill-current" : ""}`} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditDialog(pkg)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(pkg.id)}>
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
