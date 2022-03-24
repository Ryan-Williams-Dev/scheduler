import React, {useState, useEffect} from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState((prev) => ({...prev, days}))
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      // console.log(all) 
      const [days, appointments, interviewers] = all;
      setState((prev) => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    })
  },[])
  
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  


  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => (
            <Appointment
              key={appointment.id}
              {...appointment}
            />
          )
        ) }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
