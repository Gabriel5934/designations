import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import { TitlesDocument } from "../interfaces";

export default function useTitles() {
  const [titles, setTitles] = useState<TitlesDocument>({});

  useEffect(() => {
    async function fetchTitles() {
      const titlesRef = collection(
        db,
        "titles"
      ) as CollectionReference<TitlesDocument>;

      const titlesQuery = query<TitlesDocument>(titlesRef, limit(100));

      const titlesData: TitlesDocument = {};

      const titlesSnapshot = await getDocs(titlesQuery);

      titlesSnapshot.forEach((title) => {
        titlesData[title.id] = title.data().name;
      });

      setTitles(titlesData);
    }

    fetchTitles();
  }, []);

  return [titles];
}
