"use client";
import React, { useState } from "react";

import ColorPicker from "./ColorPicker";
import CanvasSizePicker from "./CanvasSizePicker";
import GridSizePicker from "./GridSizePicker";
import ToolPicker from "./ToolPicker";

import Canvas from "./canvas/Canvas";

import SettingsContext from "./SettingsContext";

function CanvasContainer() {
    const [color, setColor] = useState("#000000");
    const [width, setWidth] = useState("800");
    const [height, setHeight] = useState("800");
    const [tool, setTool] = useState(0);
    const [gridSize, setGridSize] = useState(100);

    const props = {
        color,
        tool,
        gridSize,
    };

    return (
        <div className="container">
            <div className="tools">
                <ColorPicker currentValue={color} setColor={setColor} />
                <CanvasSizePicker
                    currentHeight={height}
                    currentWidth={width}
                    changeHeight={setHeight}
                    changeWidth={setWidth}
                />
                <GridSizePicker
                    currentValue={gridSize}
                    setGridSize={setGridSize}
                />
                <ToolPicker
                    currentValue={tool}
                    onChange={(value) => setTool(value)}
                />
            </div>
            <SettingsContext.Provider value={props}>
                <Canvas height={height} width={width} />
            </SettingsContext.Provider>
        </div>
    );
}

export default CanvasContainer;
