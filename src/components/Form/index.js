import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import  { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

export default function App() {
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const onSubmit = (data) => {
// const objectdata=JSON.stringify(data)
    fetch(process.env.REACT_APP_API_URL+'mailoptions', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({beginDate:startDate,frequency:data.frequency}),
    })
    alert("Mail Options added");
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor="startdate">Start Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>

        <div>
          <label htmlFor="frequency">Mail Frequency</label>
          <select {...register("frequency")}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
