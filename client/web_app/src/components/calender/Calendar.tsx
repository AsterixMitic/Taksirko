import React, {useEffect, useState} from "react";
import { addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, format } from "date-fns";
import { srLatn } from 'date-fns/locale';
import DayPreview from "./DayPreview.tsx";
import VoznjaService, {MonthInfo} from "../../services/VoznjaService.ts";
import type {Voznja} from "../../types.ts";
import LoadingSpinner from "../common/Loading.tsx";

interface CalendarProps {
  selectedDay?: Date;
  onDatePress: (date: Date) => void;
  onMonthLoaded: (monthInfo: MonthInfo) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDay, onDatePress, onMonthLoaded }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthInfo, setMonthInfo] = useState<MonthInfo | null>(null)

  const nextMonth = () => setMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setMonth(subMonths(currentMonth, 1));

  const setMonth = async (month: Date) => {
    setCurrentMonth(month);
    setMonthInfo(null);
    try {
      await load();
    }
    catch (err) {
      setMonthInfo(new MonthInfo(currentMonth, []));
      console.error(err);
    }
  }

  const load = async () => {
    const voznjas = await VoznjaService.GetVoznjeInMonth(currentMonth);
    const monthInfo = new MonthInfo(currentMonth, voznjas);
    onMonthLoaded(monthInfo);
    setMonthInfo(monthInfo);
  }

  useEffect(() => {
    load();
  })

  const getVoznjeInDay = (day: Date): Voznja[] => {
    return monthInfo?.GetVoznjeInDay(day) ?? [];
  }

  const renderHeader = () => (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <button className="btn btn-outline-secondary btn-sm" onClick={prevMonth}>←</button>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <h5 className="mb-0">{format(currentMonth, "MMMM yyyy", {locale: srLatn})}</h5>
        {monthInfo === null && (
          <LoadingSpinner/>
        )}
      </div>
      <button className="btn btn-outline-secondary btn-sm" onClick={nextMonth}>→</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE"; // Short weekday name
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="col text-center fw-bold">
          {format(addDays(startDate, i), dateFormat, {locale: srLatn})}
        </div>
      );
    }

    return <div className="row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDay && isSameDay(day, selectedDay);

        days.push(
          <div key={day.toString()} className="col p-1">
            <button
              disabled={!isCurrentMonth}
              className={`btn w-100 ${isSelected ? "btn-primary" : isCurrentMonth ? "btn-outline-light" : "btn-outline-primary"}`}
              style={{minHeight: "90px"}}
              onClick={() => onDatePress(currentDay)}
            >
              <DayPreview date={currentDay} voznje={getVoznjeInDay(currentDay)}/>
            </button>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row row-cols-7 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <>{rows}</>;
  };

  return (
    <div className="container card border p-3 rounded shadow-sm" style={{maxWidth: "1000px"}}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
