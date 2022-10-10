import React from "react";

import {
  DesignationDocument,
  MeetingDocument,
  MonthDocument,
  PeopleDocument,
} from "../interfaces";

const FirebaseContext = React.createContext<{
  people: PeopleDocument;
  designations: DesignationDocument["designations"];
}>({
  people: {},
  designations: [],
});

export const FirebaseProvider = FirebaseContext.Provider;

export default FirebaseContext;
