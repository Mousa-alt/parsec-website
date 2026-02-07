
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Copy, Terminal as TerminalIcon, Shield, Activity, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminal } from '../TerminalContext';

type LineType = 'sys' | 'user' | 'alert' | 'success' | 'info';

interface TerminalLine {
  type: LineType;
  text: string;
}

// Command responses for the interactive terminal
const COMMANDS: Record<string, () => TerminalLine[]> = {
  help: () => [
    { type: 'info', text: '┌─────────────────────────────────────────────────┐' },
    { type: 'info', text: '│  PARSEC COMMAND INTERFACE v2.5.0                │' },
    { type: 'info', text: '├─────────────────────────────────────────────────┤' },
    { type: 'sys', text: '│  help      → Display this help menu             │' },
    { type: 'sys', text: '│  status    → System health & metrics            │' },
    { type: 'sys', text: '│  services  → View all our services              │' },
    { type: 'sys', text: '│  roi       → Calculate automation ROI           │' },
    { type: 'sys', text: '│  demo      → Experience AI capability           │' },
    { type: 'sys', text: '│  book      → Schedule a strategy call           │' },
    { type: 'sys', text: '│  clear     → Clear terminal output              │' },
    { type: 'info', text: '├─────────────────────────────────────────────────┤' },
    { type: 'success', text: '│  Or ask any question — AI-powered responses!   │' },
    { type: 'info', text: '└─────────────────────────────────────────────────┘' },
  ],
  status: () => [
    { type: 'success', text: '✓ PARSEC CORE STATUS' },
    { type: 'sys', text: '──────────────────────────────────' },
    { type: 'sys', text: '  Uptime:        99.97% (365 days)' },
    { type: 'sys', text: '  Active Nodes:  47 worldwide' },
    { type: 'sys', text: '  AI Models:     GPT-4o, Claude, Custom LLMs' },
    { type: 'sys', text: '  Latency:       12ms avg response' },
    { type: 'sys', text: '  Regions:       Egypt, Saudi Arabia, UAE' },
    { type: 'success', text: '  Status:        ALL SYSTEMS OPERATIONAL' },
  ],
  services: () => [
    { type: 'info', text: '╔═══════════════════════════════════════════════╗' },
    { type: 'info', text: '║         PARSEC SERVICE CATALOG (20+)          ║' },
    { type: 'info', text: '╠═══════════════════════════════════════════════╣' },
    { type: 'success', text: '║  [01] AI THAT WORKS                           ║' },
    { type: 'sys', text: '║     Personal AI Assistants • Voice Agents     ║' },
    { type: 'sys', text: '║     Hiring Agents • Social Media Agents       ║' },
    { type: 'sys', text: '║     Support Bots • Payment Processing         ║' },
    { type: 'sys', text: '║     Data Entry Automation • Workflows         ║' },
    { type: 'info', text: '║───────────────────────────────────────────────║' },
    { type: 'success', text: '║  [02] BRANDS THAT POP                         ║' },
    { type: 'sys', text: '║     Website Creation • Branding Kits          ║' },
    { type: 'sys', text: '║     Media Production • Pitch Decks            ║' },
    { type: 'sys', text: '║     Social Content • Copywriting              ║' },
    { type: 'info', text: '║───────────────────────────────────────────────║' },
    { type: 'success', text: '║  [03] GROWTH THAT LASTS                       ║' },
    { type: 'sys', text: '║     Startup Boost • Business Consulting       ║' },
    { type: 'sys', text: '║     Market Research • Custom AI Solutions     ║' },
    { type: 'sys', text: '║     SaaS Development • Command Center         ║' },
    { type: 'info', text: '╚═══════════════════════════════════════════════╝' },
  ],
  products: () => [
    { type: 'info', text: '╔═══════════════════════════════════════════════╗' },
    { type: 'info', text: '║         PARSEC SERVICE CATALOG (20+)          ║' },
    { type: 'info', text: '╠═══════════════════════════════════════════════╣' },
    { type: 'success', text: '║  [01] AI THAT WORKS                           ║' },
    { type: 'sys', text: '║     Personal AI Assistants • Voice Agents     ║' },
    { type: 'sys', text: '║     Hiring Agents • Social Media Agents       ║' },
    { type: 'sys', text: '║     Support Bots • Payment Processing         ║' },
    { type: 'sys', text: '║     Data Entry Automation • Workflows         ║' },
    { type: 'info', text: '║───────────────────────────────────────────────║' },
    { type: 'success', text: '║  [02] BRANDS THAT POP                         ║' },
    { type: 'sys', text: '║     Website Creation • Branding Kits          ║' },
    { type: 'sys', text: '║     Media Production • Pitch Decks            ║' },
    { type: 'sys', text: '║     Social Content • Copywriting              ║' },
    { type: 'info', text: '║───────────────────────────────────────────────║' },
    { type: 'success', text: '║  [03] GROWTH THAT LASTS                       ║' },
    { type: 'sys', text: '║     Startup Boost • Business Consulting       ║' },
    { type: 'sys', text: '║     Market Research • Custom AI Solutions     ║' },
    { type: 'sys', text: '║     SaaS Development • Command Center         ║' },
    { type: 'info', text: '╚═══════════════════════════════════════════════╝' },
  ],
  roi: () => [
    { type: 'info', text: '📊 PARSEC ROI CALCULATOR' },
    { type: 'sys', text: '──────────────────────────────────' },
    { type: 'sys', text: '  Industry Average Results:' },
    { type: 'sys', text: '' },
    { type: 'success', text: '  ▸ Time Saved:     40+ hours/week' },
    { type: 'success', text: '  ▸ Cost Reduction: 60% operational' },
    { type: 'success', text: '  ▸ Revenue Boost:  23% avg increase' },
    { type: 'success', text: '  ▸ ROI Timeline:   4-8 weeks' },
    { type: 'sys', text: '' },
    { type: 'alert', text: '  → Type "book" for personalized ROI analysis' },
  ],
  demo: () => [
    { type: 'info', text: '🤖 INITIATING AI DEMONSTRATION...' },
    { type: 'sys', text: '' },
    { type: 'sys', text: '  User: "Schedule a meeting with client X"' },
    { type: 'success', text: '  AI:   ✓ Checking calendar availability...' },
    { type: 'success', text: '        ✓ Found 3 open slots this week' },
    { type: 'success', text: '        ✓ Sent invitation to client@xyz.com' },
    { type: 'success', text: '        ✓ Added to CRM with context notes' },
    { type: 'sys', text: '' },
    { type: 'info', text: '  ⚡ Task completed in 2.3 seconds' },
    { type: 'sys', text: '     Manual equivalent: ~15 minutes' },
  ],
  book: () => [
    { type: 'success', text: '📅 FREE STRATEGY SESSION' },
    { type: 'sys', text: '──────────────────────────────────' },
    { type: 'sys', text: '  What you\'ll get:' },
    { type: 'sys', text: '' },
    { type: 'info', text: '  ✦ 30-min discovery call' },
    { type: 'info', text: '  ✦ Custom automation roadmap' },
    { type: 'info', text: '  ✦ ROI projection for your business' },
    { type: 'info', text: '  ✦ Live product demonstration' },
    { type: 'sys', text: '' },
    { type: 'alert', text: '  → Scroll to contact section or message via WhatsApp' },
  ],
};

