import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export function ConvergenceCurve() {
  // Generate some stochastic-looking paths that converge over time
  // For demonstration, simulating MCMC traces
  const generateTrace = (target: number, noiseFactor: number) => {
    let current = target + (Math.random() - 0.5) * 100;
    const data = [];
    for (let i = 0; i < 100; i++) {
       // Converge towards target slowly
       current = current + (target - current) * 0.1 + (Math.random() - 0.5) * noiseFactor * (1 - i/100);
       data.push(current);
    }
    return data;
  };

  const iterations = Array.from({ length: 100 }, (_, i) => i);
  const trace1 = generateTrace(50, 40);
  const trace2 = generateTrace(50, 60);
  const trace3 = generateTrace(50, 30);

  const data = iterations.map((i) => ({
    iteration: i * 100, // represent thousands of iterations
    chain1: trace1[i],
    chain2: trace2[i],
    chain3: trace3[i],
  }));

  return (
    <div className="w-full h-full min-h-[250px] relative">
      <div className="absolute top-0 left-0 bg-black/50 text-[10px] text-gray-400 font-mono tracking-widest px-2 py-1 border border-gray-800 z-10">
        MCMC GIBBS SAMPLING TRACE
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 30, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis 
            dataKey="iteration" 
            stroke="#4b5563" 
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: '#374151' }}
          />
          <YAxis 
            stroke="#4b5563" 
            tick={{ fill: '#6b7280', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111318', border: '1px solid #374151', fontSize: '11px', fontFamily: 'monospace' }}
            itemStyle={{ color: '#e5e7eb' }}
          />
          <Line type="monotone" dataKey="chain1" stroke="#3b82f6" strokeWidth={1} dot={false} strokeOpacity={0.7} />
          <Line type="monotone" dataKey="chain2" stroke="#10b981" strokeWidth={1} dot={false} strokeOpacity={0.7} />
          <Line type="monotone" dataKey="chain3" stroke="#f59e0b" strokeWidth={1} dot={false} strokeOpacity={0.7} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
