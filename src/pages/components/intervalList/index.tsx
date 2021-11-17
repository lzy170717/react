import React, { useState, useEffect, useRef } from 'react';
import './index.less';
import { useInterval } from 'ahooks';

interface DataType {
  name: string;
  address: string;
}

interface IProps {
  totalData: any[];
  intervalNum: number;
}

const IntervalList: React.FC<IProps> = ({ totalData, intervalNum }) => {

  const [data, setData] = useState<DataType[]>(totalData[0]);
  const [interval, setInterval] = useState<number | null>(intervalNum);
  const num = useRef(0);
  const listRef = useRef<HTMLDivElement | null>(null);

  useInterval(() => {
    //超过数据长度归0
    if (num.current === totalData.length) {
      num.current = 0;
      setData(totalData[0]);
    } else {
      setData(totalData[num.current]);
      num.current++;
    }
  }, interval, { immediate: true });

  const mouseenter = () => {
    setInterval(null);
  }

  const mouseleave = () => {
    //离开延迟生效
    setTimeout(() => {
      setInterval(intervalNum);
    }, intervalNum);
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener('mouseenter', mouseenter);
      listRef.current.addEventListener('mouseleave', mouseleave);
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener('mouseenter', mouseenter);
        listRef.current.removeEventListener('mouseleave', mouseleave);
      }
    }
  })

  return (
    <div className='box'>
      <div className='title'>
        <b>最新职位</b>
        <span>更多</span>
      </div>
      <div className='list' ref={listRef}>
        {
          data.map((item, index) => (
            <div className='list-item' key={index}>
              <span className='list-item-name'>{item.name}</span>
              <span>{item.address}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default IntervalList;
