"use client";  

import React, { useState, useEffect } from 'react';

// Define the type for each job item
interface Job {
  id: number;
  title: string;
  company: string;
}

const JobList = () => {
  // Specify the type of the jobs state as an array of Job objects
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Simulating fetching data for job listings
    const fetchedJobs: Job[] = [
      { id: 1, title: "Software Developer", company: "ABC Corp" },
      { id: 2, title: "UI/UX Designer", company: "XYZ Ltd" },
    ];
    setJobs(fetchedJobs);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Job Openings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} - {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
