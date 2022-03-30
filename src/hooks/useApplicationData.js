import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { 
          ...state,
          day: action.day
        }
      case SET_APPLICATION_DATA:
        return {
            ...state,
            days: action.days,
            appointments: action.appointments,
            interviewers: action.interviewers
          }
      case SET_INTERVIEW: {
        return {
          ...state,
          appointments: action.appointments,
          days: action.days
        }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, day });
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        appointments, 
        days: updateSpots(state, appointments, id),
        id
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
      dispatch({
        type: SET_INTERVIEW,
        appointments, 
        days: updateSpots(state, appointments, id),
        id
      });
      return res;
    })
    .catch(err => {
      console.log("app catch block: ", err)
      throw err;
    });
  }

  const updateSpots = function(state, appointments, id) {  
    const changedDay = state.days.filter(day => day.appointments.includes(id))[0]
    
    const changedDaysSpots = Object.values(appointments).filter(appointment => !appointment.interview)
      .filter(nulledAppointment => changedDay.appointments.includes(nulledAppointment.id)).length
    
    return state.days.map((day) => {
      return day.id === changedDay.id ? 
      {...changedDay, spots: changedDaysSpots} :
      { ...day };
    });
  };
  
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      const [days, appointments, interviewers] = all;
      dispatch(
        {
          type: SET_APPLICATION_DATA,
          days: days.data, 
          appointments: appointments.data, 
          interviewers: interviewers.data 
        }
      )
    })
  },[])
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}