import { CourseParts } from "../types";
import Part from "./Part";

const Content = ({courseParts}: CourseParts): JSX.Element => {
    return (
        <div>
            {courseParts.map((part, i) => 
                <Part key={i} coursePart={part} />)}
        </div>
    )
 }
export default Content;