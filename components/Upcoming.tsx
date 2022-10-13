import dayjs from "dayjs";
import { useContext } from "react";
import { v4 } from "uuid";

import FirebaseContext from "../context/firebaseContext";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface UpcomingProps {
  personId: string;
}

export default function Upcoming({ personId }: UpcomingProps) {
  const { designations, people, titles } = useContext(FirebaseContext);

  const person = people[personId] ?? "";

  const formmatedDesignations = designations
    .map((designation) => ({
      person: designation.person,
      title: capitalizeFirstLetter(titles[designation.title]),
      date: dayjs(designation.date.toDate()).format("DD/MM"),
    }))
    .filter((designation) => designation.person === personId);

  return (
    <div className="bg-surface p-4 rounded-box text-center">
      <span className="subtitle block mb-4">
        Próximas Designações - {capitalizeFirstLetter(person)}
      </span>
      <div className="text-left inline-flex flex-col">
        {formmatedDesignations.length > 0 ? (
          formmatedDesignations.map((designation) => (
            <span key={v4()}>
              {designation.date} - {designation.title}
            </span>
          ))
        ) : (
          <span>Nenhuma designação encontrada</span>
        )}
      </div>
    </div>
  );
}
