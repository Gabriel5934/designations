import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../firebase";
import { DesignationDocument } from "../interfaces";

export default function useDesignations() {
  const [designations, setDesignations] = useState<
    DesignationDocument["designations"]
  >([]);

  useEffect(() => {
    async function fetchDesignations() {
      const meetingsRef = collection(
        db,
        "designations"
      ) as CollectionReference<DesignationDocument>;

      const meetingsQuery = query<DesignationDocument>(
        meetingsRef,
        where("__name__", "==", "esplanada")
      );

      const meetingsData: DesignationDocument[] = [];

      const meetingsSnapshot = await getDocs(meetingsQuery);

      meetingsSnapshot.forEach((meeting) => {
        meetingsData.push(meeting.data());
      });

      setDesignations(meetingsData[0].designations);
    }

    fetchDesignations();
  }, []);

  return [designations];
}
