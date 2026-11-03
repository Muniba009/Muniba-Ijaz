import React, { useState } from 'react';
import { Cpu, Eye, Activity, Sparkles, Layers, ArrowRight } from 'lucide-react';

export const FutureAiDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'agent'>('vision');
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const visionLayers = [
    { name: 'Input Tensor', shape: '[B, 3, 224, 224]', desc: 'Normalized medical chest scan tensor with min-max scaling.' },
    { name: 'Conv2D + BatchNorm', shape: '[B, 64, 112, 112]', desc: '64 spatial filters (kernel 7x7, stride 2) capturing edge anomalies and density contrasts.' },
    { name: 'Residual Stage 1', shape: '[B, 128, 56, 56]', desc: 'Identity shortcut connections preventing vanishing gradients on fine tissue textures.' },
    { name: 'Deep Attention Block', shape: '[B, 256, 28, 28]', desc: 'Multi-head spatial attention highlighting suspicious radiological regions.' },
    { name: 'Global Pool & Linear', shape: '[B, 2]', desc: 'Softmax probability logits for clinical anomaly classification.' },
  ];

  return (
    <div className="bg-[#050816] rounded-xl border border-[#38BDF8]/20 p-5 text-xs text-slate-300 shadow-2xl space-y-5">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1 bg-[#0B1220] rounded-lg border border-[#38BDF8]/15">
        <button
          onClick={() => { setActiveTab('vision'); setActiveLayer(0); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'vision' ? 'bg-[#2563EB] text-white' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-[#00A6FF]" />
          <span>Diagnostic Vision CNN</span>
        </button>
        <button
          onClick={() => { setActiveTab('agent'); setActiveLayer(0); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'agent' ? 'bg-[#2563EB] text-white' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Autonomous Multi-Agent Policy</span>
        </button>
      </div>

      {activeTab === 'vision' ? (
        <div className="space-y-4">
          <div className="p-3 bg-[#0B1220] rounded-xl border border-[#38BDF8]/15">
            <h4 className="text-white font-bold text-sm mb-1">Deep CNN Architecture Blueprint</h4>
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
              Designed in PyTorch for thoracic radiographic anomaly segmentation. Click through the neural pipeline stages below:
            </p>
          </div>

          {/* Interactive Pipeline Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {visionLayers.map((layer, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLayer(idx)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  activeLayer === idx
                    ? 'bg-[#00A6FF]/20 border-[#00A6FF] text-white shadow-[0_0_12px_rgba(0,166,255,0.3)]'
                    : 'bg-[#0B1220] border-[#38BDF8]/15 text-[#94A3B8] hover:text-white hover:border-[#38BDF8]/40'
                }`}
              >
                <span className="block font-mono text-[9px] text-[#00A6FF]">STAGE 0{idx + 1}</span>
                <span className="block font-semibold text-[11px] truncate mt-0.5">{layer.name}</span>
              </button>
            ))}
          </div>

          {/* Active Layer Deep Dive */}
          <div className="p-4 rounded-xl bg-[#0B1220] border border-[#00A6FF]/30 font-mono space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#38BDF8] font-bold text-xs">{visionLayers[activeLayer].name}</span>
              <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Shape: {visionLayers[activeLayer].shape}
              </span>
            </div>
            <p className="font-sans text-xs text-slate-200 leading-relaxed">
              {visionLayers[activeLayer].desc}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-[#0B1220] rounded-xl border border-[#38BDF8]/15">
            <h4 className="text-white font-bold text-sm mb-1">Reinforcement Learning Policy Loop</h4>
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
              Autonomous coordination agent optimizing sequential resource routing under stochastic environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#00A6FF]">1. STATE VECTOR</span>
              <p className="text-white font-semibold text-xs">Environment Observation</p>
              <p className="text-[11px] text-[#94A3B8]">Continuous telemetry from warehouse queues and agent battery levels.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#38BDF8]">2. ACTOR-CRITIC</span>
              <p className="text-white font-semibold text-xs">PPO Decision Engine</p>
              <p className="text-[11px] text-[#94A3B8]">Proximal Policy Optimization balancing exploration and latency exploitation.</p>
            </div>
            <div className="p-3 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400">3. REWARD FUNCTION</span>
              <p className="text-white font-semibold text-xs">Optimal Throughput</p>
              <p className="text-[11px] text-[#94A3B8]">Positive reward on task dispatch completion, negative penalty on collision risk.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
