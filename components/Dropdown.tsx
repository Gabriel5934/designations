import React from "react";
import { v4 } from "uuid";

import usePeople from "../hooks/usePeople";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface DropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Dropdown({
  value,
  onChange,
}: DropdownProps): JSX.Element {
  const [people] = usePeople();

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
      {people.map((person) => (
        <option key={v4()} value={person.id}>
          {capitalizeFirstLetter(person.name)}
        </option>
      ))}
    </select>
  );
}
