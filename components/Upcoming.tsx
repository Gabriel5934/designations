import dayjs from "dayjs";
import { v4 } from "uuid";

import { Designation } from "../interfaces";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

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
        Próximas Designações - {capitalizeFirstLetter(person)}
      </span>
      <div className="text-left inline-flex flex-col">
        {formmatedDesignations.map((designation) => (
          <span key={v4()}>
            {designation.date} - {designation.title}
          </span>
        ))}
      </div>
    </div>
  );
}
