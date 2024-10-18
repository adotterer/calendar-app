"use client";
import MonthView from "@/components/Calendar/MonthView";
import DayView from "@/components/Calendar/DayView";
import { useView } from "@/context/ViewContext";
import Loading from "../Loading";

export default function Views() {
  const { view } = useView();

  if (view === "day") {
    return <DayView />;
  } else if (view === "month") {
    return <MonthView />;
  } else {
    return <Loading />;
  }
}
