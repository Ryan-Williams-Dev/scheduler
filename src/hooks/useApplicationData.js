import { useEffect, useReducer } from "react";
import axios from "axios";

import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer } from "reducers/appDataReducer";

const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

export default function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  

  // Initial state population from database query
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

  const setDay = day => dispatch({ type: SET_DAY, day });
  
  const bookInterview = function(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      })
    })
    .catch(err => {
      throw err;
    })
  }
  
  const cancelInterview = function(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null
      });
    })
    .catch(err => {
      throw err;
    });
  }

  socket.onmessage = (event => {
    const data = JSON.parse(event.data);
    if (data === 'pong') return;

    dispatch({
      type: data.type,
      id: data.id,
      interview: data.interview
    })
  })
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}