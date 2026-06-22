export function SequentialPathTrace() {
  // A flowchart-like display using SVG to approximate Viterbi path tracking
  return (
    <div className="w-full h-full min-h-[250px] relative bg-[#0a0a0c] border border-gray-800 p-4 font-mono">
      <div className="absolute top-0 left-0 bg-black/50 text-[10px] text-gray-400 tracking-widest px-2 py-1 border border-gray-800 z-10 bottom-border">
        HMM VITERBI DECODING PATH
      </div>
      
      <div className="w-full h-full flex flex-col justify-center gap-6 mt-4">
        
        {/* State Row 1 */}
        <div className="flex justify-between items-center relative">
           <div className="absolute w-full h-[1px] bg-gray-800 top-1/2 -z-10"></div>
           <StateNode id="S(t-2)" type="hidden" probability={0.92} active />
           <StateNode id="S(t-1)" type="hidden" probability={0.78} active />
           <StateNode id="S(t)" type="hidden" probability={0.88} active />
           <StateNode id="S(t+1)" type="target" probability={0.64} active={false} />
        </div>

        {/* Observation connections */}
        <div className="flex justify-between px-6 opacity-30">
          <div className="w-[1px] h-8 bg-gray-500"></div>
          <div className="w-[1px] h-8 bg-gray-500"></div>
          <div className="w-[1px] h-8 bg-gray-500"></div>
          <div className="w-[1px] h-8 bg-transparent"></div> {/* No obs for future */}
        </div>

        {/* Observation Row 2 */}
        <div className="flex justify-between items-center text-xs text-gray-500">
           <EmissionNode val="O_1" />
           <EmissionNode val="O_2" />
           <EmissionNode val="O_3" />
           <EmissionNode val="???" border="dashed" />
        </div>
      </div>
    </div>
  );
}

function StateNode({ id, type, probability, active }: { id: string, type: 'hidden' | 'target', probability: number, active: boolean }) {
  return (
    <div className={`p-2 border rounded-sm flex flex-col items-center justify-center w-20 
      ${active ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 bg-[#111318]'}
      ${type === 'target' ? 'border-dashed border-blue-500' : ''}
    `}>
      <span className={`text-xs font-bold ${active ? 'text-orange-400' : 'text-gray-400'} ${type === 'target' ? 'text-blue-400' : ''}`}>{id}</span>
      <span className="text-[9px] text-gray-500">p={probability.toFixed(2)}</span>
    </div>
  )
}

function EmissionNode({ val, border = 'solid' }: { val: string, border?: 'solid' | 'dashed' }) {
  return (
     <div className={`w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 bg-black text-[10px]
       ${border === 'dashed' ? 'border-dashed border-gray-700 text-gray-600' : ''}
     `}>
       {val}
     </div>
  )
}
