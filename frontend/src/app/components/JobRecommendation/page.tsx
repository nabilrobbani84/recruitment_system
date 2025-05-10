export default function JobRecommendation() {
    const jobs = [
      { company: 'PT Telkom Indonesia', role: 'IT Support', location: 'Jakarta', openings: 3 },
      { company: 'PT Indosat', role: 'Network Engineer', location: 'Jakarta', openings: 2 },
      // Add more jobs here
    ];
  
    return (
      <section className="my-10">
        <div className="container mx-auto">
          <h2 className="text-xl font-semibold mb-4">Pekerjaan yang direkomendasikan untuk kamu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium">{job.company}</h3>
                <p className="text-sm">{job.role}</p>
                <p className="text-sm">{job.location}</p>
                <p className="text-sm">{job.openings} Lowongan</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  