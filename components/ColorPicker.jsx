function ColorPicker(props) {
    const { setColor, currentValue } = props;
    return (
        <div className="color-picker-container">
            <input
                type="color"
                value={currentValue}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
}

export default ColorPicker;
