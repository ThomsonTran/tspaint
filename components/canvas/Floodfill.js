import pencilFill from "./Pencilfill";

function canFill(color1, color2) {
    return color1 !== color2;
}

function getPixelColorInHex(x, y, context) {
    return getHex(context.getImageData(x, y, 1, 1).data);
}

function getHex(pixelColor) {
    return (
        "#" +
        (
            "000000" + rgbToHex(pixelColor[0], pixelColor[1], pixelColor[2])
        ).slice(-6)
    );
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255) {
        return "#000000";
    }
    return ((r << 16) | (g << 8) | b).toString(16);
}

function getImageDataByGridsize(context, gridSize) {
    const width = context.canvas.width;
    const height = context.canvas.height;

    let imageData = [];

    for (let i = 1; i < width; i += gridSize) {
        let row = [];
        for (let j = 1; j < height; j += gridSize) {
            row.push(getPixelColorInHex(i, j, context));
        }
        imageData.push(row);
    }
    return imageData;
}

function isWithinBounds(row, col, imageData) {
    if (row < 0 || row > imageData.length - 1) {
        return false;
    }

    if (col < 0 || col > imageData[0].length - 1) {
        return false;
    }

    return true;
}

export function floodFill(mousePosition, context, settings) {
    const { gridSize, color: selectedColor } = settings;
    const { x, y } = mousePosition;
    const imageData = getImageDataByGridsize(context, gridSize);

    console.log(context, imageData);

    const startCol = Math.floor(x / gridSize);
    const startRow = Math.floor(y / gridSize);
    const targetColor = imageData[startCol][startRow];

    if (!canFill(targetColor, selectedColor)) {
        return;
    }

    const pixelStack = [startRow, startCol];

    const visitedSquare = [];
    while (pixelStack.length > 0) {
        const col = pixelStack.pop();
        const row = pixelStack.pop();
        const currentSquare = row * imageData.length + col;

        if (!isWithinBounds(row, col, imageData)) {
            continue;
        }

        const currentColor = imageData[col][row];

        if (currentColor !== targetColor) {
            continue;
        }

        if (visitedSquare[currentSquare]) {
            continue;
        }

        const squareToFill = { x: col * gridSize, y: row * gridSize };
        pencilFill(squareToFill, context, settings);

        visitedSquare[currentSquare] = true;

        pixelStack.push(row + 1, col);
        pixelStack.push(row, col + 1);
        pixelStack.push(row - 1, col);
        pixelStack.push(row, col - 1);
    }
}

export default floodFill;
