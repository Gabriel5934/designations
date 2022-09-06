import React from "react";

import { MeetingDocument, MonthDocument, PeopleDocument } from "../interfaces";

const FirebaseContext = React.createContext<{
  people: PeopleDocument[];
  meetings: MeetingDocument[];
  months: MonthDocument[];
}>({
  people: [],
  meetings: [],
  months: [],
});

export const FirebaseProvider = FirebaseContext.Provider;

export default FirebaseContext;
