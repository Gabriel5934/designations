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

export default function MeetingForm({ date, disabled }: MeetingFormProps) {
  const { titles } = useContext(FirebaseContext);

  // Matrix with the titles and ids
  var arrayOfTitles = Object.entries(titles).slice(0);

  const sortedArrayOfTitles = arrayOfTitles.sort(function (a, b) {
    var x = a[1].toLowerCase();
    var y = b[1].toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  const sortedTitlesObject = Object.fromEntries(sortedArrayOfTitles);

  const titlesKeys = Object.keys(sortedTitlesObject);

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
        {titlesKeys.map((title) => (
          <Designation
            key={v4()}
            title={title}
            disabled={disabled}
            date={date}
          />
        ))}
      </div>
    </div>
  );
}
