"use client";
import MonthView from "@/components/Calendar/MonthView";
import DayView from "@/components/Calendar/DayView";
import { useView } from "@/context/ViewContext";

export default function Views() {
  const { view } = useView();

  if (view === "month") {
    return <MonthView />;
  } else {
    return <DayView />;
  }
}
