import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchJobs } from '../store/reducers/jobReducer';
import JobCard from './JobCard';
import JobModal from './JobModal';
import CircularLoader from './utils/circularLoader';
import useIntersection from './hooks/useIntersection';

import Navbar from './Navbar';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const isOnScreen = useIntersection(targetRef);

  useEffect(() => {
    if(isOnScreen) dispatch(fetchJobs());
  }, [dispatch, isOnScreen]);

  const jobsData = useSelector((state) => ({
    jobs: state.jobOpenings.jobs,
    isLoading: state.jobOpenings.isLoading,
    isError: state.jobOpenings.isError,
    jobFilters: state.jobOpenings.jobFilters,
    displayJobModal: state.jobOpenings.showJobModal,
  }));
  
  return (
    <>
      <Navbar />
      <div className={styles.jobsWrapper}>
        {jobsData.jobs && (
          jobsData.jobs.map((job, idx) => <JobCard {...job} key={idx}/>
        ))}
      </div>
      <div className={styles.loadJobs} ref={targetRef}>
        <CircularLoader/>
      </div>
      {jobsData.displayJobModal && <JobModal />}
    </>
  )
}

export default App;
