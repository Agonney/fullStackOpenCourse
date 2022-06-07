interface Result{
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (process: { argv: string | any[] }) : Result => {
    if(process.argv.length < 2) throw new Error('not enough parameters')
    const targetParam = Number(process.argv[2])
    let dailyHours: Array<number> = []
    for (let index = 3; index < process.argv.length; index++) {
        dailyHours.push(Number(process.argv[index]))
    }

    const averageHours = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length

    let rating
    let ratingDescription
    if(averageHours < 1){
        rating = 1
        ratingDescription = 'very bad, you should exercise more'
    } 
    else if(averageHours < 2){
        rating = 2
        ratingDescription = 'not too bad but could be better'
    } 
    else{
        rating = 3
        ratingDescription = 'great, you achieved your target'
    } 
    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(hour => hour > 0).length,
        success: averageHours > targetParam,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetParam,
        average: averageHours
    }
}

console.log(calculateExercises(process))