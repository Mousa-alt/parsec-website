import React, { createContext, useContext, useRef, useCallback } from 'react';

interface TerminalContextType {
  executeCommand: (cmd: string) => void;
  registerExecutor: (fn: (cmd: string) => void) => void;
}

const TerminalContext = createContext<TerminalContextType>({
  executeCommand: () => {},
  registerExecutor: () => {},
});

export const useTerminal = () => useContext(TerminalContext);

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const executorRef = useRef<((cmd: string) => void) | null>(null);

  const registerExecutor = useCallback((fn: (cmd: string) => void) => {
    executorRef.current = fn;
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Delay command execution to allow scroll to complete
    setTimeout(() => {
      if (executorRef.current) {
        executorRef.current(cmd);
      }
    }, 600);
  }, []);

  return (
    <TerminalContext.Provider value={{ executeCommand, registerExecutor }}>
      {children}
    </TerminalContext.Provider>
  );
};
