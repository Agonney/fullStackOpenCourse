import diagnosesData from '../../data/diagnosesData'
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
    return diagnosesData
};

export default { getDiagnoses }
