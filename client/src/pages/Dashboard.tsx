import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Enquiry } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, ExternalLink, ShieldCheck, Phone, Mail, MessageSquare, Settings, LogOut, User, Lock } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ZoomIn } from "lucide-react";

export default function Dashboard() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [profileSaving, setProfileSaving] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Queries
    const { data: enquiries, isLoading: isEnquiriesLoading } = useQuery<Enquiry[]>({
        queryKey: ["/api/admin/enquiries"],
        enabled: user?.role === "admin",
    });

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white transition-colors duration-500">
            {/* Decorative background */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,#d4af3711,transparent_50%)]" />

            {/* Top Bar */}
            <div className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                            <ShieldCheck className="text-gold w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-white uppercase tracking-widest">Admin Panel</h1>
                            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">India Granite</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="border-white/10 text-white/60 hover:text-white hover:border-gold" onClick={() => window.location.href = "/"}>
                            <ExternalLink size={14} className="mr-2" />
                            View Site
                        </Button>
                        <Button variant="ghost" className="text-red-500/50 hover:text-red-500 hover:bg-red-500/5" onClick={() => apiRequest("POST", "/api/logout").then(() => window.location.href = "/auth")}>
                            <LogOut size={14} className="mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Welcome Banner */}
                <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-gold/5 to-transparent border border-gold/10">
                    <h2 className="text-2xl font-serif text-white">Welcome back, <span className="text-gold">{user.username}</span></h2>
                    <p className="text-white/40 text-sm mt-1">Manage your enquiries and account settings below.</p>
                </div>

                <Tabs defaultValue="enquiries" className="space-y-6">
                    <TabsList className="bg-white/5 border border-white/10 p-1">
                        <TabsTrigger value="enquiries" className="data-[state=active]:bg-gold data-[state=active]:text-black uppercase tracking-widest text-xs px-8 py-3 transition-all gap-2">
                            <MessageSquare size={14} />
                            Enquiries
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="data-[state=active]:bg-gold data-[state=active]:text-black uppercase tracking-widest text-xs px-8 py-3 transition-all gap-2">
                            <Settings size={14} />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    {/* ENQUIRIES TAB */}
                    <TabsContent value="enquiries">
                        <Card className="bg-[#0a0a0a] border-white/5">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-white font-serif uppercase tracking-widest">Contact Enquiries</CardTitle>
                                    <p className="text-white/30 text-xs mt-1">{enquiries?.length || 0} total enquiries</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {isEnquiriesLoading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <Loader2 className="animate-spin text-gold w-8 h-8" />
                                    </div>
                                ) : enquiries && enquiries.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-white/5 hover:bg-transparent">
                                                <TableHead className="text-white/40 uppercase tracking-widest text-[10px]">Client Name</TableHead>
                                                <TableHead className="text-white/40 uppercase tracking-widest text-[10px]">Contact Info</TableHead>
                                                <TableHead className="text-white/40 uppercase tracking-widest text-[10px]">Message</TableHead>
                                                <TableHead className="text-white/40 uppercase tracking-widest text-[10px]">Date</TableHead>
                                                <TableHead className="text-right text-white/40 uppercase tracking-widest text-[10px]">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {enquiries.map((e) => (
                                                <TableRow key={e.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                                    <TableCell className="font-medium whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold">
                                                                {e.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            {e.name}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-xs text-white/60">
                                                                <Mail size={10} className="text-white/30" />
                                                                {e.email}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs font-bold text-gold">
                                                                <Phone size={10} />
                                                                {e.phone}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-xs text-white/70 leading-relaxed max-w-sm">
                                                            {e.message.split("[Reference Image Data]")[0]}
                                                            {e.message.includes("[Reference Image Data]") && (
                                                                <div className="mt-2">
                                                                    <p className="text-gold text-[10px] uppercase font-bold mb-1">Attached Reference:</p>
                                                                    <div
                                                                        className="relative group cursor-pointer"
                                                                        onClick={() => setSelectedImage(e.message.split("[Reference Image Data]")[1].trim())}
                                                                    >
                                                                        <img
                                                                            src={e.message.split("[Reference Image Data]")[1].trim()}
                                                                            className="w-full h-32 object-cover bg-white/5 rounded border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity"
                                                                            alt="Reference"
                                                                        />
                                                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                            <div className="flex items-center gap-1 text-white text-[10px] uppercase font-bold tracking-widest bg-black/80 px-3 py-1 rounded-full border border-white/20">
                                                                                <ZoomIn size={12} /> View Full
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-white/30 whitespace-nowrap">
                                                        {new Date(e.createdAt!).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-black text-xs"
                                                                onClick={() => window.open(`tel:${e.phone}`)}
                                                            >
                                                                <Phone size={12} className="mr-1" />
                                                                Call
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-red-500/30 hover:text-red-500"
                                                                onClick={() => {
                                                                    if (confirm("Are you sure you want to delete this enquiry?")) {
                                                                        apiRequest("DELETE", `/api/admin/enquiries/${e.id}`).then(() => {
                                                                            queryClient.invalidateQueries({ queryKey: ["/api/admin/enquiries"] });
                                                                            toast({ title: "Enquiry deleted" });
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <Trash2 size={14} />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="text-center py-16">
                                        <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                        <p className="text-white/30 text-sm">No enquiries yet</p>
                                        <p className="text-white/15 text-xs mt-1">When customers contact you, their messages will appear here.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SETTINGS TAB */}
                    <TabsContent value="settings">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Profile Card */}
                            <Card className="bg-[#0a0a0a] border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white font-serif uppercase tracking-widest flex items-center gap-3">
                                        <User size={18} className="text-gold" />
                                        Profile Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Username</p>
                                        <p className="text-white font-medium">{user.username}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Role</p>
                                        <p className="text-gold font-medium uppercase tracking-widest text-sm">Admin</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-green-500 font-medium text-sm">Active</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Change Password Card */}
                            <Card className="bg-[#0a0a0a] border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-white font-serif uppercase tracking-widest flex items-center gap-3">
                                        <Lock size={18} className="text-gold" />
                                        Change Password
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={async (e) => {
                                        e.preventDefault();
                                        setProfileSaving(true);
                                        const formData = new FormData(e.currentTarget);
                                        const newPassword = formData.get("newPassword") as string;
                                        const confirmPassword = formData.get("confirmPassword") as string;
                                        const newUsername = formData.get("newUsername") as string;

                                        if (newPassword && newPassword !== confirmPassword) {
                                            toast({ title: "Passwords do not match", variant: "destructive" });
                                            setProfileSaving(false);
                                            return;
                                        }

                                        const data: any = {};
                                        if (newUsername && newUsername !== user.username) data.username = newUsername;
                                        if (newPassword) data.password = newPassword;

                                        if (Object.keys(data).length === 0) {
                                            toast({ title: "No changes to save" });
                                            setProfileSaving(false);
                                            return;
                                        }

                                        try {
                                            await apiRequest("PATCH", "/api/user/profile", data);
                                            toast({ title: "Profile updated successfully!", description: "Please log in again with your new credentials." });
                                            // Auto logout after password change
                                            setTimeout(() => {
                                                apiRequest("POST", "/api/logout").then(() => window.location.href = "/auth");
                                            }, 2000);
                                        } catch (err: any) {
                                            toast({ title: "Update failed", description: err.message, variant: "destructive" });
                                        }
                                        setProfileSaving(false);
                                    }}>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-white/40">New Username (optional)</label>
                                                <input name="newUsername" defaultValue={user.username} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-gold outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-white/40">New Password</label>
                                                <input name="newPassword" type="password" placeholder="Enter new password" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-gold outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest text-white/40">Confirm Password</label>
                                                <input name="confirmPassword" type="password" placeholder="Re-enter new password" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white focus:border-gold outline-none transition-all" />
                                            </div>
                                            <Button type="submit" className="w-full bg-gold text-black hover:bg-white transition-all font-bold uppercase tracking-widest text-xs py-6" disabled={profileSaving}>
                                                {profileSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Save Changes
                                            </Button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>


            {/* Image Preview Modal */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-4xl bg-black/95 border border-white/10 p-0 overflow-hidden text-center max-h-[90vh] flex flex-col">
                    <div className="absolute right-4 top-4 z-50">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="p-2 bg-black/50 hover:bg-gold/20 rounded-full text-white hover:text-gold transition-colors backdrop-blur-sm"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-4 flex-1 flex items-center justify-center bg-[url('/assets/checker-pattern.png')] bg-repeat">
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Full Preview"
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                            />
                        )}
                    </div>
                    <div className="p-4 bg-neutral-900 border-t border-white/10 flex justify-between items-center">
                        <span className="text-white/40 text-xs uppercase tracking-widest">Reference Image Viewer</span>
                        <a
                            href={selectedImage || "#"}
                            download="reference-image"
                            className="text-gold text-xs uppercase font-bold hover:underline"
                        >
                            Download Original
                        </a>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
}
