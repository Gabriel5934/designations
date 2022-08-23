import {
  collection,
  CollectionReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../firebase";

interface Person {
  id: number;
  name: string;
}

export default function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    async function fetchPeople() {
      const peopleRef = collection(db, "people") as CollectionReference<Person>;

      const peopleQuery = query<Person>(peopleRef);

      const peopleData: Person[] = [];

      const peopleSnapshot = await getDocs(peopleQuery);

      peopleSnapshot.forEach((person) => {
        peopleData.push(person.data());
      });

      setPeople(peopleData);
    }

    fetchPeople();
  }, []);

  return [people];
}
