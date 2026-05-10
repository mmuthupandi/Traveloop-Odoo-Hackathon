
import { Edit3, Type, Image, CheckSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function QuickCaptureCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#E8DED1]"
    >
      <h3 className="font-serif text-xl font-bold text-[#2F4F3E] mb-4">Quick Capture</h3>
      
      <div className="relative">
        <textarea 
          placeholder="Write a note, idea or reminder..."
          className="w-full h-32 bg-transparent border-none focus:ring-0 text-lg text-[#2F4F3E] placeholder-[#B4ADA3] resize-none"
        />
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F7F4EE]">
        <div className="flex items-center gap-2">
          {[
            { icon: Type, label: "Text" },
            { icon: Image, label: "Image" },
            { icon: CheckSquare, label: "Checklist" },
            { icon: MapPin, label: "Location" }
          ].map((tool) => (
            <button 
              key={tool.label}
              className="p-2.5 rounded-full hover:bg-[#F7F4EE] text-[#7F7A70] transition-colors group"
              title={tool.label}
            >
              <tool.icon className="w-5 h-5 group-hover:text-[#2F4F3E]" />
            </button>
          ))}
        </div>

        <motion.button 
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#2F4F3E] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20 transition-all"
        >
          <span>Add Note</span>
          <Edit3 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
