import dayjs from "dayjs";
import { uuid } from "uuidv4";

import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface TimeStamp {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
}

interface Designation {
  title: string;
  people: number[];
  date: TimeStamp;
}

interface UpcomingProps {
  designations: Designation[];
  person: string;
}

export default function Upcoming({ designations, person }: UpcomingProps) {
  const formmatedDesignations = designations.map((designation) => ({
    title: capitalizeFirstLetter(designation.title),
    date: dayjs(designation.date.toDate()).format("DD/MM"),
  }));

  return (
    <div className="bg-surface p-4 rounded-box text-center">
      <span className="subtitle block mb-4">
        Próximas Designações - {person}
      </span>
      <div className="text-left inline-flex flex-col">
        {formmatedDesignations.map((designation) => (
          <span key={uuid()}>
            {designation.date} - {designation.title}
          </span>
        ))}
      </div>
    </div>
  );
}
