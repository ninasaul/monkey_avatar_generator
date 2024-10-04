import React, { useState, useContext, ReactNode } from "react";

interface AppContextType {
  state: StateType;
  setState: (arg: Partial<StateType>) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

interface StateType {
  size: number;
  amount: number;
}

const appContext = React.createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setStates] = useState<StateType>({ size: 256, amount: 1 });

  const setState = (arg = {}) => {
    setStates((prevState) => ({
      ...prevState,
      ...arg,
    }));
  };

  return (
    <appContext.Provider value={{ state, setState }}>
      {children}
    </appContext.Provider>
  );
};

const useApp = (): AppContextType => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useApp, appContext };
