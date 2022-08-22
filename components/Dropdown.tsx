import React from "react";

export default function Dropdown(): JSX.Element {
  return (
    <select
      title="nome"
      className="select w-full max-w-xs bg-secondary-default text-white cursor-pointer"
    >
      <option disabled selected value="default">
        Quem é você?
      </option>
      <option>Fulano</option>
      <option>Ciclano</option>
      <option>Beltrano</option>
    </select>
  );
}
