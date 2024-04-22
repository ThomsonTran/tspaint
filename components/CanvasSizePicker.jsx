function CanvasSizePicker(props) {
    let { changeWidth, changeHeight, currentHeight, currentWidth } = props;

    return (
        <div className="size-container">
            Width
            <input
                type="number"
                value={currentWidth}
                onChange={(e) => changeWidth(e.target.value)}
            />
            Height
            <input
                type="number"
                value={currentHeight}
                onChange={(e) => changeHeight(e.target.value)}
            />
        </div>
    );
}

export default CanvasSizePicker;
