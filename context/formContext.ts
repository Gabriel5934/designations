import React from "react";

import { DesignationDocument, FormField } from "../interfaces";

const FormContext = React.createContext<{
  formValue: FormField[];
  setFormValue: React.Dispatch<React.SetStateAction<FormField[]>>;
}>({
  formValue: [],
  setFormValue: () => {},
});

export const FormProvider = FormContext.Provider;

export default FormContext;
