export default function ApplicationProcess() {
    return (
      <section className="bg-light-gray py-12 text-center">
        <h2 className="text-xl font-semibold mb-6">Easy Steps to Join Us!</h2>
        <div className="flex justify-center gap-6">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-medium">Application Submission</h3>
            <p>Send your CV along with a portfolio. We’re looking for a candidate with good technical skills and passion.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-medium">Interview and Assessment</h3>
            <p>Qualified candidates will be invited for an interview and assessment session.</p>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-medium">Offer and Onboarding</h3>
            <p>The successful candidates will receive the job offer, and after confirmation, onboarding starts.</p>
          </div>
        </div>
      </section>
    );
  }
  