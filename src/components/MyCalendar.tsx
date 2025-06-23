import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ko } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";
import type { ToolbarProps } from "react-big-calendar";
const locales = {
  ko: ko,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
  locale: ko,
});

const CustomToolbar = ({ date }: ToolbarProps) => {
  const label = format(date, "yyyy년 M월", { locale: ko });
  return (
    <div className="flex text-center flex-row font-semibold justify-between p-4">
      <div className="mr-[600px]">{label}</div>
      <button>+</button>
      <button>오늘</button>
    </div>
  );
};
export default function MyCalendar() {
  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: CustomToolbar,
          month: {
            header: () => null,
          },
        }}
        selectable
        onSelectSlot={(slotinfo) => {
          console.log("날짜 선택됨", slotinfo);
        }}
        style={{ height: 500 }}
      />
    </div>
  );
}
