import dayjs from "dayjs";
import { useContext } from "react";
import { v4 } from "uuid";

import FirebaseContext from "../context/firebaseContext";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import Designation from "./Designation";

interface MeetingFormProps {
  date: Date;
  disabled: boolean;
}

const titles = [
  "microfone",
  "video",
  "som",
  "indicador 1",
  "indicador 2",
  "pedestal",
];

export default function MeetingForm({ date, disabled }: MeetingFormProps) {
  const { people } = useContext(FirebaseContext);

  return (
    <div className="bg-surface p-4 rounded-box">
      <div className="mb-4 flex items-baseline gap-2">
        <span className="title text-white">
          {dayjs(date).format("DD/MM")} -
        </span>
        <span className="title text-white">
          {capitalizeFirstLetter(
            date.toLocaleDateString("pt-br", { weekday: "long" })
          )}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {titles.map((designation) => (
          <Designation
            key={v4()}
            title={designation}
            disabled={disabled}
            date={date}
          />
        ))}
      </div>
    </div>
  );
}
