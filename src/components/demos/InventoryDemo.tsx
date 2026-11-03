import React, { useState } from 'react';
import { Package, Search, Plus, Minus, AlertTriangle, Layers, DollarSign } from 'lucide-react';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'Processors' | 'Sensors' | 'Robotics' | 'Memory';
  stock: number;
  minThreshold: number;
  unitPrice: number;
}

export const InventoryDemo: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: '1', sku: 'SKU-NV-900', name: 'Neural Tensor Accelerator Board', category: 'Processors', stock: 14, minThreshold: 10, unitPrice: 320.00 },
    { id: '2', sku: 'SKU-SN-410', name: 'LiDAR Optical Depth Sensor', category: 'Sensors', stock: 6, minThreshold: 8, unitPrice: 145.50 },
    { id: '3', sku: 'SKU-RB-880', name: 'Micro-Actuator Servo Pack', category: 'Robotics', stock: 42, minThreshold: 15, unitPrice: 38.00 },
    { id: '4', sku: 'SKU-MM-220', name: 'High-Bandwidth HBM3 Memory 32GB', category: 'Memory', stock: 8, minThreshold: 12, unitPrice: 210.00 },
    { id: '5', sku: 'SKU-NV-720', name: 'Edge AI Inference Core', category: 'Processors', stock: 25, minThreshold: 10, unitPrice: 185.00 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const updateStock = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStock = Math.max(0, item.stock + delta);
          return { ...item, stock: nextStock };
        }
        return item;
      })
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalValuation = items.reduce((acc, curr) => acc + curr.stock * curr.unitPrice, 0);
  const totalUnits = items.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStockCount = items.filter((i) => i.stock < i.minThreshold).length;

  return (
    <div className="bg-[#050816] rounded-xl border border-[#38BDF8]/20 p-5 text-xs text-slate-300 shadow-2xl space-y-4">
      {/* Top Telemetry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-[#0B1220] border border-[#38BDF8]/20 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#2563EB]/20 text-[#00A6FF]">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#94A3B8] uppercase">Total Inventory Value</span>
            <p className="text-base font-bold text-white tabular-nums">${totalValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0B1220] border border-[#38BDF8]/20 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#00A6FF]/20 text-[#38BDF8]">
            <Package className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#94A3B8] uppercase">Units in Stock</span>
            <p className="text-base font-bold text-white tabular-nums">{totalUnits} Units</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#0B1220] border border-[#38BDF8]/20 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${lowStockCount > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[#94A3B8] uppercase">Low Stock Alerts</span>
            <p className="text-base font-bold text-white tabular-nums">{lowStockCount} Items Triggered</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SKU or component name..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A6FF] text-xs"
          />
        </div>

        {/* Category tabs as interactive functional controls (allowed per section 1.A) */}
        <div className="flex items-center gap-1 p-1 bg-[#0B1220] rounded-lg border border-[#38BDF8]/15 overflow-x-auto w-full sm:w-auto">
          {['All', 'Processors', 'Sensors', 'Robotics', 'Memory'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto rounded-xl border border-[#38BDF8]/15 bg-[#0B1220]/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050816] text-[#94A3B8] font-mono text-[10px] uppercase border-b border-[#38BDF8]/15">
            <tr>
              <th className="py-2.5 px-3">SKU</th>
              <th className="py-2.5 px-3">Component Name</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">Unit Price</th>
              <th className="py-2.5 px-3 text-center">Stock Level</th>
              <th className="py-2.5 px-3 text-right">Quick Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            {filteredItems.map((item) => {
              const isLow = item.stock < item.minThreshold;
              return (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2.5 px-3 text-[#38BDF8] font-bold">{item.sku}</td>
                  <td className="py-2.5 px-3 font-sans font-medium text-white">{item.name}</td>
                  <td className="py-2.5 px-3 text-[#94A3B8]">{item.category}</td>
                  <td className="py-2.5 px-3 text-white tabular-nums">${item.unitPrice.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`font-bold tabular-nums ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {item.stock}
                    </span>
                    {isLow && (
                      <span className="ml-1.5 text-[9px] text-amber-400/90 font-sans">
                        (Low Alert &lt; {item.minThreshold})
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => updateStock(item.id, -1)}
                        className="p-1 rounded bg-[#050816] border border-[#38BDF8]/20 hover:border-red-400 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
                        title="Deduct 1"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => updateStock(item.id, 5)}
                        className="px-2 py-0.5 rounded bg-[#050816] border border-[#38BDF8]/20 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 text-[10px] transition-colors cursor-pointer"
                        title="Restock 5"
                      >
                        +5
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
