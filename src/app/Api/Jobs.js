/* eslint-disable import/no-anonymous-default-export */

/**
 * Asynchronously searches for jobs by making a POST request to the specified API endpoint.
 * @returns {Promise<Array>} A promise that resolves to an array of job objects.
 * @throws {Error} If an error occurs during the search process.
 */
async function searchJobs(requestOptions) {
  try {
    const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
    const jobs= await response.json();
    return jobs.jdList;
  } catch(error){
    return error;
  }
}

export default {
  searchJobs
};
