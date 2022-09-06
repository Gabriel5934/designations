import { Timestamp } from "firebase/firestore";

const TimestampInstance = new Timestamp(0, 0);

type TimestampType = typeof TimestampInstance;

export interface Designation {
  title: string;
  people: number[];
  date: TimestampType;
}

export interface Meeting {
  date: TimestampType;
  designations: Designation[];
}

export interface MeetingDocument {
  date: TimestampType;
  designations: Designation[];
}

export interface PeopleDocument {
  id: number;
  name: string;
}

export interface MonthDocument {
  firstDay: TimestampType;
  designations: Designation[];
}
