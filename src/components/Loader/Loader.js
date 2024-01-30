import React from 'react'
import styles from './Styles.module.scss'
const Loader = () => {
  return (
    <div className={styles.loaderMain}>
      <span className={styles.loader}></span>
    </div>
  )
}

export default Loader
