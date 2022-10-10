import React, { useContext } from "react";
import { v4 } from "uuid";

import FirebaseContext from "../context/firebaseContext";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface DropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
  value,
  onChange,
}: DropdownProps): JSX.Element {
  const { people } = useContext(FirebaseContext);

  return (
    <select
      title="nome"
      className="select w-full max-w-xs bg-secondary-default text-white cursor-pointer"
      value={value}
      onChange={onChange}
    >
      <option disabled selected value="default">
        Quem é você?
      </option>
      {Object.entries(people).map(([key, value]) => (
        <option key={v4()} value={key}>
          {capitalizeFirstLetter(value)}
        </option>
      ))}
    </select>
  );
}
