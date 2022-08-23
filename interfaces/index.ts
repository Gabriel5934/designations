export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
  toDate: () => Date;
}

export interface Designation {
  title: string;
  people: number[];
  date: TimeStamp;
}

export interface Meeting {
  date: TimeStamp;
  designations: Designation[];
}

export interface MeetingDocument {
  date: TimeStamp;
  designations: Designation[];
}

export interface PeopleDocument {
  id: number;
  name: string;
}
