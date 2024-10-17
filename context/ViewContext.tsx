import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ViewProviderProps {
  children: ReactNode;
}

interface ViewContextType {
  view: "month" | "day";
  activeDate: Date;
  setView: Dispatch<SetStateAction<"month" | "day">>;
  setActiveDate: Dispatch<SetStateAction<Date>>;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: ViewProviderProps) => {
  const [view, setView] = useState<"month" | "day">("month");
  const [activeDate, setActiveDate] = useState(new Date());
  return (
    <ViewContext.Provider value={{ view, activeDate, setView, setActiveDate }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = (): ViewContextType => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
};
