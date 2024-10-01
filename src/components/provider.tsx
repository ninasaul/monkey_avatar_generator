import React, { useState, useContext, ReactNode } from "react";

interface AppContextType {
  state: StateType;
  setState: (arg: Partial<StateType>) => void;
}

interface AppProviderProps {
  children: ReactNode;
}
export const appContext = React.createContext<AppContextType | undefined>(
  undefined
);
interface StateType {
  size: number;
  amount: number;
}
export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setStates] = useState<StateType>({ size: 150, amount: 1 });

  const setState = (arg = {}) => {
    setStates((prevState) => ({
      ...prevState, // 保留其他字段
      ...arg,
    }));
  };

  return (
    <appContext.Provider value={{ state, setState }}>
      {children}
    </appContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
