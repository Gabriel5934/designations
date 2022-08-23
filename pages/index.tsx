import type { NextPage } from "next";
import { useState } from "react";
import { uuid } from "uuidv4";

import Dropdown from "../components/Dropdown";
import Meeting from "../components/Meeting";
import Upcoming from "../components/Upcoming";
import useMeetings from "../hooks/useMeetings";
import usePeople from "../hooks/usePeople";

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

const Home: NextPage = () => {
  const [meetings] = useMeetings();
  const [people] = usePeople();

  const [person, setPerson] = useState("default");
  const [upcomingDesignations, setUpcomingDesignations] = useState<
    Designation[]
  >([]);
  const [personName, setPersonName] = useState("");

  const designations = meetings.map((meeting) => meeting.designations).flat();

  const getUpcomingDesignations = (person: number) =>
    designations.filter((designation) => designation.people.includes(person));

  const handlePersonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const person = event.target.value;
    const upcomingDesignations = getUpcomingDesignations(Number(person));

    setPerson(person);
    setPersonName(people.find(({ id }) => id === Number(person))?.name ?? "");
    setUpcomingDesignations(upcomingDesignations);
  };

  return (
    <div className="p-8">
      <div className="text-center py-32">
        <h1 className="title text-center mb-2">Jardim Esplanada</h1>
        <Dropdown value={person} onChange={handlePersonChange} />
      </div>

      <div className="mb-8">
        {person !== "default" && (
          <Upcoming designations={upcomingDesignations} person={personName} />
        )}
      </div>

      <div className="flex flex-col gap-8">
        {meetings?.map((meeting) => (
          <Meeting key={uuid()} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default Home;
