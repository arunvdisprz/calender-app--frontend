import React from "react";

export default function Appointmentlist() {
  return (
    <div>
      {appointmentvalue && (
        <div className="calenderbar--right">
          <div>
            <div className="calenderbar--right--calendertitle">
              Appointments
            </div>
            <div className="calenderbar--right--calender">
              <div className="calenderbar--right--calenderdate">
                <div>
                  <button
                    onClick={() => dateupdate(-1)}
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
                    onClick={() => dateupdate(+1)}
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
                      <div className="calenderbar--right--content">
                        <div className="calenderbar--right--time">
                          {con.starttime}:{con.endtime} :
                          {con.appointmentcontent}
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
                          icon={faTrash}
                          className="calenderbar--right--trash"
                          onClick={() => {
                            Postdelete(index);
                          }}
                        ></FontAwesomeIcon>
                      </div>
                      <hr></hr>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div></div>
            <div className="calenderbar--right--plusbar">
              <FontAwesomeIcon
                icon={faPlus}
                className="calenderbar--right--plusbaricon"
                onClick={() => setappointmentvalue(!appointmentvalue)}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
