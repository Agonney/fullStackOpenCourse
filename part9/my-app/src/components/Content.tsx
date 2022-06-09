import { CourseParts } from "../types";

const Content = (props: CourseParts): JSX.Element => {
    return (
    <div>
        {props.courseParts.map(part => <p>{part.name} {part.exerciseCount}</p>)}
    </div>
    )
 }
export default Content;