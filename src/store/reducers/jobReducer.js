import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Jobs from '../../app/Api/Jobs';

/**
 * Fetches order data asynchronously.
 * @returns {Promise} A promise that resolves to the fetched order data.
 */
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  // Call the searchJobs function from the Jobs module and await the result
  const jobData = await Jobs.searchJobs(requestOptions);
  return jobData;
});

const initialState = {
  jobs: [],
  jobFilters: {
    minExp: '',
    location: '',
    jobRole: ''
  },
  isLoading: true,
  isError: false,
};

export const jobReducer = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
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

export const { } = jobReducer.actions;

export default jobReducer.reducer;
