/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AppState, Manifest } from './types';
import { ObjectiveInput } from './components/ObjectiveInput';
import { DataManifest } from './components/DataManifest';
import { Dashboard } from './components/Dashboard';
import { Lock } from 'lucide-react';

declare const puter: any;

export default function App() {
  const [appState, setAppState] = useState<AppState>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isPuterReady, setIsPuterReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initPuter = async () => {
      if (typeof puter !== 'undefined') {
        const signedIn = await puter.auth.isSignedIn();
        setIsSignedIn(signedIn);
        setIsPuterReady(true);
      } else {
        setTimeout(initPuter, 100);
      }
    };
    initPuter();
  }, []);

  const handleSignIn = async () => {
    try {
      await puter.auth.signIn();
      setIsSignedIn(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleObjectiveSubmit = async (objective: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const prompt = `You are the orchestration layer of StochasticInference.
Your role is an adversarial data auditor.
The user has entered the following target objective: "${objective}"
Analyze this objective, determine the mathematical models required (e.g. Markov Models, Monte Carlo, GMMs), and calculate data deficiencies.
Generate a dynamic Data Ingestion Manifest demanding exact, granular data assets needed to run a valid calculation.
Crucially, for each required data asset, provide explicit, technical "sourcing_instructions" telling the user exactly how to fetch this data (e.g., specific Google Earth Engine datasets/scripts for weather, specific public APIs, terminal curl commands, Python scripts, or scraping methodologies). Also provide a "manual_search_alternative" telling the user exactly what to search for online to manually compile this data if APIs are unavailable (e.g., searching an Instagram page for followers count).
Be extremely rigorous and analytical. Do not generate a predictive answer, ONLY the data manifest requirements in valid JSON format matching this exact schema:
{
  "models_required": ["string"],
  "data_assets": [{"name": "string", "description": "string", "format": "string", "required": true, "sourcing_instructions": "string", "manual_search_alternative": "string"}],
  "audit_summary": "string"
}
Return ONLY valid JSON without any markdown formatting wrappers (like \`\`\`json).`;

      const response = await puter.ai.chat([
        { role: 'user', content: prompt }
      ], { model: 'claude-opus-4-8' });
      
      let replyContent = '';
      if (typeof response === 'string') {
        replyContent = response;
      } else if (response?.message?.content) {
        const content = response.message.content;
        if (Array.isArray(content)) {
          replyContent = content.map((c: any) => c.text || '').join('');
        } else {
          replyContent = content;
        }
      } else {
        replyContent = JSON.stringify(response);
      }

      if (!replyContent) throw new Error("No response from AI");

      const cleanJson = replyContent.replace(/```json/gi, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanJson);
      
      setManifest(data);
      setAppState('manifest');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during calculation. Ensure the model parsed data correctly.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPuterReady) {
    return <div className="min-h-screen bg-[#050507] text-gray-500 flex items-center justify-center font-mono text-sm tracking-widest uppercase">INITIALIZING SECURE SYSTEM...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#050507] flex flex-col items-center justify-center font-mono selection:bg-blue-500/30 p-4">
        <div className="max-w-md w-full p-8 border border-gray-800 bg-[#0a0a0c] text-center space-y-6 flex flex-col items-center">
          <Lock className="w-12 h-12 text-orange-500 mb-2" />
          <h1 className="text-xl font-bold tracking-widest text-white">AUTHENTICATION REQUIRED</h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            StochasticInference requires a secure session via Puter.js to orchestrate the adversarial AI analysis layer.
          </p>
          <button
            onClick={handleSignIn}
            className="mt-6 w-full px-6 py-4 font-bold text-sm tracking-widest uppercase border bg-orange-600/10 border-orange-500/50 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 transition-all flex items-center justify-center gap-3"
          >
            <Lock className="w-4 h-4" /> Validate Session
          </button>
        </div>
      </div>
    );
  }

  if (appState === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-[#050507] text-gray-200 selection:bg-blue-500/30">
      {appState === 'input' && (
        <>
          <ObjectiveInput onSubmit={handleObjectiveSubmit} isLoading={isLoading} />
          {error && <div className="text-red-500 font-mono text-center text-sm px-6 max-w-2xl mx-auto">{error}</div>}
        </>
      )}

      {appState === 'manifest' && manifest && (
        <DataManifest 
          manifest={manifest} 
          onProceed={() => setAppState('dashboard')} 
        />
      )}
    </div>
  );
}
