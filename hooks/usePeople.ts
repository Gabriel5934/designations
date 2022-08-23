import {
  collection,
  CollectionReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import { PeopleDocument } from "../interfaces";

export default function usePeople() {
  const [people, setPeople] = useState<PeopleDocument[]>([]);

  useEffect(() => {
    async function fetchPeople() {
      const peopleRef = collection(
        db,
        "people"
      ) as CollectionReference<PeopleDocument>;

      const peopleQuery = query<PeopleDocument>(peopleRef);

      const peopleData: PeopleDocument[] = [];

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
