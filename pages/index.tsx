import type { NextPage } from "next";
import { uuid } from "uuidv4";

import Meeting from "../components/Meeting";

const dummyData = [
  {
    date: new Date(),
    mechanical: [
      { title: "Microfone", people: ["Fulano"] },
      { title: "Pedestal", people: ["Fulano"] },
      { title: "Indicadores", people: ["Fulano", "Ciclano"] },
      { title: "Som", people: ["Fulano"] },
      { title: "Vídeo", people: ["Fulano"] },
    ],
    stage: [
      {
        title: "Leitor da Sentinela",
        people: ["Fulano"],
      },
    ],
  },
];

const Home: NextPage = () => {
  return (
    <div className="p-8">
      <div className="text-center py-32">
        <h1 className="title text-center mb-2">Jardim Esplanada</h1>
      </div>
      {dummyData.map((meeting) => (
        <Meeting key={uuid()} meeting={meeting} />
      ))}
    </div>
  );
};

export default Home;
