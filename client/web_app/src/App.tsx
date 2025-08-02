import {useEffect, useState} from 'react'
//import './App.css'
import Calendar from "./components/calender/Calendar.tsx";
import type {Vozilo} from "./types.ts";
import {CrudFactory} from "./services/data/CrudService.ts";
import VoziloDetails from "./components/models/vozilo/VoziloDetails.tsx";

function App() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  const [vozila, setVozila] = useState<Vozilo[]>([])

  const VoziloCrud = CrudFactory.GetVoziloService();

  useEffect(() => {
    const load = async () => {
      const result = await VoziloCrud.GetAll();
      setVozila(result);
    }
    load()
  })

  return (
    <>
      <div className="container mt-5">
        <Calendar
          selectedDay = {selected}
          onDatePress = {(date) => setSelected(date)}
        />
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
