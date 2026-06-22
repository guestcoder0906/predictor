import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export function SpatialViewport() {
  // Generate random clustered data to simulate t-SNE / PCA projections
  const generateCluster = (cx: number, cy: number, count: number, name: string) => {
    return Array.from({ length: count }, (_, i) => ({
      x: cx + (Math.random() - 0.5) * 40,
      y: cy + (Math.random() - 0.5) * 40,
      z: 10 + Math.random() * 50, // size
      cluster: name,
    }));
  };

  const historicalFailures = generateCluster(30, 70, 50, "Historical Failures");
  const historicalSuccesses = generateCluster(80, 20, 60, "Historical Successes");
  const mixedOutcomes = generateCluster(50, 50, 40, "Indeterminate Boundary");
  
  // The Target input pulsating vector
  const targetVector = [{ x: 45, y: 55, z: 120, cluster: "Active Target Node" }];

  return (
    <div className="w-full h-full relative border border-gray-800 bg-[#0a0a0c] overflow-hidden">
      <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 border border-gray-700 text-[10px] font-mono text-gray-400 z-10 flex gap-4">
        <span>DIM: 768 → 2 (PCA DOWNSAMPLE)</span>
        <span>METRIC: COSINE DIST & EUCLIDEAN</span>
      </div>

       <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-10 font-mono text-[9px] text-gray-500 bg-black/60 p-2 border border-gray-800">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500/50"></div> Fail State Cluster</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500/50"></div> Success State Cluster</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> Target Vector</div>
       </div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="#1f2937" />
          <XAxis type="number" dataKey="x" name="PC1" tick={false} axisLine={{ stroke: '#374151' }} />
          <YAxis type="number" dataKey="y" name="PC2" tick={false} axisLine={{ stroke: '#374151' }} />
          <ZAxis type="number" dataKey="z" range={[10, 200]} />
          <Tooltip 
             cursor={{ strokeDasharray: '3 3' }} 
             contentStyle={{ backgroundColor: '#111318', border: '1px solid #374151', fontSize: '11px', fontFamily: 'monospace' }}
          />
          <Scatter name="Failures" data={historicalFailures} fill="#ef4444" fillOpacity={0.4} />
          <Scatter name="Successes" data={historicalSuccesses} fill="#3b82f6" fillOpacity={0.4} />
          <Scatter name="Mixed" data={mixedOutcomes} fill="#8b5cf6" fillOpacity={0.2} />
          <Scatter 
            name="TARGET" 
            data={targetVector} 
            fill="#f97316" 
            fillOpacity={1} 
            shape={(props: any) => {
               const { cx, cy } = props;
               return (
                 <g>
                    <circle cx={cx} cy={cy} r={6} fill="#f97316" />
                    <circle cx={cx} cy={cy} r={12} fill="none" stroke="#f97316" strokeWidth={1} className="animate-ping opacity-50" />
                 </g>
               )
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
