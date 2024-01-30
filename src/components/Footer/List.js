import React from 'react';
import { v4 } from 'uuid';
import styles from "./Styles.module.scss";

const List = ({title, content}) => {
  return (
    <div className={styles.list}>
      <h5>{title}</h5>
      <ul className='ps-0'>
        {content.map(item => <li key={v4()} className='ps-0'>{item}</li>)}
      </ul>
    </div>
  );
}

export default List;
