import React from 'react';

import styles from './JobCard.module.css';

import jobIcon from '../assets/svg/job-icon.svg'

const JobCard = (job) => {
  return (
    <div key={job.jdUid} className={styles.cardWrapper}>
      <div className={styles.posted}>⏳ Posted 1 Day Ago</div>
      <div className={styles.jobHeader}>
        <img src={jobIcon} alt="logo"/>
        <span>
          <span className={styles.companyName}>Sample Company</span><br/>
          <span className={styles.jobRole}>{job.jobRole}</span><br/>
          <span className={styles.jobLocation}>{job.location}</span>
        </span>
      </div>
      <div className={styles.jobInfo}>
        <span className={styles.infoHeader}>About Company:</span><br/>
        <span className={styles.infoContent}>{job.jobDetailsFromCompany}</span>
        <div className={styles.infoFooter}>Show more</div>
      </div>
      <div>
        {job.minExp && (
          <div className={styles.jobExp}>
            <span>Minimum Experience:</span><br/>
            <span>{job.minExp} years</span>
          </div>
        )}
        <span className={styles.applyCta}>⚡️ Easy apply</span>
      </div>
    </div>
  )
}

export default JobCard;
