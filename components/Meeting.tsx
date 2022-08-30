import dayjs from "dayjs";
import React, { useContext } from "react";
import { v4 } from "uuid";

import FirebaseContext from "../context/firebaseContext";
import { Meeting as MeetingInterface } from "../interfaces";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface MeetingProps {
  meeting: MeetingInterface;
}

export default function Meeting({ meeting }: MeetingProps): JSX.Element {
  const { people } = useContext(FirebaseContext);

  const formattedMeeting = {
    weekDay: capitalizeFirstLetter(
      meeting.date.toDate().toLocaleDateString("pt-br", { weekday: "long" })
    ),
    date: dayjs(meeting.date.toDate()).format("DD/MM"),
    designations: meeting.designations.map((designation) => ({
      title: capitalizeFirstLetter(designation.title),
      people: designation.people.map((person) =>
        capitalizeFirstLetter(
          people.find(({ id }) => id === person)?.name ?? ""
        )
      ),
    })),
  };

  return (
    <div className="flex flex-col p-4 gap-4 shadow-lg bg-surface rounded-box">
      <span>
        <span className="title">{formattedMeeting.weekDay} </span>
        <span className="title-light">{formattedMeeting.date}</span>
      </span>
      <div className="flex flex-col">
        {formattedMeeting.designations.map((designation) => (
          <span key={v4()}>
            <span className="body">{designation.title}: </span>
            {designation.people.map((person, index) => (
              <span className="body-light" key={v4()}>
                {person}
                {designation.people.length - 1 !== index ? ", " : ""}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
