import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import FirebaseContext from "../context/firebaseContext";
import FormContext from "../context/formContext";
import usePeople from "../hooks/usePeople";
import { PeopleDocument } from "../interfaces";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface DesignationProps {
  title: string;
  disabled: boolean;
  date: Date;
}

export default function Designation({
  title,
  disabled,
  date,
}: DesignationProps) {
  const { people } = useContext(FirebaseContext);
  const { formValue, setFormValue } = useContext(FormContext);

  const designationIndex = formValue.findIndex(
    ({ title: t, date: d }) => d === date && t === title
  );

  const designation = formValue[designationIndex];

  const [value, setValue] = useState(designation?.person || "default");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const person = e.target.value;

    if (designationIndex !== -1) {
      const newFormValue = formValue;

      newFormValue.splice(designationIndex, 1);

      setFormValue([
        ...newFormValue,
        {
          person,
          title,
          date,
        },
      ]);
    } else {
      setFormValue([...formValue, { person, title, date }]);
    }
  };

  useEffect(() => {
    setValue(
      formValue[
        formValue.findIndex(
          ({ title: t, date: d }) => d === date && t === title
        )
      ]?.person || "default"
    );
  }, [formValue]);

  return (
    <div className="flex justify-between">
      <span className="subtitle mr-4 w-1/3">{title}</span>
      <select
        title="person"
        className="select select-bordered select-sm grow max-w-xs"
        disabled={disabled}
        onChange={handleChange}
        value={value}
        defaultValue="default"
      >
        <option disabled value="default">
          Irmão
        </option>
        {Object.entries(people).map(([id, name]) => (
          <option key={v4()} value={id}>
            {capitalizeFirstLetter(name)}
          </option>
        ))}
      </select>
    </div>
  );
}
