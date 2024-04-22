import floodFill from "./Floodfill";
import pencil from "./Pencilfill";

const tools = [
    {
        name: "pencil",
        draw: (mousePosition, context, settings) => {
            pencil(mousePosition, context, settings);
        },
    },

    {
        name: "floodfill",
        draw: (mousePosition, context, settings) => {
            floodFill(mousePosition, context, settings);
        },
    },
];

export default tools;
