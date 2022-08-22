import dayjs from "dayjs";
import React from "react";
import { uuid } from "uuidv4";

interface Meeting {
  date: Date;
  mechanical: Array<{ title: string; people: Array<string> }>;
  stage: Array<{ title: string; people: Array<string> }>;
}

interface MeetingProps {
  meeting: Meeting;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Meeting({ meeting }: MeetingProps): JSX.Element {
  return (
    <div className="flex flex-col p-4 gap-4 shadow-lg bg-surface rounded-box">
      <span>
        <span className="title">
          {capitalizeFirstLetter(
            meeting.date.toLocaleDateString("pt-br", { weekday: "long" })
          )}{" "}
        </span>
        <span className="title-light">
          {dayjs(meeting.date).format("DD/MM")}
        </span>
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="subtitle">Designações Mecânicas</span>

          {meeting.mechanical.map((mechanical) => (
            <span key={uuid()}>
              <span className="body">{mechanical.title}: </span>
              {mechanical.people.map((person, index) => (
                <span className="body-light" key={uuid()}>
                  {person}
                  {mechanical.people.length - 1 !== index ? ", " : ""}
                </span>
              ))}
            </span>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="subtitle">Partes</span>
          <span>
            <span className="body">Leitura da Sentinela: </span>
            <span className="body-light">Fulano</span>
          </span>
        </div>
      </div>
    </div>
  );
}
