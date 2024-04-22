import Tools from "./canvas/Tools";

const toolNames = Tools.map((tool) => tool.name);

function ToolPicker(props) {
    const { currentValue } = props;
    return (
        <div
            className="tools-container"
            onChange={(e) => props.onChange(e.target.value)}
        >
            {toolNames.map((element, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        id={element}
                        name="tool"
                        value={index}
                        defaultChecked={index === currentValue}
                    />
                    <label htmlFor={element}>{element}</label>
                </div>
            ))}
        </div>
    );
}

export default ToolPicker;
