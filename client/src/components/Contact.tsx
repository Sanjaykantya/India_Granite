import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function ContactModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
   const { toast } = useToast();
   const [formData, setFormData] = useState({
      name: "",
      mobile: "",
      email: "",
      location: "",
      projectType: "Residential",
      customProject: "",
      graniteInterest: "Select Collection",
      customInterest: "",
      quantity: "",
      message: "",
      refImage: "" as string | null
   });
   const [uploading, setUploading] = useState(false);

   const mutation = useMutation({
      mutationFn: async (data: any) => {
         const res = await apiRequest("POST", "/api/enquiries", data);
         return res.json();
      },
      onSuccess: () => {
         toast({
            title: "Enquiry Sent Successfully",
            description: "Our concierge team will contact you shortly.",
         });
         onOpenChange(false);
         setFormData({
            name: "",
            mobile: "",
            email: "",
            location: "",
            projectType: "Residential",
            customProject: "",
            graniteInterest: "Select Collection",
            customInterest: "",
            quantity: "",
            message: "",
            refImage: null
         });
      },
      onError: (error) => {
         toast({
            title: "Submission Failed",
            description: error.message,
            variant: "destructive"
         });
      }
   });

   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      try {
         const reader = new FileReader();
         reader.onloadend = async () => {
            const base64 = reader.result as string;
            try {
               const res = await apiRequest("POST", "/api/upload", { image: base64 });
               const data = await res.json();
               setFormData(prev => ({ ...prev, refImage: data.url }));
               toast({ title: "Image Uploaded" });
            } catch (err) {
               toast({ title: "Upload Failed", variant: "destructive" });
            } finally {
               setUploading(false);
            }
         };
         reader.readAsDataURL(file);
      } catch (err) {
         setUploading(false);
      }
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Combine extra fields into message
      const pType = formData.projectType === "Other" ? formData.customProject : formData.projectType;
      const gType = formData.graniteInterest === "Other" ? formData.customInterest : formData.graniteInterest;

      const fullMessage = `
Message: ${formData.message}

--- Project Details ---
Location: ${formData.location}
Project Type: ${pType}
Granite Interest: ${gType}
Quantity: ${formData.quantity} Sq. Ft.
Reference Image: ${formData.refImage ? "Attached (See Below)" : "None"}
    `.trim();

      let finalMessage = fullMessage;
      if (formData.refImage) {
         finalMessage += `\n\n[Reference Image Data]\n${formData.refImage}`;
      }

      mutation.mutate({
         fullName: formData.name,
         mobileNumber: formData.mobile,
         email: formData.email,
         location: formData.location,
         projectType: formData.projectType,
         graniteInterest: formData.graniteInterest,
         quantity: formData.quantity,
         referenceImageUrl: formData.refImage,
         message: finalMessage,
      });
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="bg-white border border-black/5 text-foreground max-w-3xl p-8 overflow-y-auto max-h-[90vh]">
            <button
               onClick={() => onOpenChange(false)}
               className="absolute top-4 right-4 text-foreground/40 hover:text-gold transition-colors"
            >
               <X size={24} />
            </button>

            <DialogHeader className="text-center mb-8">
               <DialogTitle className="text-3xl font-serif text-foreground mb-2">Start Your Project</DialogTitle>
               <DialogDescription className="text-foreground/50 text-sm uppercase tracking-widest">Connect with our luxury consultants</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold">Full Name *</label>
                     <input
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        type="text"
                        className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors"
                        placeholder="John Doe"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold">Mobile Number *</label>
                     <input
                        required
                        value={formData.mobile}
                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                        type="tel"
                        className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors"
                        placeholder="+91 98765 43210"
                     />
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold">Email Address *</label>
                     <input
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        type="email"
                        className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors"
                        placeholder="john@example.com"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold">Location</label>
                     <input
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        type="text"
                        className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors"
                        placeholder="City, Country"
                     />
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold">Project Type</label>
                     <select
                        value={formData.projectType}
                        onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors appearance-none"
                     >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Hospitality</option>
                        <option>Architectural</option>
                        <option value="Other">Other (Please Specify)</option>
                     </select>
                     {formData.projectType === "Other" && (
                        <input
                           required
                           value={formData.customProject}
                           onChange={e => setFormData({ ...formData, customProject: e.target.value })}
                           type="text"
                           placeholder="Specify Project Type"
                           className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors mt-2"
                        />
                     )}
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-gold">Granite Interest</label>
                     <select
                        value={formData.graniteInterest}
                        onChange={e => setFormData({ ...formData, graniteInterest: e.target.value })}
                        className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors appearance-none"
                     >
                        <option>Select Collection</option>
                        <option>Black Collection</option>
                        <option>Gold Collection</option>
                        <option>Exotic Collection</option>
                        <option value="Other">Other (Please Specify)</option>
                     </select>
                     {formData.graniteInterest === "Other" && (
                        <input
                           required
                           value={formData.customInterest}
                           onChange={e => setFormData({ ...formData, customInterest: e.target.value })}
                           type="text"
                           placeholder="Specify Interest"
                           className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors mt-2"
                        />
                     )}
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold">Quantity Required (Sq. Ft.)</label>
                  <input
                     value={formData.quantity}
                     onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                     type="number"
                     className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors"
                     placeholder="e.g. 5000"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold">Reference Image (Optional)</label>
                  <div className="relative w-full bg-secondary border border-black/10 border-dashed rounded p-8 text-center cursor-pointer hover:bg-black/[0.03] transition-colors group">
                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     {uploading ? (
                        <Loader2 className="mx-auto text-gold animate-spin mb-2" />
                     ) : formData.refImage ? (
                        <div className="flex flex-col items-center text-gold">
                           <CheckCircle2 className="mb-2" />
                           <span className="text-xs">Image Attached</span>
                        </div>
                     ) : (
                        <>
                           <Upload className="mx-auto text-foreground/30 group-hover:text-gold mb-2" />
                           <span className="text-foreground/50 text-xs">Click to upload reference style</span>
                        </>
                     )}
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold">Message</label>
                  <textarea
                     value={formData.message}
                     onChange={e => setFormData({ ...formData, message: e.target.value })}
                     className="w-full bg-secondary border border-black/10 rounded p-3 text-foreground focus:border-gold outline-none transition-colors h-32"
                     placeholder="Tell us about your requirements..."
                  ></textarea>
               </div>

               <button
                  disabled={mutation.isPending || uploading}
                  type="submit"
                  className="w-full py-4 bg-gold text-white font-bold uppercase tracking-widest hover:bg-gold-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
               >
                  {mutation.isPending ? <Loader2 className="animate-spin" /> : "Submit Enquiry"}
               </button>
            </form>
         </DialogContent>
      </Dialog>
   );
}

export function ContactSection() {
   const [open, setOpen] = useState(false);

   return (
      <>
         <div className="py-20 bg-secondary text-center">
            <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-8">Ready to Transform Your Space?</h2>
            <button
               id="contact-btn"
               onClick={() => setOpen(true)}
               className="px-12 py-4 border border-gold text-gold hover:bg-gold hover:text-white uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(184,143,58,0.15)] hover:shadow-[0_0_40px_rgba(184,143,58,0.3)]"
            >
               Get a Quote
            </button>
         </div>
         <ContactModal open={open} onOpenChange={setOpen} />
      </>
   );
}
