import {useEffect, useState} from 'react'
//import './App.css'
import Calendar from "./components/calender/Calendar.tsx";
import type {Vozilo} from "./types.ts";
import {CrudFactory} from "./services/data/CrudService.ts";
import VoziloDetails from "./components/models/vozilo/VoziloDetails.tsx";
import {MonthInfo} from "./services/VoznjaService.ts";
import DayOverview from "./components/calender/DayOverview.tsx";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function App() {
  const [selected, setSelected] = useState<Date>(new Date());

  const [vozila, setVozila] = useState<Vozilo[]>([])
  const [monthInfo, setMonthInfo] = useState<MonthInfo>(new MonthInfo(new Date(), []));

  const navigate = useNavigate();

  const VoziloCrud = CrudFactory.GetVoziloService();

  useEffect(() => {
    const load = async () => {
      const result = await VoziloCrud.GetAll();
      setVozila(result);
    }
    load()
  })

  const onDatePress = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    navigate(`/dispecer/day/${formatted}`)
  }

  return (
    <>
      <div className="container mt-5">
        <Calendar
          selectedDay = {selected}
          onDatePress = {onDatePress}
          onMonthLoaded = {(monthInfo) => setMonthInfo(monthInfo)}
        />
      </div>
      <div className="container mt-5" style={{maxWidth: "800px"}}>
        <DayOverview voznje={monthInfo.GetVoznjeInDay(selected)}/>
      </div>
      <div className="container mt-5" style={{maxWidth: "800px"}}>
        <h2 className="text-center">Vozila:</h2>
        <ul className="list-unstyled">
          {vozila.map((vozilo) => (
            <li key={vozilo.redni_broj}>
              <VoziloDetails vozilo={vozilo}/>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
