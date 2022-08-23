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
import { MeetingDocument } from "../interfaces";

export default function useMeetings() {
  const [meetings, setMeetings] = useState<MeetingDocument[]>([]);

  useEffect(() => {
    async function fetchMeetings() {
      const twoMonthsFromNow = new Date(
        new Date().setMonth(new Date().getMonth() + 2)
      );

      const meetingsRef = collection(
        db,
        "meetings"
      ) as CollectionReference<MeetingDocument>;

      const meetingsQuery = query<MeetingDocument>(
        meetingsRef,
        where("date", "<=", twoMonthsFromNow),
        limit(40),
        orderBy("date", "asc")
      );

      const meetingsData: MeetingDocument[] = [];

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
