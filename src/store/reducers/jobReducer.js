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

/**
 * Filters a list of jobs based on provided filters.
 *
 * If the value is an array, the job's attribute is expected to be in the array.
 * If the value is a single value, the job's attribute is expected 
 * to be greater than or equal to the filter value to filter out null values.
 */
const handleFilter = (jobFilters, jobs) => {
  if (!jobFilters) return [];
  return jobs?.filter(job => {
    return Object.entries(jobFilters).every(([key, jobFilter]) => {
      if (Array.isArray(jobFilter) && jobFilter.length) return jobFilter.includes(job[key]);
      else return job[key] >= jobFilter;
    });
  });
}

const initialState = {
  jobs: [],
  jobFilters: {
    minExp: 0,
    minJdSalary: 0,
    jobRole: [],
    location: '',
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
    editFilters: (state, action) => {
      return {
        ...state,
        jobFilters: {
          ...state.jobFilters,
          ...action.payload,
        }
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

export const {displayJobModal, hideJobModal, filterJobs, editFilters} = jobReducer.actions;

export default jobReducer.reducer;
