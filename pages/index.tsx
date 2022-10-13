import dayjs from "dayjs";
import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import Dropdown from "../components/Dropdown";
import Meeting from "../components/Meeting";
import Upcoming from "../components/Upcoming";
import FirebaseContext from "../context/firebaseContext";
import { Designation } from "../interfaces";

interface SelectedPerson {
  id: number;
  name: string;
  upcomingDesignations: Designation[];
}

const Home: NextPage = () => {
  const { people } = useContext(FirebaseContext);

  const [selectedPerson, setSelectedPerson] = useState<string>();

  const getMeetings = () => {
    const [wednesday, saturday] = [3, 6];

    let d = dayjs(),
      month = d.month(),
      meetings: Date[] = [];

    while (![wednesday, saturday].includes(d.day())) {
      d = d.add(1, "day");
    }

    while (d.month() === month || d.month() === month + 1) {
      meetings.push(d.toDate());

      if (d.day() === saturday) {
        d = d.add(4, "day");
      } else {
        d = d.add(3, "day");
      }
    }

    return meetings;
  };

  const meetingDates = getMeetings();

  const handlePersonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const personId = event.target.value;

    localStorage.setItem("personId", personId);
    setSelectedPerson(personId);
  };

  useEffect(() => {
    const storedPerson = localStorage.getItem("personId");
    storedPerson && setSelectedPerson(storedPerson);
  }, [people]);

  return (
    <div className="p-8">
      <div className="text-center py-32">
        <h1 className="title text-center mb-2">Jardim Esplanada</h1>
        <Dropdown
          value={selectedPerson ?? "default"}
          onChange={handlePersonChange}
        />
      </div>

      <div className="mb-8">
        {selectedPerson && <Upcoming personId={selectedPerson} />}
      </div>

      <div className="flex flex-col gap-8">
        {meetingDates.map((date) => (
          <Meeting key={v4()} date={date} />
        ))}
      </div>
    </div>
  );
};

export default Home;
