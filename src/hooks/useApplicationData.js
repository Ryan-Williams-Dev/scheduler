import { useEffect, useReducer } from "react";
import axios from "axios";

import { ACTIONS, reducer } from "reducers/appDataReducer";

export default function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
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
          type: ACTIONS.SET_APPLICATION_DATA,
          days: days.data, 
          appointments: appointments.data, 
          interviewers: interviewers.data 
        }
      )
    })
  },[])

  const setDay = day => dispatch({ type: ACTIONS.SET_DAY, day });
  
  const bookInterview = function(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({
        type: ACTIONS.SET_INTERVIEW,
        id,
        interview
      })
    })
    .catch(err => {
      console.log(err)
      throw err;
    })
  }
  
  const cancelInterview = function(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_INTERVIEW,
        id,
        interview: null
      });
    })
    .catch(err => {
      console.log("app catch block: ", err)
      throw err;
    });
  }
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}