import dayjs from "dayjs";
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
import { MonthDocument } from "../interfaces";

export default function useMonths() {
  const [months, setMonths] = useState<MonthDocument[]>([]);

  useEffect(() => {
    async function fetchMonths() {
      const range = [
        dayjs().subtract(6, "month").startOf("month").toDate(),
        dayjs().add(6, "month").endOf("month").toDate(),
      ];

      const monthsRef = collection(
        db,
        "months"
      ) as CollectionReference<MonthDocument>;

      const monthsQuery = query<MonthDocument>(
        monthsRef,
        where("dayOne", ">=", range[0]),
        where("dayOne", "<=", range[1]),
        limit(40),
        orderBy("dayOne", "asc")
      );

      const monthsData: MonthDocument[] = [];

      const monthsSnapshot = await getDocs(monthsQuery);

      monthsSnapshot.forEach((month) => {
        monthsData.push(month.data());
      });

      setMonths(monthsData);
    }

    fetchMonths();
  }, []);

  return [months];
}
