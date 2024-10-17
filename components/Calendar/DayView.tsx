interface CalendarComponentProps {
  date?: Date;
}

export default function DayView({ date = new Date() }: CalendarComponentProps) {
  return <div>Day view</div>;
}
