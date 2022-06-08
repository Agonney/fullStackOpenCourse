import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const params = req.query;
    const height = Number(params.height);
    const weight = Number(params.weight);
    try{
        const bmiResult = calculateBmi(height, weight);
        console.log(bmiResult);
        res.send({
            "weight": weight,
            "height": height,
            "bmi": bmiResult
        });
    }catch (error){
        res.json({error: "malformatted parameters"});
    }
});

app.post('/exercises', (req, res) => {
    console.log(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyExercises, target } = req.body;
    if( !dailyExercises || !target || isNaN(Number(target))){
        return res.send({error: 'wrong parameters'}).status(400);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(dailyExercises, target);
    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});