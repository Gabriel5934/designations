import { v4 } from "uuid";

import usePeople from "../hooks/usePeople";
import { PeopleDocument } from "../interfaces";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

interface DesignationProps {
  title: string;
  people: PeopleDocument;
  disabled: boolean;
}

export default function Designation({
  title,
  people,
  disabled,
}: DesignationProps) {
  return (
    <div className="flex justify-between">
      <span className="subtitle mr-4 w-1/3">{title}</span>
      <select
        title="person"
        className="select select-bordered select-sm grow max-w-xs"
        disabled={disabled}
      >
        <option disabled selected>
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
