import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { insertGraniteSchema, type InsertGranite } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function GraniteFormModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const form = useForm<InsertGranite>({
        resolver: zodResolver(insertGraniteSchema),
        defaultValues: {
            name: "",
            image: "",
            order: 0,
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: InsertGranite) => {
            await apiRequest("POST", "/api/granites", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/granites"] });
            onOpenChange(false);
            form.reset();
            toast({ title: "Granite added successfully" });
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0e0e0e] border-white/5 text-white">
                <DialogHeader>
                    <DialogTitle className="font-serif uppercase tracking-widest">Add Luxury Granite</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gold uppercase tracking-widest text-[10px]">Granite Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white/5 border-white/10" placeholder="e.g. Imperial Gold" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gold uppercase tracking-widest text-[10px]">Image URL</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white/5 border-white/10" placeholder="https://..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="order"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gold uppercase tracking-widest text-[10px]">Display Order</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="bg-white/5 border-white/10" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-gold text-black hover:bg-white transition-colors py-6 font-bold uppercase tracking-widest" disabled={mutation.isPending}>
                            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Granite
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
