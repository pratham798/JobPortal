import React from 'react';
import { useSelector } from "react-redux";

import { LOCATION, EXPERIENCE, MINSALARY, ROLES } from '../constants/filterConstants';
import EntityFilter from '../EntityFilter';

import styles from './FilterJob.module.css';

const FilterJobs = () => {
  const filterData = useSelector((state) => (state.jobOpenings.jobFilters));

  return (
    <div className={styles.filterContainer}>
      <EntityFilter 
        filterOptions={ROLES} inputType='text' category='jobRole'
        placeholder='Roles' filterData={filterData['jobRole']}
      />
      <EntityFilter 
        filterOptions={EXPERIENCE} inputType='number' category='minExp'
        placeholder='Experience' filterData={filterData['minExp']}
      />
      <EntityFilter 
        filterOptions={LOCATION} inputType='text' category='location'
        placeholder='Location' filterData={filterData['location']}
      />
      <EntityFilter 
        filterOptions={MINSALARY} inputType='number' category='minJdSalary'
        placeholder='Minimum Base Pay' filterData={filterData['minJdSalary']}
      />
    </div>
  )
}

export default FilterJobs;
