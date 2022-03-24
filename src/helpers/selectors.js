export function getAppointmentsForDay(state, day) {
  const [currDay] = state.days.filter((item) => item.name === day)
  if (!currDay) return [];
  const daysAppointments = currDay.appointments;
  return Object.values(state.appointments)
    .filter(item => daysAppointments.includes(item.id))
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
  const [currDay] = state.days.filter((item) => item.name === day)
  if (!currDay) return [];
  const daysInterviewers = currDay.interviewers;
  return Object.values(state.interviewers)
    .filter(item => daysInterviewers.includes(item.id))
}