import React from "react";
import Button from "./Button";

const ResetControls = ({ restart, reset }) => (
    <div className="reset-controls">
        <Button handler={restart} label="Start Over" />
        {reset && <Button handler={reset} label="Reset Scores"/>}
    </div>
);

export default ResetControls;