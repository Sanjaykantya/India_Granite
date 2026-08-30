import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Redirect } from "wouter";
import { Loader2, ShieldCheck } from "lucide-react";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});
type LoginValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
    const { user, loginMutation } = useAuth();

    const loginForm = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    });

    if (user) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[url('/assets/granite-hero.webp')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70" />

            <Card className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-md border-black/5 shadow-2xl">
                <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                        <ShieldCheck className="text-gold w-8 h-8" />
                    </div>
                    <CardTitle className="text-3xl font-serif text-foreground uppercase tracking-[0.2em]">Admin Login</CardTitle>
                    <p className="text-foreground/40 text-xs uppercase tracking-widest mt-3">India Granite • Secure Access</p>
                    <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
                </CardHeader>
                <CardContent>
                    <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-6">
                            <FormField
                                control={loginForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gold uppercase tracking-widest text-[10px]">Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="bg-secondary border-black/10 text-foreground py-6" placeholder="Enter admin username" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={loginForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gold uppercase tracking-widest text-[10px]">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="bg-secondary border-black/10 text-foreground py-6" placeholder="Enter password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-gold text-white hover:bg-gold-dark transition-all py-6 font-bold uppercase tracking-widest" disabled={loginMutation.isPending}>
                                {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center text-foreground/30 text-[10px] uppercase tracking-widest mt-6">
                        Authorized personnel only
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
