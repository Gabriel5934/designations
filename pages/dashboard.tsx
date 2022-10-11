import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import MeetingForm from "../components/MeetingForm";
import FirebaseContext from "../context/firebaseContext";
import { FormProvider } from "../context/formContext";
import { auth } from "../firebase";
import { DesignationDocument, FormField } from "../interfaces";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import shuffleArray from "../utils/shuffleArray";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const { people } = useContext(FirebaseContext);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [meetings, setMeetings] = useState<Date[]>([]);

  const [creating, setCreating] = useState(false);

  const [formValue, setFormValue] = useState<FormField[]>([]);

  const currentMonth = capitalizeFirstLetter(currentDate.format("MMMM"));

  const toggleCreating = () => setCreating((prev) => !prev);

  const getMeetings = () => {
    const [wednesday, saturday] = [3, 6];

    let d = currentDate.startOf("month"),
      month = d.month(),
      meetings: Date[] = [];

    while (![wednesday, saturday].includes(d.day())) {
      d = d.add(1, "day");
    }

    while (d.month() === month) {
      meetings.push(d.toDate());

      if (d.day() === saturday) {
        d = d.add(4, "day");
      } else {
        d = d.add(3, "day");
      }
    }

    setMeetings(meetings);
  };

  const handleMonthChange = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentDate(currentDate.add(1, "month"));
    } else {
      setCurrentDate(currentDate.subtract(1, "month"));
    }
  };

  const titles = [
    "microfone",
    "video",
    "som",
    "indicador 1",
    "indicador 2",
    "pedestal",
  ];

  const handleRandomize = () => {
    const shuffledPeople = shuffleArray(Object.keys(people));
    let aux = 0;

    setFormValue(
      Array.from({ length: meetings.length }, (_, i) => {
        return Array.from(
          {
            length: titles.length,
          },
          (_, j) => {
            aux > shuffledPeople.length - 1 && (aux = 0);

            const designation = {
              person: shuffledPeople[aux],
              date: meetings[i],
              title: titles[j],
            };

            aux++;

            return designation;
          }
        );
      }).flat()
    );
  };

  const backToToday = () => {
    setCurrentDate(dayjs());
  };

  useEffect(() => {
    !auth.currentUser && router.push("/");
  });

  useEffect(() => {
    getMeetings();
  }, [currentDate]);

  return true ? (
    <FormProvider
      value={{
        formValue,
        setFormValue,
      }}
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <span className="subtitle">{currentDate.format("YYYY")}</span>
          <div className="mb-8 justify-center flex gap-8">
            <button
              type="button"
              title="mês anterior"
              onClick={() => handleMonthChange("previous")}
            >
              <ChevronLeftIcon className="w-8" />
            </button>
            <span className="title text-white">{currentMonth}</span>
            <button
              type="button"
              title="próximo mês"
              onClick={() => handleMonthChange("next")}
            >
              <ChevronRightIcon className="w-8" />
            </button>
          </div>
          <button
            type="button"
            title="voltar para hoje"
            onClick={backToToday}
            className="btn"
          >
            Hoje
          </button>
        </div>
        <div className="bg-surface mb-16 flex justify-center p-8 mx-[-32px] gap-8">
          {creating ? (
            <>
              <button
                type="button"
                title="randomizar"
                onClick={handleRandomize}
                className="btn"
              >
                Randomizar
              </button>
              <button
                type="button"
                title="salvar"
                onClick={toggleCreating}
                className="btn"
              >
                Salvar
              </button>
              <button
                type="button"
                title="cancelar"
                onClick={toggleCreating}
                className="btn"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              title="alternar criação de reunião"
              onClick={toggleCreating}
              className="btn"
            >
              Criar mês de {currentMonth}
            </button>
          )}
        </div>
        <div
          className={classNames("flex flex-col gap-4", {
            "brightness-[.2]": !creating,
          })}
        >
          {meetings.map((date) => (
            <MeetingForm key={v4()} date={date} disabled={!creating} />
          ))}
        </div>
      </div>
    </FormProvider>
  ) : (
    <div>Loading...</div>
  );
};

export default Dashboard;
