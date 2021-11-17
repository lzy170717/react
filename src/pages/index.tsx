import IntervalList from './components/intervalList';
import { hangData, shangData, beiData } from './data';

const totalData = [hangData, shangData, beiData]

export default () => {

  return (
    <IntervalList totalData={totalData} intervalNum={2000} />
  )
}
