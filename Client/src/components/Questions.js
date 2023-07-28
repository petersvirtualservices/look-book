import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
/** Custom Hook */
import { useFetchQestion } from "../hooks/FetchQuestion";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked, dispatch, trace]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h6 className="text-light">isLoading.....</h6>;
  if (serverError)
    return (
      <h5 className="text-dark">{serverError.message || "Unknown Error"}</h5>
    );

  return (
    <>
      <div className="questions">
        <ul key={questions?.id}>
          <h3 className="text-dark">{questions?.question}</h3>

          {questions?.options.map((q, i) => (
            <>
              <li key={i}>
                <input
                  type="radio"
                  value={false}
                  name="options"
                  id={`q${i}-option`}
                  onChange={() => onSelect(i)}
                />

                <label className="text-dark" htmlFor={`q${i}-option`}>
                  {q}
                </label>
                <div
                  className={`check ${result[trace] === i ? "checked" : ""}`}
                ></div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
