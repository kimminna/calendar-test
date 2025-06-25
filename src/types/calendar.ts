import type { MyEvent } from "./event";
import type { ToolbarProps } from "react-big-calendar";

export type CustomToolbarProps = ToolbarProps<MyEvent> & {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
};
