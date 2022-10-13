import dayjs from "dayjs";
import React, { useContext } from "react";
import { v4 } from "uuid";

import FirebaseContext from "../context/firebaseContext";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface MeetingProps {
  date: Date;
}

export default function Meeting({ date }: MeetingProps): JSX.Element {
  const { designations, people, titles } = useContext(FirebaseContext);

  const formattedMeeting = {
    weekDay: capitalizeFirstLetter(
      date.toLocaleDateString("pt-br", { weekday: "long" })
    ),
    date: dayjs(date).format("DD/MM"),
    designations: designations.filter(
      (designation) =>
        designation.date.toDate().toDateString() === date.toDateString()
    ),
  };

  return (
    <div className="flex flex-col p-4 gap-4 shadow-lg bg-surface rounded-box">
      <span>
        <span className="title">{formattedMeeting.weekDay} </span>
        <span className="title-light">{formattedMeeting.date}</span>
      </span>
      <div className="flex flex-col">
        {formattedMeeting.designations.map(({ title, person }) => (
          <span key={v4()}>
            <span className="body">
              {capitalizeFirstLetter(titles[title])}:{" "}
            </span>
            <span className="body-light" key={v4()}>
              {capitalizeFirstLetter(people[person])}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
