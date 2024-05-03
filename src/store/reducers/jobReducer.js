import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Jobs from '../../app/Api/Jobs';

/**
 * Fetches order data asynchronously.
 * @returns {Promise} A promise that resolves to the fetched order data.
 */
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (offset) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 9,
    offset
   });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
  };

  // Call the searchJobs function from the Jobs module and await the result
  const jobData = await Jobs.searchJobs(requestOptions);
  return jobData;
});

const handleFilter = (jobFilters, jobs) => {
  if (!jobFilters) return []; 
  return jobs?.filter(job => {
    const test = Object.entries(jobFilters).every(([key, jobFilter]) => {
      if (Array.isArray(jobFilter)) return jobFilter.includes(job[key]);
      return jobFilter == null || job[key] >= jobFilter;
    });
    return test;
  });
}

const initialState = {
  jobs: [],
  jobFilters: {
    minExp: 5,
    jobRole: ['ios'],
    location: ['remote'],
  },
  filteredJobs: [],
  isLoading: true,
  isError: false,
  jobModalData: {},
  showJobModal: false,
};

export const jobReducer = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    displayJobModal: (state, action) => {
      return {
        ...state,
        jobModalData: action.payload,
        showJobModal: true,
      };
    },
    hideJobModal: (state) => {
      return {
        ...state,
        showJobModal: false,
      };
    },
    filterJobs: (state, action) => {
      return {
        ...state,
        filteredJobs: handleFilter(action.payload.jobFilters, action.payload.jobs),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
     state.isLoading = true;
     state.isError = false;
    })
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
     state.isLoading = false;
     state.isError = false;
     state.jobs = [...state.jobs, ...action.payload];
    })
    builder.addCase(fetchJobs.rejected, (state) => {
     state.isError = true;
     state.isLoading = false;
    });
  },
});

export const {displayJobModal,hideJobModal,filterJobs} = jobReducer.actions;

export default jobReducer.reducer;
