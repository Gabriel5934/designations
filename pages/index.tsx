import type { NextPage } from "next";
import { useEffect, useState } from "react";
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

interface SelectedPerson {
  id: number;
  name: string;
  upcomingDesignations: Designation[];
}

const Home: NextPage = () => {
  const [meetings] = useMeetings();
  const [people] = usePeople();

  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson>();

  const designations = meetings.map((meeting) => meeting.designations).flat();

  const updateSelectedPerson = (personId: number) => {
    const person = people.find((person) => person.id === personId);

    if (person) {
      setSelectedPerson({
        id: person.id,
        name: person.name,
        upcomingDesignations: designations.filter((designation) =>
          designation.people.includes(personId)
        ),
      });

      localStorage.setItem("personId", person.id.toString());
    }
  };

  const handlePersonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSelectedPerson(+event.target.value);
  };

  useEffect(() => {
    const storedPerson = localStorage.getItem("personId");
    storedPerson && updateSelectedPerson(+storedPerson);
  }, [people]);

  return (
    <div className="p-8">
      <div className="text-center py-32">
        <h1 className="title text-center mb-2">Jardim Esplanada</h1>
        <Dropdown
          value={selectedPerson?.id.toString() ?? "default"}
          onChange={handlePersonChange}
        />
      </div>

      <div className="mb-8">
        {selectedPerson && (
          <Upcoming
            designations={selectedPerson.upcomingDesignations}
            person={selectedPerson.name}
          />
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
