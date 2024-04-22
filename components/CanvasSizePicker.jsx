function CanvasSizePicker(props) {
    let { changeWidth, changeHeight, currentHeight, currentWidth } = props;

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-2">
                <label>Width</label>
                <input
                    type="number"
                    placeholder="Width"
                    value={currentWidth}
                    onChange={(e) => changeWidth(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label>Height</label>
                <input
                    type="number"
                    placeholder="Height"
                    value={currentHeight}
                    onChange={(e) => changeHeight(e.target.value)}
                />
            </div>
        </div>
    );
}

export default CanvasSizePicker;
