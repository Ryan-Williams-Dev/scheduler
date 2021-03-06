export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW"

// Reducer function for updated state, dispatch to here with the appropriate variable from above to update state
export function reducer(state, action) {
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
      const newState = {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview
          }
        }
      };
      return {
        ...newState,
        days: state.days.map(day => ({
          ...day,
          spots:updateSpots(newState, day.id)
        }))
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

// Takes in updated state and the current days ID to calculate the spots remaining for that day
const updateSpots = function (state, id) {
  const currDay = state.days.find(day => day.id === id);
  const newSpots = currDay.appointments.reduce((a, b) => {
    return state.appointments[b].interview ? a : a + 1;
  }, 0);
  return newSpots;
}