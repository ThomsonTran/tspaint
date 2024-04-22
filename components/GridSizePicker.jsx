import React from "react";

function GridSizePicker({ setGridSize, currentValue }) {
    return (
        <div className="size-container">
            Grid Size
            <input
                type="number"
                value={currentValue}
                onChange={(e) => setGridSize(e.target.value)}
            />
        </div>
    );
}

export default GridSizePicker;
