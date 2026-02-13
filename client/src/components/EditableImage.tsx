import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EditableImageProps {
    contentKey: string;
    defaultImage: string;
    className?: string;
    alt?: string;
}

export function EditableImage({ contentKey, defaultImage, className, alt }: EditableImageProps) {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Fetch current content from DB
    const { data: siteContent, isLoading } = useQuery<{ content: { url?: string } }>({
        queryKey: [`/api/content/${contentKey}`],
    });

    const currentImage = siteContent?.content?.url || defaultImage;

    const mutation = useMutation({
        mutationFn: async (base64Image: string) => {
            // 1. Upload/Simulate upload
            const uploadRes = await apiRequest("POST", "/api/upload", { image: base64Image });
            const { url } = await uploadRes.json();

            // 2. Save to site content
            await apiRequest("POST", `/api/content/${contentKey}`, {
                content: { url }
            });
            return url;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`/api/content/${contentKey}`] });
            toast({ title: "Image updated successfully" });
            setIsUploading(false);
        },
        onError: (error) => {
            toast({
                title: "Failed to update image",
                description: error.message,
                variant: "destructive"
            });
            setIsUploading(false);
        }
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            mutation.mutate(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const isDeveloper = user?.role === "developer";

    return (
        <div className={`relative group/editable ${className}`}>
            {isLoading ? (
                <div className="w-full h-full bg-white/5 animate-pulse flex items-center justify-center">
                    <Loader2 className="animate-spin text-gold" />
                </div>
            ) : (
                <img src={currentImage} alt={alt} className="w-full h-full object-cover" />
            )}

            {isDeveloper && !isLoading && (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/editable:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer z-30"
                >
                    {isUploading ? (
                        <Loader2 className="animate-spin text-white w-10 h-10" />
                    ) : (
                        <>
                            <Camera className="text-white w-10 h-10 mb-2" />
                            <span className="text-white text-xs uppercase tracking-widest font-bold">Change Image</span>
                        </>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            )}
        </div>
    );
}

