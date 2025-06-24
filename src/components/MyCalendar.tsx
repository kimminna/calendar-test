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
};

type MyEvent = {
  start: Date;
  end: Date;
  title: string;
  poster?: string; // 이미지 URL
};

const CustomToolbar = ({ date, setIsModalOpen }: CustomToolbarProps) => {
  const label = format(date, "yyyy년 M월", { locale: ko });

  return (
    <div className="flex items-center text-center flex-row font-semibold justify-between p-4">
      <div className="mr-[550px]">{label}</div>
      <button
        className="w-8 h-8 border-[1.5px] border-black text-center rounded-full"
        onClick={() => setIsModalOpen(true)}
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
  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: (props: ToolbarProps<MyEvent>) => (
            <CustomToolbar {...props} setIsModalOpen={setIsModalOpen} />
          ),
          month: {
            header: () => null,
          },
        }}
        selectable
        onSelectSlot={(slotinfo) => {
          console.log("날짜 선택됨", slotinfo);
        }}
        className="h-[500px]"
      />

      {isModalOpen && <TicketModal />}
    </div>
  );
}
