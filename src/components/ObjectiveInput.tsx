import { useState } from 'react';
import { Target, ArrowRight, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface ObjectiveInputProps {
  onSubmit: (objective: string) => void;
  isLoading: boolean;
}

export function ObjectiveInput({ onSubmit, isLoading }: ObjectiveInputProps) {
  const [objective, setObjective] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[80vh] max-w-2xl mx-auto w-full px-6"
    >
      <div className="w-full flex items-center justify-center mb-8">
        <Activity className="w-12 h-12 text-blue-500 mb-4" />
      </div>
      <h1 className="text-3xl font-medium tracking-tight text-white mb-2 font-sans text-center">
        Initialize Target Objective
      </h1>
      <p className="font-mono text-sm text-gray-500 mb-10 text-center tracking-wide">
        STOCHASTIC INFERENCE ENGINE // WAITING FOR DIRECTIVE
      </p>

      <form 
        onSubmit={(e) => { e.preventDefault(); if (objective.trim()) onSubmit(objective); }}
        className="w-full relative group"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Target className="w-5 h-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          disabled={isLoading}
          className={cn(
            "w-full bg-[#0d0f12] border border-gray-800 text-gray-200 text-lg rounded-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block pl-12 p-4 outline-none font-mono transition-all",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          placeholder="ENTER PREDICTIVE TARGET (e.g. Evaluate financial security trajectory...)"
          required
        />
        <button
          type="submit"
          disabled={!objective.trim() || isLoading}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </button>
      </form>
    </motion.div>
  );
}
