import { PartProp } from "../types"

const Part = ({coursePart}: PartProp) => {
    switch(coursePart.type){
        case 'normal':
            return (<div>
                <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                <p>{coursePart.description}</p>
            </div>)
        case 'groupProject':
            return (<div>
                <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                <p>project exercises {coursePart.exerciseCount}</p>
            </div>)
        case 'submission':
            return (<div>
                <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                <p>{coursePart.description}</p>
                <p>submit to {coursePart.exerciseSubmissionLink}</p>
            </div>)
        case 'special':
            return (<div>
                <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
                <p>{coursePart.description}</p>
                <p>required skills {coursePart.requirements.toString()}</p>
            </div>)
        default:
            return assertNever(coursePart)
            
    }
}

const assertNever = (part: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(part)}`)
}

export default Part;