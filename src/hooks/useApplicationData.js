import { useState ,useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview: interview})
    .then(() => {
      setState({
      ...state,
      appointments,
      days: updateSpots(state, appointments, id)
      })
    })
    .catch(err => {
      console.log(err)
      throw err;
    })
  }
  
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]:appointment
    }
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, appointments, id)
      });
      return res;
    })
    .catch(err => {
      console.log("app catch block: ", err)
      throw err;
    });
  }

  const updateSpots = function(state, appointments, id) {  
    const changedDay = state.days.filter(item => item.appointments.includes(id))[0]
    
    const changedDaysSpots = Object.values(appointments).filter(item => !item.interview)
      .filter(item => changedDay.appointments.includes(item.id)).length
    
    return state.days.map((day) => {
      return day.id === changedDay.id ? {...changedDay, spots: changedDaysSpots} : { ...day };
    });
  };
  
  
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
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  }
}