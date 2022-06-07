

const calculateBmi = (height: number, weight: number) : string => {
    if(process.argv.length < 4) throw new Error('not enough parameters')
    if(process.argv.length > 4) throw new Error('too many parameters')

    const heightParam = Number(process.argv[2])
    const weightParam = Number(process.argv[3])

    const bmi = weightParam / ((heightParam/100)*(heightParam/100))

    if(bmi >= 18.5 && bmi < 25){
        return 'Normal (healthy weight)'
    }
}

console.log(calculateBmi)
