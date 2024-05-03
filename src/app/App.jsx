import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { fetchJobs, filterJobs } from '../store/reducers/jobReducer';
import JobCard from './JobCard';
import JobModal from './JobModal';
import FilterJobs from './FilterJobs';
import CircularLoader from './utils/circularLoader';
import useIntersection from './hooks/useIntersection';

import Navbar from './components/Navbar';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const targetRef = useRef(null);
  const isOnScreen = useIntersection(targetRef);
  const [offset, setOffSet] = useState(0);

  useEffect(() => {
    if(isOnScreen) {
      dispatch(fetchJobs(offset));
      setOffSet(prevOffset => prevOffset+10);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isOnScreen]);

  const jobsData = useSelector((state) => ({
    jobs: state.jobOpenings.jobs,
    isLoading: state.jobOpenings.isLoading,
    isError: state.jobOpenings.isError,
    jobFilters: state.jobOpenings.jobFilters,
    filteredJobs: state.jobOpenings.filteredJobs,
    displayJobModal: state.jobOpenings.showJobModal,
  }));

  //Filters jobs and push them into filtered array when new jobs are fetched
  useEffect(() => {
    if(jobsData?.jobs && jobsData?.jobFilters) dispatch(filterJobs(
      {jobFilters: jobsData.jobFilters, jobs: jobsData.jobs}
    ));
  }, [dispatch, jobsData.jobFilters, jobsData.jobs]);
  
  return (
    <>
      <Navbar />
      <FilterJobs />
      <div className={styles.jobsWrapper}>
        {jobsData?.filteredJobs?.length ? (
          jobsData.filteredJobs.map((job, idx) => <JobCard {...job} key={idx}/>)
        ) : (
          jobsData?.jobs?.map((job, idx) => <JobCard {...job} key={idx}/>)
        )}
      </div>
      <div className={styles.loadJobs} ref={targetRef}>
        <CircularLoader/>
      </div>
      {jobsData.displayJobModal && <JobModal />}
    </>
  )
}

export default App;
