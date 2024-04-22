import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useContext,
} from "react";
import SettingsContext from "../SettingsContext";
import Tools from "./Tools";

const Canvas = ({ width, height }) => {
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);
    const settings = useContext(SettingsContext);
    const { gridSize } = useContext(SettingsContext);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, width, height);
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "blue";
        for (let y = 0; y < height; y += gridSize) {
            context.moveTo(0, y);
            context.lineTo(width, y);
        }
        for (let x = 0; x < width; x += gridSize) {
            context.moveTo(x, 0);
            context.lineTo(x, height);
        }
        context.stroke();
    }, [width, height, gridSize]);

    const startPaint = useCallback((event) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setMousePosition(coordinates);
            setIsPainting(true);
        }
    }, []);

    const paint = useCallback(() => {
        if (!canvasRef.current || !isPainting) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        Tools[settings.tool].draw(mousePosition, context, settings);
    }, [isPainting, mousePosition, settings]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener("mousedown", startPaint);
        canvas.addEventListener("click", paint);
        canvas.addEventListener("mouseleave", exitPaint);
        return () => {
            canvas.removeEventListener("mousedown", startPaint);
            canvas.removeEventListener("click", paint);
            canvas.removeEventListener("mouseleave", exitPaint);
        };
    }, [startPaint, paint, exitPaint]);

    const getCoordinates = (event) => {
        const canvas = canvasRef.current;
        return {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop,
        };
    };

    return (
        <canvas
            className="m-auto border border-blue-500"
            ref={canvasRef}
            width={width}
            height={height}
        />
    );
};

export default Canvas;
