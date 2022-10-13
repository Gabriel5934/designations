import React from "react";

import {
  DesignationDocument,
  PeopleDocument,
  TitlesDocument,
} from "../interfaces";

const FirebaseContext = React.createContext<{
  people: PeopleDocument;
  titles: TitlesDocument;
  designations: DesignationDocument["designations"];
}>({
  people: {},
  titles: {},
  designations: [],
});

export const FirebaseProvider = FirebaseContext.Provider;

export default FirebaseContext;
