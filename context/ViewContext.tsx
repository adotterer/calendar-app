"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Calendar from "@/lib/Calendar";

interface ViewProviderProps {
  children: ReactNode;
}

interface ViewContextType {
  view: "month" | "day";
  activeDate: Date;
  setView: Dispatch<SetStateAction<"month" | "day">>;
  setActiveDate: Dispatch<SetStateAction<Date>>;
  calendar: Calendar;
  setCalendar: Dispatch<SetStateAction<Calendar>>;
  activeDay: number;
  setActiveDay: Dispatch<SetStateAction<number>>;
  activeWeek: number[];
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: ViewProviderProps) => {
  const today = new Date();
  const [view, setView] = useState<"month" | "day">("month");
  const [activeDate, setActiveDate] = useState(today);
  const [calendar, setCalendar] = useState(new Calendar(today));
  const [activeDay, setActiveDay] = useState(today.getDate());
  const activeWeek = calendar.activeWeek(activeDay);

  useEffect(() => {
    setView(localStorage.getItem("current-view") as "month" | "day");
  }, []);
  //   useEffect(() => {
  //     localStorage.setItem("current-view", view);
  //   }, [view]);

  return (
    <ViewContext.Provider
      value={{
        view,
        activeDate,
        setView,
        setActiveDate,
        calendar,
        setCalendar,
        activeDay,
        setActiveDay,
        activeWeek,
      }}
    >
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
