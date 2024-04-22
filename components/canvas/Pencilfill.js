export function pencilFill(mousePosition, context, settings) {
    let { x, y } = mousePosition;
    const { color, gridSize } = settings;

    context.strokeStyle = color;
    x = Math.floor(x / gridSize) * gridSize;
    y = Math.floor(y / gridSize) * gridSize;
    context.fillStyle = color;
    context.fillRect(x, y, gridSize, gridSize);
}

export default pencilFill;
