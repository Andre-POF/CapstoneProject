import React from "react";
import { Datepicker } from "react-datepicker";

function Calendar() {
  const props = { placeholder: "Please Select..." };

  return (
    <div>
      <Datepicker
        controls={["calendar"]}
        select="range"
        touchUi={true}
        inputComponent="input"
        inputProps={props}
      />
    </div>
  );
}

export default Calendar;
