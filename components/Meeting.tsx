import dayjs from "dayjs";
import React from "react";
import { uuid } from "uuidv4";

interface TimeStamp {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
}

interface Designation {
  title: string;
  people: string[];
  date: TimeStamp;
}

interface Meeting {
  date: TimeStamp;
  designations: Designation[];
}

interface MeetingProps {
  meeting: Meeting;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Meeting({ meeting }: MeetingProps): JSX.Element {
  const formattedMeeting = {
    weekDay: capitalizeFirstLetter(
      meeting.date.toDate().toLocaleDateString("pt-br", { weekday: "long" })
    ),
    date: dayjs(meeting.date.toDate()).format("DD/MM"),
    designations: meeting.designations.map((designation) => ({
      title: capitalizeFirstLetter(designation.title),
      people: designation.people.map((person) => capitalizeFirstLetter(person)),
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
          <span key={uuid()}>
            <span className="body">{designation.title}: </span>
            {designation.people.map((person, index) => (
              <span className="body-light" key={uuid()}>
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
