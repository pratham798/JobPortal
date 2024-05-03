import React from 'react';

import { LOCATION, EXPERIENCE, MINSALARY, ROLES } from '../constants/filterConstants';
import EntityFilter from '../EntityFilter';

import styles from './FilterJob.module.css';

const FilterJobs = () => {
  return (
    <div className={styles.filterContainer}>
      <EntityFilter 
        filterOptions={ROLES} inputType='text' category='jobRole' multiSelect
        placeholder='Roles'
      />
      <EntityFilter 
        filterOptions={EXPERIENCE} inputType='number' category='minExp'
        placeholder='Experience' 
      />
      <EntityFilter 
        filterOptions={LOCATION} inputType='text' category='location'
        placeholder='Location'
      />
      <EntityFilter 
        filterOptions={MINSALARY} inputType='number' category='minJdSalary'
        placeholder='Minimum Base Pay Salary'
      />
    </div>
  )
}

export default FilterJobs;
