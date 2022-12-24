import React, { useEffect } from "react";
import calender from "../pictures/calender.png";
import "../SCSSfiles/calenderbar.scss";
import Calendar from "react-select-date";
import { useState } from "react";
import Moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlus,
  faTrash,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuid } from "uuid";

function Calenderbar() {
  const [nameupload, setnameupload] = useState();

  const [name, setname] = useState();

  const [data, setdata] = useState([]); //! HERE WE GET A DATA FROM A API
  const [datevalue, setdatevalue] = useState(0);

  const [appointmentvalue, setappointmentvalue] = useState(true);
  const today = new Date();
  let tomorrow = new Date().setDate(new Date().getDate() + datevalue);
  const date = new Date();

  const currenttime = Moment(today).format("HH.mm");
  const currentdate = Moment(tomorrow).format("L");
  const tomorrowdate = Moment(today).format("L");

  const [date1, setdate1] = useState(today);
  const [starttime, setstarttime] = useState("");
  const [endtime, setendtime] = useState("");
  const [appointmentcontent, setappointmentcontent] = useState("");

  const url = "http://localhost:5164/Appointmentlist";

  const [valueforpatch, setvalueforpatch] = useState(false); //! IF the variable turns true , update component will display
  const [patchid, setpatchid] = useState(); //! Declare a varible that can store current index id
  const [patchstarttime, setpatchstarttime] = useState();
  const [patchendtime, setpatchendtime] = useState();
  const [patchcontent, setpatchcontent] = useState();

  useEffect(() => {
    setname(localStorage.getItem("Feed"));
  }, []);

  const Setnameforapp = () => {
    localStorage.setItem("Feed", nameupload);
    setname(localStorage.getItem("Feed"));
  };

  const dateupdate = (value) => {
    setdatevalue(datevalue + value);
    Postget(value);
  };

  useEffect(() => {
    fetch(url + "/" + Moment(today).format("Do MMM  YYYY"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setdata(res);
      });
  }, []);

  const Postget = async (value) => {
    await fetch(
      url +
        "/" +
        Moment(
          new Date().setDate(new Date().getDate() + datevalue + value)
        ).format("Do MMM  YYYY"),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setdata(res);
        console.log(
          Moment(
            new Date().setDate(new Date().getDate() + datevalue + value)
          ).format("Do MMM  YYYY"),
          res
        );
      });
  };

  const Postpost = async () => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        id: uuid().slice(0, 10),
        date: Moment(date1).format("Do MMM  YYYY"),
        Appointmentdate: Moment(tomorrow).format("Do MMM  YYYY"),
        starttime: starttime,
        endtime: endtime,
        appointmentcontent: appointmentcontent,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return res.status;
        }
      })
      .then((res) => {
        res == 409 ? console.log(res) : setdata(res);
      });

    setappointmentvalue(!appointmentvalue);
  };

  const Postpatch = (Addid) => {
    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Addid,
        Appointmentdate: Moment(tomorrow).format("Do MMM  YYYY"),
        starttime: patchstarttime,
        endtime: patchendtime,
        appointmentcontent: patchcontent,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return res.status;
        }
      })
      .then((res) => {
        res === 409 ? console.log(res) : setdata(res);
      });
  };

  const Postdelete = async (uid) => {
    await fetch(url + "/" + uid, {
      method: "DELETE",
      headers: {
        authToken: "token",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setdata(res);
        console.log(res);
      });
  };

  return (
    <div className="calenderbar">
      <div className="calenderbar--left">
        <img src={calender}></img>
        {new Date(2022, 12 + 2, 0).getFullYear()}
        <div>
          <div>welcome to simplcalender</div>
          <div>please enter your name:</div>
          <input
            type="text"
            onChange={(e) => setnameupload(e.target.value)}
          ></input>
          <button onClick={() => Setnameforapp()}>Submit</button>
        </div>
      </div>

      {appointmentvalue && (
        <div className="calenderbar--right">
          <div className="calenderbar--right--calendertitle">
            {name}'s appointments
          </div>
          <div className="calenderbar--right--calender">
            <div className="calenderbar--right--calenderdate">
              <div>
                <button
                  onClick={() => dateupdate(-1)} //!IT will decrease the date
                  className="calenderbar--right--chevron"
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="calenderbar--right--chevronicon"
                  />
                </button>
              </div>
              <div>{Moment(tomorrow).format("Do MMM  YYYY")}</div>
              <div>
                <button
                  onClick={() => dateupdate(+1)} //!IT will increase the date
                  className="calenderbar--right--chevron"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="calenderbar--right--chevronicon"
                  />
                </button>
              </div>
            </div>
            <div className="calenderbar--right--contentblock">
              <div>
                {data.map((con, index) => (
                  <div key={index}>
                    <div className="calenderbar--right--timecontent">
                      <div className="calenderbar--right--time">
                        <div >
                          {con.starttime}-{con.endtime}
                        </div>
                        <span>:{con.appointmentcontent}</span>
                      </div>
                      <div
                        className={
                          tomorrowdate > currentdate
                            ? "calenderbar--right--statusdone"
                            : tomorrowdate < currentdate
                            ? "calenderbar--right--statusnot"
                            : con.time > currenttime
                            ? "calenderbar--right--statusnot"
                            : "calenderbar--right--statusdone"
                        }
                      >
                        {tomorrowdate > currentdate
                          ? "completed"
                          : tomorrowdate < currentdate
                          ? "Upcoming"
                          : con.time > currenttime
                          ? "Upcoming"
                          : "Completed"}
                      </div>

                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="calenderbar--right--trash"
                        onClick={() => {
                          setvalueforpatch(!valueforpatch);
                          setpatchid(con.id); //!set up patchid
                        }}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="calenderbar--right--trash"
                        onClick={() => {
                          Postdelete(con.id);
                        }}
                      ></FontAwesomeIcon>
                    </div>
                    {patchid === con.id &&
                      valueforpatch && ( //!it will display only where you click in the index
                        <div className="calenderbar--right--contentblock">
                          <input
                            placeholder="starttime"
                            type="time"
                            onChange={(e) => {
                              setpatchstarttime(e.target.value);
                            }}
                          ></input>
                          <input
                            placeholder="endtime"
                            type="time"
                            onChange={(e) => {
                              setpatchendtime(e.target.value);
                            }}
                          ></input>
                          <input
                            placeholder="update appointment"
                            type="text"
                            onChange={(e) => {
                              setpatchcontent(e.target.value);
                            }}
                          ></input>
                          <button
                            onClick={() => {
                              Postpatch(con.id);
                              setvalueforpatch(!valueforpatch);
                            }}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    <hr></hr>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="calenderbar--right--plusbar">
            <FontAwesomeIcon
              icon={faPlus}
              className="calenderbar--right--plusbaricon"
              onClick={() => setappointmentvalue(!appointmentvalue)}
            >
              {" "}
              Add Appointment
            </FontAwesomeIcon>
          </div>
        </div>
      )}
      {!appointmentvalue && (
        <div>
          <div className="calenderbar--right">
            <div>
              <div className="calenderbar--right--calendertitle">
                Add Appointment
              </div>
              <Calendar onSelect={(date) => setdate1(date)} />
              <div className="calenderbar--right--appointmentblock">
                <div className="calenderbar--right--appcalender">
                  
                </div>
                <div className="calenderbar--right--apptime">
                  <div>
                    Start time :{" "}
                    <input
                      type="time"
                      onChange={(e) => setstarttime(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    End time :{" "}
                    <input
                      type="time"
                      onChange={(e) => setendtime(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="calenderbar--right--apptheme">
                  Appointment :
                  <TextareaAutosize
                    minRows={1}
                    maxRows={3}
                    className="calenderbar--right--appthemeinput"
                    placeholder="Add Appointments here..."
                    onChange={(e) => setappointmentcontent(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="calenderbar--right--plusbar">
                  <button
                    onClick={() => setappointmentvalue(!appointmentvalue)}
                    className="NavBar23"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      Postpost();
                    }}
                    className="NavBar23"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calenderbar;
