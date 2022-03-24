export function getAppointmentsForDay(state, day) {
  const [currDay] = state.days.filter((item) => item.name === day)
  if (!currDay) return [];
  const daysAppointments = currDay.appointments;
  return Object.values(state.appointments)
    .filter(item => daysAppointments.includes(item.id))
}