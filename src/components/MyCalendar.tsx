import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { ToolbarProps } from "react-big-calendar";
import type { MyEvent } from "../types/event";
import { useState } from "react";
import TicketModal from "./TicketModal";
import { CustomToolbar } from "./CustomToolbar";

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

export default function MyCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center">
      <div className="w-[678px] h-[1488px] max-w-full bg-white shadow-lg [&_.rbc-today]:bg-transparent [&_.rbc-event]:bg-transparent [&_.rbc-month-row]:min-h-[130px] flex flex-col">
        <Calendar
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          components={{
            toolbar: (props: ToolbarProps<MyEvent>) => (
              <CustomToolbar
                {...props}
                date={currentDate}
                onNavigate={(action, newDate) =>
                  newDate && setCurrentDate(newDate)
                }
                setIsModalOpen={setIsModalOpen}
                setSelectedDate={setSelectedDate}
              />
            ),
            event: ({ event }) =>
              event.poster ? (
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={event.poster}
                    alt="포스터"
                    className="w-[60px] h-[90px] object-cover"
                  ></img>
                </div>
              ) : (
                <div>{event.title}</div>
              ),
            month: {
              header: () => null,
            },
          }}
          selectable
          onSelectSlot={(slotinfo) => {
            setSelectedDate(slotinfo.start);
            setIsModalOpen((prev) => !prev);
          }}
          className=" h-[720px] [&_.rbc-day-bg]:border-none [&_.rbc-date-cell]:border-none
    [&_.rbc-month-row]:border-none
    [&_.rbc-month-view]:border-none"
          events={events}
        />

        {isModalOpen && (
          <div className="w-full">
            <TicketModal
              date={currentDate}
              onAdd={(file) => {
                const url = URL.createObjectURL(file);
                setEvents((prev) => [
                  ...prev,
                  {
                    title: "포스터",
                    start: selectedDate!,
                    end: selectedDate!,
                    poster: url,
                  },
                ]);
                setIsModalOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
