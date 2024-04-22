function ColorPicker(props) {
    const { setColor, currentValue } = props;
    return (
        <div className="flex flex-col">
            <label className="font-medium mb-2">Color picker</label>
            <input
                type="color"
                className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer 
                rounded-lg disabled:opacity-50 
disabled:pointer-events-none"
                id="hs-color-input"
                value={currentValue}
                onChange={(e) => setColor(e.target.value)}
                title="Choose your color"
            ></input>
        </div>
    );
}

export default ColorPicker;
