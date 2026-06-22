import { motion } from 'motion/react';
import { SpatialViewport } from './SpatialViewport';
import { ConvergenceCurve } from './ConvergenceCurve';
import { SequentialPathTrace } from './SequentialPathTrace';
import { SensitivitySliders } from './SensitivitySliders';
import { Activity } from 'lucide-react';

export function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-screen p-4 flex flex-col bg-[#050507]"
    >
       <header className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4 shrink-0">
          <div className="flex items-center gap-3">
             <Activity className="w-5 h-5 text-blue-500" />
             <span className="font-mono text-sm tracking-widest text-gray-200">STOCHASTIC INFERENCE ENGINE</span>
          </div>
          <div className="flex gap-4 font-mono text-[10px] text-green-500">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SYSTEM: DETERMINISTIC</span>
             <span>ITERATIONS: 1.42M+</span>
          </div>
       </header>

       <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
          <div className="lg:col-span-1 flex flex-col gap-4">
             <div className="flex-1 min-h-0 border border-gray-800 relative bg-[#0a0a0c]">
                <SensitivitySliders />
             </div>
          </div>
          
          <div className="lg:col-span-3 flex flex-col gap-4">
             {/* Top: 3D Spatial Viewport Simulator */}
             <div className="flex-[3] min-h-0 border border-gray-800 relative">
                 <SpatialViewport />
             </div>

             {/* Bottom Panels */}
             <div className="flex-[2] grid grid-cols-2 gap-4 min-h-0">
                <div className="col-span-1 border border-gray-800 relative overflow-hidden bg-[#0a0a0c]">
                   <ConvergenceCurve />
                </div>
                <div className="col-span-1 border border-gray-800 relative bg-[#0a0a0c]">
                   <SequentialPathTrace />
                </div>
             </div>
          </div>
       </div>
    </motion.div>
  );
}
