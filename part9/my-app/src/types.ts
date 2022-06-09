interface CoursePartBase {
    name: string,
    exerciseCount: number,
    type: string
}

interface CoursePartDescriptionBase extends CoursePartBase {
    description?: string
}

interface CoursePartNormal extends CoursePartDescriptionBase {
    type: 'normal',
}

interface CoursePartProject extends CoursePartBase {
    type: 'groupProject',
    groupProjectCount: number
}

interface CoursePartSubmission extends CoursePartDescriptionBase {
    type: 'submission',
    exerciseSubmissionLink: string
}

interface CoursePartSpecial extends CoursePartDescriptionBase {
    type: 'special',
    requirements: Array<string>
}

export type CoursePart = CoursePartNormal | CoursePartProject | CoursePartSubmission | CoursePartSpecial

export interface CourseParts {
    courseParts: CoursePart[]
}

export interface PartProp {
    coursePart: CoursePart
}