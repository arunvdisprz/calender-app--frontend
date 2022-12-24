import React from "react";
import "./inbuildcalender.scss";
import { useState } from "react";
import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";

function Inbuildcalender() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleSetToday = () => setCurrentDate(new Date());
  const value = currentDate;

  //date "March 15, 2021", startOfMonth() might return a new Date object representing "March 1, 2021".
  const startDate = startOfMonth(value);
  //date "March 15, 2021", endOfMonth() might return a new Date object representing "March 31, 2021".
  const endDate = endOfMonth(value);
  // date "March 15, 2021" and startDate is a Date object representing the date "March 1, 2021", differenceInDays() might return the number 14.
  const numDays = differenceInDays(endDate, startDate) + 1;

  //here you get value with 0-6 if 0 means sun and 6 mean sat that it
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => {
    setCurrentDate(sub(value, { months: +1 }));
  };
  const nextMonth = () => {
    setCurrentDate(add(value, { months: +1 }));
  };
  const prevYear = () => {
    setCurrentDate(sub(value, { years: 1 }));
  };
  const nextYear = () => {
    setCurrentDate(add(value, { years: 1 }));
  };

  const handleClickDate = (index) => {
    //Date object representing the date "March 15, 2021" and index is the number 10, setDate() might return a new Date object representing "March 10, 2021".
    const date = setDate(value, index);
    setCurrentDate(date);
  };

  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div>
      <div>
        <div>
          <p>
            <strong>Selected Date: </strong>
            {format(currentDate, "dd MMM  yyyy")}
          </p>
          <button onClick={handleSetToday}>Today</button>
        </div>
      </div>
      <div className="inbulidcalender">
        <div className="inbulidcalender--grid">
          <button
            onClick={() => prevYear()}
            className="inbulidcalender--grid--button"
          >
            {"<<"}
          </button>
          <button
            onClick={() => prevMonth()}
            className="inbulidcalender--grid--button"
          >
            {"<"}
          </button>
          <div className="inbulidcalender--grid--span3 inbulidcalender--grid--button">
          {format(currentDate, " MMM  yyyy")}
          </div>
          <button
            onClick={() => nextMonth()}
            className="inbulidcalender--grid--button"
          >
            {">"}
          </button>
          <button
            onClick={() => nextYear()}
            className="inbulidcalender--grid--button"
          >
            {">>"}
          </button>
          {weeks.map((week, index) => (
            <div key={index} className="inbulidcalender--grid--button">
              {week}
            </div>
          ))}
          {/* //The _ argument is a placeholder for the element itself, which is not used in the callback function.  */}
          {Array.from({ length: prefixDays }).map((_, index) => (
            <div key={index} className="inbulidcalender--grid--button" />
          ))}
          {Array.from({ length: numDays }).map((_, index) => (
            <div
              onClick={() => handleClickDate(index + 1)}
              className="inbulidcalender--grid--button"
            >
              {index + 1}
            </div>
          ))}
          {Array.from({ length: suffixDays }).map((_, index) => (
            <div key={index} className="inbulidcalender--grid--button" />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Inbuildcalender;
