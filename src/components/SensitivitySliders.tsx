import { useState } from 'react';
import { Sliders } from 'lucide-react';

export function SensitivitySliders() {
  const [temp, setTemp] = useState(50);
  const [friction, setFriction] = useState(30);
  const [decay, setDecay] = useState(15);

  return (
    <div className="w-full h-full bg-[#0a0a0c] border border-gray-800 p-4 font-mono text-gray-300">
      <div className="flex items-center gap-2 text-xs text-gray-400 border-b border-gray-800 pb-2 mb-4 tracking-widest uppercase">
        <Sliders className="w-4 h-4 text-orange-500" />
        Sensitivity Integration
      </div>

      <div className="space-y-6">
        <SliderControl name="System Temperature" value={temp} setter={setTemp} min={0} max={100} unit="°" />
        <SliderControl name="Friction Coef (µ)" value={friction} setter={setFriction} min={0} max={100} unit="%" />
        <SliderControl name="State Decay Rate" value={decay} setter={setDecay} min={0} max={50} unit="λ" />
      </div>

      <div className="mt-8 pt-4 border-t border-gray-800">
        <div className="text-[10px] text-gray-500 mb-2">LIVE EXPORT LOG</div>
        <div className="bg-black p-2 h-24 border border-gray-900 overflow-hidden text-[9px] text-green-500/70 font-mono flex flex-col justify-end">
           <div>&gt; INIT RECALC... OK</div>
           <div>&gt; REBUILDING TRANSITION MATRICES...</div>
           <div>&gt; T_adj={temp.toFixed(1)} F_adj={friction.toFixed(1)} D_adj={decay.toFixed(1)}</div>
           <div>&gt; MCMC POSTERIOR SHIFT: {(temp * 0.04).toFixed(3)}</div>
        </div>
      </div>
    </div>
  );
}

function SliderControl({ name, value, setter, min, max, unit }: { name: string, value: number, setter: (val: number) => void, min: number, max: number, unit: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-2 font-bold">
        <span>{name}</span>
        <span className="text-orange-400">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={(e) => setter(Number(e.target.value))}
        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
      />
    </div>
  )
}
