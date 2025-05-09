export default function ContactForm() {
    return (
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">How May We Help You?</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="p-3 rounded-md w-full" />
            <input type="email" placeholder="Your Email" className="p-3 rounded-md w-full" />
            <input type="text" placeholder="Subject" className="p-3 rounded-md w-full" />
            <textarea placeholder="Message" className="p-3 rounded-md w-full" rows="4"></textarea>
            <button className="bg-dark-blue text-white py-3 px-6 rounded-md">Send Message</button>
          </form>
        </div>
      </section>
    );
  }
  