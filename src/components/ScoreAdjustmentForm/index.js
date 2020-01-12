import React from 'react';
import './ScoreAdjustmentForm.scss';

const ScoreAdjustmentForm = ({ handler }) => {
    return (
        <div className="score-updater">
            <form
                id="scoreAdjustmentForm"
                onSubmit={handler}
            >
                <input
                    id="scoreInput"
                    type="number"
                    pattern="^-?([0-9]{1,9})$"
                    maxLength="9"
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default ScoreAdjustmentForm;