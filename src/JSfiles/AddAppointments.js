import React, { useEffect } from "react";
import calender from "../pictures/calender.png";
import "../SCSSfiles/calenderbar.scss";
import { useState } from "react";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-select-date";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

function AddAppointments() {
  const [datevalue, setdatevalue] = useState(0);
  const [appointmentvalue, setappointmentvalue] = useState(true);

  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + datevalue);

  const currenttime = Moment(today).format("HH.mm");
  const currentdate = Moment(tomorrow).format("L");
  const tomorrowdate = Moment(today).format("L");

  return (
    <div>
      <div className="calenderbar--right">
        <div>
          <div className="calenderbar--right--calendertitle">
            Add Appointment
          </div>
          <div className="calenderbar--right--calender">
            <div className="calenderbar--right--calenderdate"></div>
            <div className="calenderbar--right--contentblock">
              <div></div>
            </div>
          </div>
          <div className="calenderbar--right--plusbar">
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAppointments;
