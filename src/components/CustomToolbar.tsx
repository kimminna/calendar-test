import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import type { CustomToolbarProps } from "../types/calendar";

export const CustomToolbar = ({
  date,
  onNavigate,
  setIsModalOpen,
  setSelectedDate,
}: CustomToolbarProps) => {
  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      const newDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );
      onNavigate("DATE", newDate);
    }
  };

  return (
    <div className="flex items-center text-center flex-row font-semibold justify-between p-4">
      <DatePicker
        locale={ko}
        selected={date}
        onChange={handleDateChange}
        dateFormat=" ▼ yyyy년 MM월"
        showMonthYearPicker
        showFullMonthYearPicker
        popperPlacement="bottom-start"
        className="mr-[300px] cursor-pointer"
      />
      <button
        className="w-8 h-8 border-[1.5px] border-black text-center rounded-full"
        onClick={() => {
          setSelectedDate(date);
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
