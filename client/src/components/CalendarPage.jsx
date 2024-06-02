import Calendar from "./Calendar";
import CalendarChores from "./CalendarChores";
import "./CalendarPage.css";

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <Calendar />
      <CalendarChores />
    </div>
  );
}
