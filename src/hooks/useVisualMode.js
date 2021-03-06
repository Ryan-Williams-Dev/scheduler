import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace === true) {
      return setHistory(prev => [...prev.slice(0, -1), newMode])
    }
    return setHistory(prev => [...prev, newMode]);
  }

  const back = () => {
    if (history.length <= 1) return;
    setMode(history[history.length - 2])
    setHistory(prev => prev.slice(0, history.length - 1))
  }

  return { mode, transition, back };
}