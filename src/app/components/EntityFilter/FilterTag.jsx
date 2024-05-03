import React from 'react';

import styles from './EntityFilter.module.css';
import clearIcon from '../../assets/svg/clear.svg';

// Adds Filter Tag on Input Fields which can take multiple filters
const FilterTag = ({ jobFilter, removeTags }) => (
  <div className={styles.filterTag}>
    <span>{jobFilter}</span>
    <img src={clearIcon} alt="clear" onClick={() => removeTags(jobFilter)}/>
  </div>
);

export default FilterTag;
