import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [studentName, setStudentName] = useState(props.student || "");
  const [interviewerID, setInterviewerID] = useState(props.interview || null)

  const reset = () => {
    setStudentName('');
    setInterviewerID(null)
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          onChange={setInterviewerID}
          value={interviewerID}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(studentName, interviewerID)}>Save</Button>
        </section>
      </section>
    </main>
  )
}