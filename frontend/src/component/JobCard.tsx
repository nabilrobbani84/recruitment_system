type Job = {
  title: string;
  company: string;
  description: string;
};

const JobCard = ({ job }: { job: Job }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-sm text-gray-500">{job.company}</p>
      <p className="mt-2">{job.description}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
    </div>
  );
};

export default JobCard;
