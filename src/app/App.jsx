import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchJobs } from '../store/reducers/jobReducer';
import JobCard from './JobCard';

import Navbar from './Navbar';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const jobsData = useSelector((state) => ({
    jobs: state.jobOpenings.jobs,
    isLoading: state.jobOpenings.isLoading,
    isError: state.jobOpenings.isError,
    jobFilters: state.jobOpenings.jobFilters,
  }));
  
  return (
    <>
      <Navbar />
      <div className={styles.jobsWrapper}>
        {jobsData.jobs && (
          jobsData.jobs.map((job) => <JobCard {...job}/>
        ))}
      </div>
    </>
  )
}

export default App;
