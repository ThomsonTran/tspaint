import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
    useContext,
} from "react";
import SettingsContext from "../SettingsContext";
import Tools from "./Tools";

const Canvas = (props) => {
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const canvasRef = useRef(null);
    const settings = useContext(SettingsContext);

    const width = props.width;
    const height = props.height;

    const { gridSize } = useContext(SettingsContext);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const getCoordinates = (event) => {
            const canvas = canvasRef.current;
            return {
                x: event.pageX - canvas.offsetLeft,
                y: event.pageY - canvas.offsetTop,
            };
        };

        const startPaint = (event) => {
            const coordinates = getCoordinates(event);
            if (coordinates) {
                setMousePosition(coordinates);
                setIsPainting(true);
            }
        };

        const canvas = canvasRef.current;
        canvas.addEventListener("mousedown", startPaint);
        return () => {
            canvas.removeEventListener("mousedown", startPaint);
        };
    }, []);

    const paint = useCallback(() => {
        if (!canvasRef.current) {
            return;
        }

        if (isPainting) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            Tools[settings.tool].draw(mousePosition, context, settings);
        }
    }, [isPainting, mousePosition, settings]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener("click", paint);
        return () => {
            canvas.removeEventListener("click", paint);
        };
    }, [paint]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const createGrid = (gridSize) => {
            gridSize = Math.max(gridSize, 1);
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
        };

        createGrid(gridSize);
    }, [height, width, gridSize]);

    const exitPaint = useCallback(() => {
        setIsPainting(false);
        setMousePosition(undefined);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener("mouseleave", exitPaint);
        return () => {
            canvas.removeEventListener("mouseleave", exitPaint);
        };
    }, [exitPaint]);

    return (
        <canvas
            className="canvasBackground"
            ref={canvasRef}
            height={height}
            width={width}
        />
    );
};

export default Canvas;
