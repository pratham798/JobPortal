import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import useComponentVisible from '../hooks/useClickOutside';
import { hideJobModal } from '../../store/reducers/jobReducer';
import { getSalary } from '../utils/getSalary';

import styles from './JobModal.module.css';

const JobModal = () => {
  const dispatch = useDispatch();
  const { ref, isComponentVisible } = useComponentVisible(true);
  console.log(isComponentVisible);
  const closeModal = useCallback(() => dispatch(hideJobModal()),[dispatch]);

  useEffect(() => {
    if(!isComponentVisible) closeModal();
  }, [closeModal, isComponentVisible]);
  
  const jobData = useSelector((state) => state.jobOpenings.jobModalData);
  return (
    <div className={styles.jobModalContainer}>
      <div className={styles.jobModalPopup} ref={ref}>
        <div className={styles.header}> Job Description </div>
        {jobData?.jobDetailsFromCompany && (
          <div>
            <span className={styles.subHeader}>About Company: </span>
            <div className={styles.desc}> {jobData.jobDetailsFromCompany} </div>
          </div>
        )}
        {jobData?.jobRole && (
          <div>
            <span className={styles.subHeader}>About Role: </span>
            <div className={styles.desc}> {jobData.jobRole} </div>
            <div className={styles.desc}> {jobData.jobDetailsFromCompany} </div>
          </div>
        )}
        {jobData?.minExp && (
          <div>
            <span className={styles.subHeader}>Experience:</span>
            <div className={styles.desc}>
              {jobData.minExp}+ years
              <br/>
              {getSalary(jobData?.minJdSalary, jobData?.maxJdSalary)}
            </div>
          </div>
        )}
        {jobData?.location && (
          <div>
            <span className={styles.subHeader}>Location:</span>
            <div className={styles.desc}>{jobData.location}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobModal;

