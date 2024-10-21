import React from "react";
import { useLocation } from "react-router-dom";

const ScreeningSchedule = () => {
  const state = useLocation();
  return (
    <div className="w-full overflow-scroll ">
        <p>kanban board</p>
    </div>
  );
};

export default ScreeningSchedule;