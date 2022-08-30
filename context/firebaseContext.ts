import React from "react";

import { MeetingDocument, PeopleDocument } from "../interfaces";

const FirebaseContext = React.createContext<{
  people: PeopleDocument[];
  meetings: MeetingDocument[];
}>({
  people: [],
  meetings: [],
});

export const FirebaseProvider = FirebaseContext.Provider;

export default FirebaseContext;
