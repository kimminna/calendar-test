import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ko } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { ToolbarProps } from "react-big-calendar";
import { useState } from "react";
import TicketModal from "./TicketModal";

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

type CustomToolbarProps = ToolbarProps<MyEvent> & {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

type MyEvent = {
  start: Date;
  end: Date;
  title: string;
  poster?: string; // 이미지 URL
};

const CustomToolbar = ({
  date,
  setIsModalOpen,
  setSelectedDate,
}: CustomToolbarProps) => {
  const label = format(date, "yyyy년 M월", { locale: ko });

  return (
    <div className="flex items-center text-center flex-row font-semibold justify-between p-4">
      <div className="mr-[400px]">{label}</div>
      <button
        className="w-8 h-8 border-[1.5px] border-black text-center rounded-full"
        onClick={() => {
          setSelectedDate(new Date());
          setIsModalOpen((prev) => !prev);
        }}
      >
        +
      </button>
      <button className="w-16 h-8 border-[1.5px] border-black text-center rounded-full">
        오늘
      </button>
    </div>
  );
};
export default function MyCalendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center">
      <div className="w-[678px] h-[1488px] max-w-full bg-white shadow-lg [&_.rbc-today]:bg-transparent [&_.rbc-event]:bg-transparent [&_.rbc-month-row]:min-h-[130px] flex flex-col">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          components={{
            toolbar: (props: ToolbarProps<MyEvent>) => (
              <CustomToolbar
                {...props}
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
              date={selectedDate}
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
