"use client";
import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useAuth } from "@/context/AuthContext";
import Calendar from "@/lib/Calendar";
import { LocalEvent } from "@/lib/Event";

type CalendarDayEvents = {
  [day: number]: LocalEvent[];
};
interface ViewProviderProps {
  children: ReactNode;
}

interface ViewContextType {
  view: "month" | "day" | null;
  activeDate: Date;
  setView: Dispatch<SetStateAction<"month" | "day" | null>>;
  setActiveDate: Dispatch<SetStateAction<Date>>;
  calendar: Calendar;
  setCalendar: Dispatch<SetStateAction<Calendar>>;
  activeDay: number;
  setActiveDay: Dispatch<SetStateAction<number>>;
  activeWeek: number[];
  eventsForThisMonth: CalendarDayEvents;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: ViewProviderProps) => {
  const today = new Date();
  const { userEvents } = useAuth();
  const [view, setView] = useState<"month" | "day" | null>(null);
  const [activeDate, setActiveDate] = useState(today);
  const [calendar, setCalendar] = useState(new Calendar(today));
  const [activeDay, setActiveDay] = useState(today.getDate());
  const activeWeek = calendar.activeWeek(activeDay);

  const eventsForThisMonth = useMemo(() => {
    return userEvents.reduce<CalendarDayEvents>((acc, userEvent) => {
      userEvent.calendarDays.forEach((curr) => {
        const [year, month, day] = curr.split("-").map(Number);

        if (calendar.year === year && calendar.mon === month) {
          if (acc[day]) {
            acc[day].push(userEvent);
          } else {
            acc[day] = [userEvent];
          }
        }
      });
      return acc;
    }, {});
  }, [calendar, userEvents]);

  useEffect(() => {
    const storedView = localStorage.getItem("current-view");
    if (storedView) {
      setView(storedView as "month" | "day");
    } else {
      setView("month");
    }
  }, []);

  useEffect(() => {
    if (view && view !== localStorage.getItem("current-view")) {
      localStorage.setItem("current-view", view);
    }
  }, [view]);

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
        eventsForThisMonth,
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
