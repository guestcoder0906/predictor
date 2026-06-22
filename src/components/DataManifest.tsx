import { Check, UploadCloud, Database, Lock, AlertTriangle, Cpu, TerminalSquare, Search } from 'lucide-react';
import { Manifest } from '../types';
import { useState, useRef, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DataManifestProps {
  manifest: Manifest;
  onProceed: () => void;
}

export function DataManifest({ manifest, onProceed }: DataManifestProps) {
  const [uploadedIndexes, setUploadedIndexes] = useState<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);

  const handleUploadClick = (index: number) => {
    setActiveUploadIndex(index);
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && activeUploadIndex !== null) {
      // Simulate validating the file locally in memory
      setUploadedIndexes(prev => {
        const next = new Set(prev);
        next.add(activeUploadIndex);
        return next;
      });
      setActiveUploadIndex(null);
    }
  };

  const allRequiredUploaded = manifest.data_assets
    .map((asset, idx) => ({ required: asset.required, index: idx }))
    .filter(a => a.required)
    .every(a => uploadedIndexes.has(a.index));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto w-full px-6 py-12 text-gray-200 font-mono"
    >
      <input 
        type="file" 
        style={{ display: 'none' }} 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />
      <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
        <Database className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl tracking-wider text-white">DATA INGESTION MANIFEST required</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#111318] p-5 border border-gray-800">
            <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs tracking-widest uppercase">
              <Cpu className="w-4 h-4" />
              Models Required
            </div>
            <ul className="space-y-3">
              {manifest.models_required.map((model, idx) => (
                <li key={idx} className="text-sm font-medium text-blue-400 bg-blue-500/10 px-3 py-2 border border-blue-500/20">
                  {model}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#111318] p-5 border border-gray-800">
            <div className="flex items-center gap-2 mb-3 text-red-400 text-xs tracking-widest uppercase">
              <AlertTriangle className="w-4 h-4" />
              Audit Summary
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              {manifest.audit_summary}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="text-sm text-gray-400 mb-4 border-l-2 border-orange-500 pl-4 py-1">
            Strict Data Gatekeeping Protocol Active: Execution halted until all required parameters are manually sourced and validated. ZERO API dependencies.
          </div>

          <div className="space-y-4">
            {manifest.data_assets.map((asset, idx) => {
              const isUploaded = uploadedIndexes.has(idx);
              return (
                <div 
                  key={idx} 
                  className={cn(
                    "flex flex-col p-4 border transition-colors relative",
                    isUploaded ? "border-green-500/30 bg-green-500/5" : "border-gray-800 bg-[#111318]"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{asset.name}</span>
                        {asset.required && <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30">REQ</span>}
                        <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5">{asset.format}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{asset.description}</p>
                    </div>
                    
                    <button
                      onClick={() => handleUploadClick(idx)}
                      disabled={isUploaded}
                      className={cn(
                        "mt-4 sm:mt-0 px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all shrink-0",
                        isUploaded 
                          ? "border-green-500 text-green-400 bg-transparent cursor-default"
                          : "border-gray-700 hover:border-gray-500 hover:text-white text-gray-400 bg-[#0d0f12]"
                      )}
                    >
                      {isUploaded ? <><Check className="w-4 h-4" /> Validated</> : <><UploadCloud className="w-4 h-4" /> Source & Upload</>}
                    </button>
                  </div>
                  
                  {!isUploaded && (asset.sourcing_instructions || asset.manual_search_alternative) && (
                     <div className="mt-4 pt-3 flex flex-col gap-3 border-t border-gray-800/60 bg-[#0a0a0c] p-3 rounded-sm border">
                        {asset.sourcing_instructions && (
                          <div>
                            <div className="flex items-center gap-2 text-[10px] text-blue-400 tracking-widest uppercase mb-1">
                               <TerminalSquare className="w-3 h-3" />
                               Sourcing Directives
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed font-sans">
                              {asset.sourcing_instructions}
                            </p>
                          </div>
                        )}
                        
                        {asset.manual_search_alternative && (
                          <div className={asset.sourcing_instructions ? "pt-3 border-t border-gray-800/40" : ""}>
                            <div className="flex items-center gap-2 text-[10px] text-purple-400 tracking-widest uppercase mb-1">
                               <Search className="w-3 h-3" />
                               Manual Search Alternative
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed font-sans">
                              {asset.manual_search_alternative}
                            </p>
                          </div>
                        )}
                     </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Lock className="w-4 h-4" /> 
              Local Zero-Trust Verification
            </div>
            <button
              onClick={onProceed}
              disabled={!allRequiredUploaded}
              className={cn(
                "px-6 py-3 font-semibold text-sm tracking-widest uppercase border transition-all",
                allRequiredUploaded
                  ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "bg-transparent border-gray-800 text-gray-600 cursor-not-allowed"
              )}
            >
              Initialize Execution
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
