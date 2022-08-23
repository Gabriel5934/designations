import type { NextPage } from "next";
import { uuid } from "uuidv4";

import Meeting from "../components/Meeting";
import useMeetings from "../hooks/useMeetings";

const Home: NextPage = () => {
  const [meetings] = useMeetings();

  return (
    <div className="p-8">
      <div className="text-center py-32">
        <h1 className="title text-center mb-2">Jardim Esplanada</h1>
      </div>
      <div className="flex flex-col gap-8">
        {meetings?.map((meeting) => (
          <Meeting key={uuid()} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default Home;
