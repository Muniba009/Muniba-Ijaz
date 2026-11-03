import React, { useState } from 'react';
import { Terminal, Shield, ArrowDownLeft, ArrowUpRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const AtmTerminalDemo: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(14680.50);
  const [amountInput, setAmountInput] = useState('');
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>({
    text: 'ATM Terminal Ready. Default Demo PIN is 1234.',
    type: 'info',
  });
  const [transactions, setTransactions] = useState<Array<{ id: number; type: string; amount: number; time: string; balanceAfter: number }>>([
    { id: 1, type: 'Initial Deposit', amount: 14000.00, time: '10:00:15', balanceAfter: 14000.00 },
    { id: 2, type: 'Transfer Credit', amount: 680.50, time: '11:24:32', balanceAfter: 14680.50 },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin === '0000') {
      setIsAuthenticated(true);
      setActionMessage({ text: 'Access Granted. Welcome, Authorized User.', type: 'success' });
    } else {
      setActionMessage({ text: 'Invalid PIN. (Hint: Try 1234 for demo)', type: 'error' });
    }
  };

  const handleWithdraw = () => {
    const amt = parseFloat(amountInput);
    if (isNaN(amt) || amt <= 0) {
      setActionMessage({ text: 'Please enter a valid withdrawal amount.', type: 'error' });
      return;
    }
    if (amt > balance) {
      setActionMessage({ text: 'Transaction Declined: Insufficient balance.', type: 'error' });
      return;
    }
    const newBal = balance - amt;
    setBalance(newBal);
    setTransactions(prev => [
      { id: Date.now(), type: 'Withdrawal', amount: amt, time: new Date().toLocaleTimeString(), balanceAfter: newBal },
      ...prev,
    ]);
    setActionMessage({ text: `Dispensed $${amt.toFixed(2)}. Cash drawer opened.`, type: 'success' });
    setAmountInput('');
  };

  const handleDeposit = () => {
    const amt = parseFloat(amountInput);
    if (isNaN(amt) || amt <= 0) {
      setActionMessage({ text: 'Please enter a valid deposit amount.', type: 'error' });
      return;
    }
    const newBal = balance + amt;
    setBalance(newBal);
    setTransactions(prev => [
      { id: Date.now(), type: 'Deposit', amount: amt, time: new Date().toLocaleTimeString(), balanceAfter: newBal },
      ...prev,
    ]);
    setActionMessage({ text: `Successfully credited $${amt.toFixed(2)} to account.`, type: 'success' });
    setAmountInput('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    setAmountInput('');
    setActionMessage({ text: 'Card ejected. Session terminated safely.', type: 'info' });
  };

  return (
    <div className="bg-[#050816] rounded-xl border border-[#38BDF8]/20 p-5 font-mono text-xs text-slate-300 shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#38BDF8]/15">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00A6FF]" />
          <span className="font-bold text-white tracking-wide">python3 atm_simulation.py</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
      </div>

      {/* Terminal Screen Status */}
      {actionMessage && (
        <div className={`p-2.5 rounded-lg mb-4 flex items-center gap-2 border ${
          actionMessage.type === 'success' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' :
          actionMessage.type === 'error' ? 'bg-rose-950/40 border-rose-500/30 text-rose-300' :
          'bg-[#0B1220] border-[#38BDF8]/20 text-[#38BDF8]'
        }`}>
          {actionMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
          {actionMessage.type === 'error' && <AlertCircle className="w-4 h-4 shrink-0" />}
          {actionMessage.type === 'info' && <Shield className="w-4 h-4 shrink-0" />}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {!isAuthenticated ? (
        <div className="space-y-4 py-4 max-w-sm mx-auto text-center">
          <div className="p-3 bg-[#0B1220] rounded-xl border border-[#38BDF8]/20">
            <p className="text-white font-semibold mb-1">MUNIBA IJAZ INDUSTRIAL ATM</p>
            <p className="text-[#94A3B8] text-[11px]">System Architecture v2.4 · SHA-256 Auth</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-[11px] text-[#94A3B8] text-left mb-1">ENTER 4-DIGIT PIN:</label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="• • • •"
                className="w-full tracking-widest text-center text-lg py-2 rounded-lg bg-[#0B1220] border border-[#00A6FF]/40 text-white focus:outline-none focus:border-[#00A6FF]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] font-bold rounded-lg transition-all cursor-pointer"
            >
              AUTHENTICATE PIN
            </button>
          </form>

          <p className="text-[10px] text-[#94A3B8]">
            Demo PIN is <span className="text-[#00A6FF] font-bold">1234</span>
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Balance Bar */}
          <div className="p-4 rounded-xl bg-[#0B1220] border border-[#00A6FF]/30 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-[#94A3B8] uppercase">Current Available Balance</span>
              <p className="text-2xl font-bold text-white tabular-nums">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/50 transition-colors cursor-pointer"
            >
              Eject Card (Logout)
            </button>
          </div>

          {/* Action Pad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-2">
              <label className="block text-[11px] text-[#94A3B8]">TRANSACTION AMOUNT ($):</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 px-3 py-2 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 text-white focus:outline-none focus:border-[#00A6FF]"
                />
                <button
                  onClick={handleWithdraw}
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>Withdraw</span>
                </button>
                <button
                  onClick={handleDeposit}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Deposit</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex gap-1.5">
                {[100, 500, 1000].map((quick) => (
                  <button
                    key={quick}
                    onClick={() => setAmountInput(quick.toString())}
                    className="flex-1 py-1.5 bg-[#0B1220] border border-[#38BDF8]/20 rounded text-[11px] hover:border-[#00A6FF] text-slate-300 hover:text-white"
                  >
                    +${quick}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Ledger History */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-white uppercase">Session Audit Ledger</span>
              <span className="text-[10px] text-[#94A3B8]">{transactions.length} recorded events</span>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1.5 rounded-lg bg-[#0B1220]/70 p-2 border border-[#38BDF8]/15">
              {transactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between text-[11px] py-1 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[#94A3B8]">{t.time}</span>
                    <span className="font-semibold text-white">{t.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-bold tabular-nums ${t.type === 'Withdrawal' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {t.type === 'Withdrawal' ? '-' : '+'}${t.amount.toFixed(2)}
                    </span>
                    <span className="text-slate-400 tabular-nums text-[10px]">Bal: ${t.balanceAfter.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
