import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EditableTextProps {
    contentKey: string;
    defaultText: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function EditableText({ contentKey, defaultText, className, as: Component = "span" }: EditableTextProps) {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(defaultText);

    const { data: siteContent, isLoading } = useQuery<{ content: { text?: string } }>({
        queryKey: [`/api/content/${contentKey}`],
    });

    useEffect(() => {
        if (siteContent?.content?.text) {
            setText(siteContent.content.text);
        }
    }, [siteContent]);

    const mutation = useMutation({
        mutationFn: async (newText: string) => {
            await apiRequest("POST", `/api/content/${contentKey}`, {
                content: { text: newText }
            });
            return newText;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/api/content/${contentKey}`] });
            toast({ title: "Content updated" });
            setIsEditing(false);
        },
        onError: (error) => {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive"
            });
        }
    });

    const isDeveloper = user?.role === "developer";

    if (!isDeveloper) {
        return <Component className={className}>{text}</Component>;
    }

    if (isEditing) {
        return (
            <div className="relative inline-flex items-center gap-2 group/edit-text">
                {Component === "p" ? (
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={`bg-white/10 border border-gold/50 rounded p-2 text-white outline-none focus:border-gold min-w-[200px] ${className}`}
                        rows={3}
                    />
                ) : (
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={`bg-white/10 border border-gold/50 rounded p-1 text-white outline-none focus:border-gold ${className}`}
                    />
                )}
                <div className="flex flex-col gap-1">
                    <button
                        onClick={() => mutation.mutate(text)}
                        className="p-1 bg-green-500 rounded text-black hover:bg-green-400"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setText(siteContent?.content?.text || defaultText);
                        }}
                        className="p-1 bg-red-500 rounded text-white hover:bg-red-400"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Component
            className={`${className} cursor-pointer border border-transparent hover:border-gold/30 hover:bg-gold/5 px-1 rounded transition-all group/text`}
            onClick={() => setIsEditing(true)}
            title="Click to edit"
        >
            {text}
            <span className="opacity-0 group-hover/text:opacity-100 ml-2 text-[10px] text-gold uppercase tracking-widest font-bold">(Edit)</span>
        </Component>
    );
}

