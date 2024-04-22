"use client";
import { useState } from "react";

import ColorPicker from "./ColorPicker";
import CanvasSizePicker from "./CanvasSizePicker";
import ToolPicker from "./ToolPicker";

import Canvas from "./canvas/Canvas";

import SettingsContext from "./SettingsContext";

function CanvasContainer() {
    const [color, setColor] = useState("#000000");
    const [width, setWidth] = useState("800");
    const [height, setHeight] = useState("800");
    const [tool, setTool] = useState(0);
    const gridSize = 100;

    return (
        <div className="container">
            <div className="flex justify-evenly">
                <ColorPicker currentValue={color} setColor={setColor} />
                <CanvasSizePicker
                    currentHeight={height}
                    currentWidth={width}
                    changeHeight={setHeight}
                    changeWidth={setWidth}
                />
                <ToolPicker
                    currentValue={tool}
                    onChange={(value) => setTool(value)}
                />
            </div>
            <SettingsContext.Provider
                value={{
                    color,
                    tool,
                    gridSize,
                }}
            >
                <Canvas height={height} width={width} />
            </SettingsContext.Provider>
        </div>
    );
}

export default CanvasContainer;
