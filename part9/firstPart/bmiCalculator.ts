export const calculateBmi = (height: number, weight: number) : string => {
    // if(process.argv.length < 4) throw new Error('not enough parameters')
    // if(process.argv.length > 4) throw new Error('too many parameters')

    // const heightParam = Number(process.argv[2]) === null ? height : Number(process.argv[2])
    // const weightParam = Number(process.argv[3]) === null ? weight : Number(process.argv[3])

    const bmi = weight / ((height/100)*(height/100));

    console.log(bmi);

    if(bmi >= 18.5 && bmi < 25){
        return 'Normal (healthy weight)';
    }

    return "";
};

console.log(calculateBmi);
