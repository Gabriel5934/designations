import {
  collection,
  CollectionReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../firebase";

interface TimeStamp {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
}

interface Designation {
  title: string;
  people: string[];
  date: TimeStamp;
}

interface Meeting {
  date: TimeStamp;
  designations: Designation[];
}

export default function useMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    async function fetchMeetings() {
      const twoMonthsFromNow = new Date(
        new Date().setMonth(new Date().getMonth() + 2)
      );

      const meetingsRef = collection(
        db,
        "meetings"
      ) as CollectionReference<Meeting>;

      const meetingsQuery = query<Meeting>(
        meetingsRef,
        where("date", "<=", twoMonthsFromNow)
      );

      const meetingsData: Meeting[] = [];

      const meetingsSnapshot = await getDocs(meetingsQuery);

      meetingsSnapshot.forEach((meeting) => {
        meetingsData.push(meeting.data());
      });

      setMeetings(meetingsData);
    }

    fetchMeetings();
  }, []);

  return [meetings];
}