export const Terminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shell' | 'logs' | 'network'>('shell');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'sys', text: '// Parsec Core Network — Authorized Access Only' },
    { type: 'sys', text: '// System Status: [STABLE]' },
    { type: 'success', text: '✓ Connection established to PARSEC_NODE_01' },
    { type: 'sys', text: '' },
    { type: 'info', text: '  Type "help" or ask any question about ParSec' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { registerExecutor } = useTerminal();

  // Only scroll to end of terminal AFTER user has interacted (not on initial mount)
  useEffect(() => {
    if (hasInteracted) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [lines, hasInteracted]);

  // Register external command executor for cross-component use
  const externalExecute = useCallback((cmd: string) => {
    setHasInteracted(true);
    setLines(prev => [...prev, { type: 'user', text: `$ ${cmd}` }]);
    processCommand(cmd);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    registerExecutor(externalExecute);
  }, [registerExecutor, externalExecute]);

  const processCommand = (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim();

    if (normalizedCmd === 'clear') {
      setLines([
        { type: 'sys', text: '// Terminal cleared' },
        { type: 'info', text: '  Type "help" to see available commands' },
      ]);
      return;
    }

    const commandFn = COMMANDS[normalizedCmd];
    if (commandFn) {
      setIsProcessing(true);
      // Simulate processing delay
      setTimeout(() => {
        setLines(prev => [...prev, { type: 'sys', text: '' }, ...commandFn()]);
        setIsProcessing(false);
      }, 300 + Math.random() * 400);
    } else {
      // Not a built-in command — send to AI
      setIsProcessing(true);
      setLines(prev => [...prev, { type: 'sys', text: '  ⚡ Querying ParSec AI...' }]);

      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cmd, history: chatHistory }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.reply) {
            const replyLines: TerminalLine[] = data.reply
              .split('\n')
              .map((line: string) => ({ type: 'info' as LineType, text: `  ${line}` }));
            setLines(prev => [...prev.slice(0, -1), ...replyLines]);
            setChatHistory(prev => [
              ...prev,
              { role: 'user', content: cmd },
              { role: 'assistant', content: data.reply },
            ]);
          } else {
            setLines(prev => [
              ...prev.slice(0, -1),
              { type: 'alert', text: '  AI service unavailable. Try a built-in command.' },
              { type: 'sys', text: '  Type "help" for available commands.' },
            ]);
          }
          setIsProcessing(false);
        })
        .catch(() => {
          setLines(prev => [
            ...prev.slice(0, -1),
            { type: 'alert', text: '  Connection error. Try a built-in command.' },
            { type: 'sys', text: '  Type "help" for available commands.' },
          ]);
          setIsProcessing(false);
        });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() && !isProcessing) {
      setHasInteracted(true);
      const cmd = inputValue.trim();
      setLines(prev => [...prev, { type: 'user', text: `$ ${cmd}` }]);
      setInputValue('');
      processCommand(cmd);
    }
  };

  const handleQuickCommand = (cmd: string) => {
    if (!isProcessing) {
      setHasInteracted(true);
      setLines(prev => [...prev, { type: 'user', text: `$ ${cmd}` }]);
      processCommand(cmd);
      inputRef.current?.focus();
    }
  };

  const getLineColor = (type: LineType) => {
    switch (type) {
      case 'user': return 'text-[#2D4769] font-black';
      case 'alert': return 'text-amber-600 font-bold';
      case 'success': return 'text-emerald-600 font-semibold';
      case 'info': return 'text-sky-600 font-semibold';
      default: return 'text-[#787774]';
    }
  };

  return (
    <div className="tactile-card overflow-hidden">
      {/* Multitab Terminal Header */}
      <div className="bg-[#F7F6F3] border-b border-[#EBEEEF] px-2 md:px-4 flex items-center justify-between overflow-x-auto">
        <div className="flex">
          {[
            { id: 'shell', icon: <TerminalIcon className="w-3 h-3" />, label: 'Shell', fullLabel: 'Parsec Shell' },
            { id: 'logs', icon: <Activity className="w-3 h-3" />, label: 'Logs', fullLabel: 'Core Logs' },
            { id: 'network', icon: <Wifi className="w-3 h-3" />, label: 'Net', fullLabel: 'Network' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2 md:px-4 py-2 md:py-3 flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest border-r border-[#EBEEEF] transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-[#2D4769]' : 'text-[#AEACA6] hover:bg-white/50'}`}
            >
              {tab.icon} <span className="hidden sm:inline">{tab.fullLabel}</span><span className="sm:hidden">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 md:gap-4 pr-2 shrink-0">
          <Shield className="w-3 h-3 text-emerald-500" />
          <button
            onClick={() => handleQuickCommand('clear')}
            className="text-[#AEACA6] hover:text-[#37352F] transition-colors"
            title="Clear terminal"
          >
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Quick Commands Bar */}
      <div className="bg-[#F0F2F5] border-b border-[#E1E6EB] px-2 md:px-4 py-2 flex items-center gap-1.5 md:gap-2 overflow-x-auto">
        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-wider md:tracking-widest text-[#8EA3B5] mr-1 md:mr-2 shrink-0">Quick:</span>
        {['help', 'services', 'roi', 'demo', 'book'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleQuickCommand(cmd)}
            disabled={isProcessing}
            className="px-2 md:px-3 py-1 rounded-lg bg-white border border-[#E1E6EB] text-[9px] md:text-[10px] font-black uppercase tracking-wider text-[#2D4769] hover:bg-[#2D4769] hover:text-white hover:border-[#2D4769] transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>

      <div className="p-3 md:p-6 h-[400px] md:h-[500px] overflow-y-auto mono text-[11px] md:text-[13px] bg-[#FAFAFA] relative">
        <AnimatePresence>
          {lines.map((line, i) => (
            <motion.div
              key={`${i}-${line.text}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`mb-1 flex gap-4 ${getLineColor(line.type)}`}
            >
              <span className="opacity-30 select-none w-6 text-right shrink-0">{(i+1).toString().padStart(2, '0')}</span>
              <span className="whitespace-pre">{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-2 text-[#8EA3B5]"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D4769] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D4769] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D4769] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs">Processing...</span>
          </motion.div>
        )}

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#EBEEEF]">
          <span className="text-[#2D4769] font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="bg-transparent border-none outline-none text-[#37352F] w-full placeholder:text-[#C5D2E0] font-bold disabled:cursor-not-allowed"
            placeholder="Type a command or click Quick buttons above..."
          />
        </div>
        <div ref={terminalEndRef} />
      </div>

      {/* System Status Bar */}
      <div className="bg-[#EBEEEF] px-2 md:px-4 py-2 flex items-center justify-between text-[8px] md:text-[9px] font-mono font-bold text-[#8EA3B5]">
        <div className="flex gap-3 md:gap-6">
          <span className="hidden sm:inline">CPU: 4.2%</span>
          <span className="hidden md:inline">MEM: 12GB/32GB</span>
          <span>LAT: 12ms</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">PARSEC_NODE_LONDON</span>
          <span className="sm:hidden">LONDON</span>
        </div>
      </div>
    </div>
  );
};
