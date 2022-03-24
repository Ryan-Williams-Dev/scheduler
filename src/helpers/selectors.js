export function getAppointmentsForDay(state, day) {
  const [currDay] = state.days.filter(item => item.name === day)
  return !currDay ? [] :
  Object.values(state.appointments).filter(item => currDay.appointments.includes(item.id));
}

export function getInterview(state, interview) {
  if(!interview) return null;
  const interviewer = state.interviewers[interview.interviewer]
  return {
    student: interview.student,
    interviewer
  }
}

export function getInterviewersForDay(state, day) {
  const [currDay] = state.days.filter(item => item.name === day)
  return !currDay ? [] :
  Object.values(state.interviewers).filter(item => currDay.interviewers.includes(item.id));
}
