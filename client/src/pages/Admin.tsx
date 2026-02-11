import { useState } from "react";
import { Link } from "wouter";
import { Search, Eye, Trash, Phone, MessageCircle, X } from "lucide-react";

const mockEnquiries = [
  { id: 1, name: "Rahul Sharma", mobile: "+91 9876543210", location: "Mumbai", granite: "Galaxy Black", status: "New", date: "2024-05-10" },
  { id: 2, name: "Amit Verma", mobile: "+91 9876543211", location: "Delhi", granite: "Ten Brown", status: "Contacted", date: "2024-05-09" },
  { id: 3, name: "Sneha Gupta", mobile: "+91 9876543212", location: "Bangalore", granite: "Imperial Gold", status: "Closed", date: "2024-05-08" },
];

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<typeof mockEnquiries[0] | null>(null);

  const filtered = mockEnquiries.filter(e => 
     e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     e.granite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
       {/* Sidebar */}
       <aside className="w-64 border-r border-white/10 p-6 hidden md:block">
          <h1 className="text-xl font-serif text-white mb-8">India <span className="text-gold">Granite</span></h1>
          <nav className="space-y-4">
             <a href="#" className="block text-gold text-sm uppercase tracking-widest font-bold">Dashboard</a>
             <a href="#" className="block text-white/50 hover:text-white text-sm uppercase tracking-widest">Enquiries</a>
             <a href="#" className="block text-white/50 hover:text-white text-sm uppercase tracking-widest">Products</a>
             <Link href="/">
               <a className="block text-white/50 hover:text-white text-sm uppercase tracking-widest mt-12">Back to Website</a>
             </Link>
          </nav>
       </aside>

       {/* Main Content */}
       <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-serif">Enquiry Management</h2>
             <div className="flex gap-4">
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                   <input 
                      type="text" 
                      placeholder="Search..." 
                      className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:border-gold outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
                <button className="bg-gold text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Export Excel</button>
             </div>
          </div>

          <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
             <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-white/50 uppercase tracking-widest text-xs">
                   <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Mobile</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Interest</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {filtered.map((enq) => (
                      <tr key={enq.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedEnquiry(enq)}>
                         <td className="p-4 font-medium">{enq.name}</td>
                         <td className="p-4 text-white/70">{enq.mobile}</td>
                         <td className="p-4 text-white/70">{enq.location}</td>
                         <td className="p-4 text-gold">{enq.granite}</td>
                         <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest ${
                               enq.status === 'New' ? 'bg-green-500/20 text-green-500' : 
                               enq.status === 'Contacted' ? 'bg-blue-500/20 text-blue-500' : 
                               'bg-white/10 text-white/50'
                            }`}>
                               {enq.status}
                            </span>
                         </td>
                         <td className="p-4 flex gap-2">
                            <button className="p-2 hover:bg-white/10 rounded"><Eye size={14} /></button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>

          {/* Detail View (condensed for this view) */}
          {selectedEnquiry && (
             <div className="mt-8 p-6 border border-white/10 rounded-lg bg-white/5">
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h3 className="text-xl font-serif text-white">{selectedEnquiry.name}</h3>
                      <p className="text-white/50 text-sm">{selectedEnquiry.location} • {selectedEnquiry.date}</p>
                   </div>
                   <button onClick={() => setSelectedEnquiry(null)}><X size={20} className="text-white/50 hover:text-white" /></button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                   <button className="flex items-center justify-center gap-2 py-3 border border-green-500/50 text-green-500 hover:bg-green-500/10 rounded uppercase text-xs tracking-widest">
                      <MessageCircle size={16} /> WhatsApp
                   </button>
                   <button className="flex items-center justify-center gap-2 py-3 border border-gold/50 text-gold hover:bg-gold/10 rounded uppercase text-xs tracking-widest">
                      <Phone size={16} /> Call
                   </button>
                   <button className="flex items-center justify-center gap-2 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded uppercase text-xs tracking-widest">
                      <Trash size={16} /> Delete
                   </button>
                </div>
             </div>
          )}
       </main>
    </div>
  );
}
