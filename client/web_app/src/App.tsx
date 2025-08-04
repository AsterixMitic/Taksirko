import Calendar from "./components/calender/Calendar.tsx";
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function App() {
  const selected = new Date();

  const navigate = useNavigate();


  const onDatePress = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    navigate(`/dispecer/day/${formatted}`)
  }

  return (
    <>
      <div className="container mt-2 mb-2">
        <Calendar
          selectedDay = {selected}
          onDatePress = {onDatePress}
          onMonthLoaded = {() => {}}
        />
      </div>

    </>
  )
}

export default App
