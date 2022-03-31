import React, { useEffect } from "react";
import "components/Appointment/styles.scss"
import Empty from "./Empty";
import Show from "./Show";
import Header from "./Header";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);

  const save = function(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then((res) => {
      transition(SHOW)
    })
    .catch(err => {
      console.log(err)
      transition(ERROR_SAVE, true)
    })
  }

  const deleteInterview = function(id) {
    transition(DELETE, true);
    props.cancelInterview(id)
    .then(res => {
      transition(EMPTY)
    })
    .catch(err => {
      console.log(err)
      transition(ERROR_DELETE, true)
    })
  }

  const confirmDelete = function() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={(() => transition(EDIT))}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          student={props.student}
          interview={props.interview}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={() => deleteInterview(props.id)}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={back}
          student={props.interview.student}
          interview={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && <Error message="didnt save" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="didnt delete" onClose={back} />}
    </article>
  );
};