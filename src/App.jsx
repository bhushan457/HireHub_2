import { useState } from 'react';

const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'TechFlow',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    description: 'We are looking for an experienced Frontend Engineer to build modern, responsive web applications using React and Vite. You will work closely with our design team to implement pixel-perfect UIs with premium aesthetics and dynamic animations.',
    requirements: ['5+ years React experience', 'Expertise in modern CSS', 'Strong understanding of web performance'],
    logo: '🚀'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'CreativeSpace',
    location: 'New York, NY (Hybrid)',
    type: 'Full-time',
    salary: '$100k - $130k',
    description: 'Join our award-winning design team to craft intuitive and visually stunning user experiences. You will lead the design of our core web platform from concept to handoff, utilizing tools like Figma and Framer.',
    requirements: ['Portfolio demonstrating web/mobile product design', 'Experience with design systems', 'Prototyping skills'],
    logo: '🎨'
  },
  {
    id: 3,
    title: 'Backend Developer (Node.js)',
    company: 'DataSync Systems',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$80 - $100 / hr',
    description: 'Looking for a strong Node.js developer to help scale our microservices architecture. You will be responsible for optimizing database queries, building RESTful APIs, and implementing robust security measures.',
    requirements: ['Strong Node.js and Express experience', 'PostgreSQL optimization', 'AWS cloud infrastructure deployment'],
    logo: '⚙️'
  },
  {
    id: 4,
    title: 'Marketing Manager',
    company: 'BrandLift',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $110k',
    description: 'Drive our growth strategy across digital channels. You will oversee paid campaigns, content marketing, and SEO initiatives, analyzing performance data to refine our approach and maximize ROI.',
    requirements: ['3+ years digital marketing', 'Data-driven mindset with GA4 expertise', 'Excellent copywriting skills'],
    logo: '📈'
  }
];

function App() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setIsApplying(false);
    setApplicationSuccess(false);
  };

  const closeModals = () => {
    setSelectedJob(null);
    setIsApplying(false);
    setApplicationSuccess(false);
  };

  return (
    <>
      <Navbar />
      <Hero />
      
      <main className="container my-8">
        <h2 className="mb-4 text-gradient" style={{ fontSize: '2rem' }}>Latest Opportunities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockJobs.map(job => (
            <JobCard key={job.id} job={job} onClick={() => openJobDetails(job)} />
          ))}
        </div>
      </main>

      {/* Modals */}
      {selectedJob && !isApplying && !applicationSuccess && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={closeModals} 
          onApply={() => setIsApplying(true)} 
        />
      )}

      {isApplying && !applicationSuccess && (
        <ApplicationModal 
          job={selectedJob} 
          onClose={closeModals} 
          onSuccess={() => setApplicationSuccess(true)} 
        />
      )}

      {applicationSuccess && (
        <SuccessModal onClose={closeModals} />
      )}
    </>
  );
}

// ---- Components ---- 

function Navbar() {
  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container flex items-center justify-between">
        <h1 className="text-gradient" style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '-0.5px' }}>HireHub.</h1>
        <nav className="flex gap-4 items-center">
          <a href="#" className="text-muted">Jobs</a>
          <a href="#" className="text-muted">Companies</a>
          <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Post a Job</button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="container my-8" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.1' }}>
        Find Your <span className="text-gradient">Dream Role</span> Today
      </h1>
      <p className="text-muted text-lg mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
        Connect with top companies and seamless application processes. Discover opportunities that match your skills and aspirations.
      </p>
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary">Browse Jobs</button>
        <button className="btn btn-secondary">Upload Resume</button>
      </div>
    </section>
  );
}

function JobCard({ job, onClick }) {
  return (
    <div className="glass-panel flex-col" style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex' }} onClick={onClick}>
      <div className="flex justify-between items-center mb-4">
        <div style={{ fontSize: '2rem' }}>{job.logo}</div>
        <span className="text-sm" style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--primary-accent)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)' }}>
          {job.type}
        </span>
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{job.title}</h3>
      <div className="text-muted mb-4">{job.company} &bull; {job.location}</div>
      <div className="mt-4 flex justify-between items-center" style={{ marginTop: 'auto' }}>
        <span style={{ fontWeight: 600 }}>{job.salary}</span>
        <button className="btn btn-outline" style={{ padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>View Details</button>
      </div>
    </div>
  );
}

// ---- Modal Wrappers ----

function ModalBackdrop({ children, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '600px', animation: 'fadeInUp 0.3s ease-out' }}>
        {children}
      </div>
    </div>
  );
}

function JobDetailsModal({ job, onClose, onApply }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <div className="glass-panel text-left" style={{ padding: '2rem', background: 'var(--bg-secondary)' }}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div style={{ fontSize: '2.5rem' }}>{job.logo}</div>
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.1rem' }}>{job.title}</h2>
              <div className="text-primary">{job.company}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>&times;</button>
        </div>
        
        <div className="flex gap-2 mb-4">
          <span className="text-sm text-muted" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>📍 {job.location}</span>
          <span className="text-sm text-muted" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>💼 {job.type}</span>
          <span className="text-sm text-muted" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>💰 {job.salary}</span>
        </div>

        <div style={{ margin: '1.5rem 0' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>About the Role</h3>
          <p className="text-secondary" style={{ lineHeight: '1.6' }}>{job.description}</p>
        </div>

        <div style={{ margin: '1.5rem 0' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Requirements</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
            {job.requirements.map((req, idx) => (
              <li key={idx} style={{ marginBottom: '0.4rem' }}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 mt-4 py-4" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <button className="btn btn-primary flex-1" onClick={onApply} style={{ flex: 1, padding: '0.8rem' }}>Apply Now</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

function ApplicationModal({ job, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="glass-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 style={{ fontSize: '1.5rem' }}>Apply for {job.title}</h2>
          <button onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>&times;</button>
        </div>
        <p className="text-muted mb-4">At {job.company}</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="text-sm text-muted" style={{ display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
            <input required type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'white', outline: 'none' }} />
          </div>
          <div>
            <label className="text-sm text-muted" style={{ display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
            <input required type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'white', outline: 'none' }} />
          </div>
          <div>
            <label className="text-sm text-muted" style={{ display: 'block', marginBottom: '0.3rem' }}>Portfolio / LinkedIn URL</label>
            <input type="url" placeholder="https://" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'white', outline: 'none' }} />
          </div>
          <div>
            <label className="text-sm text-muted" style={{ display: 'block', marginBottom: '0.3rem' }}>Cover Letter (Optional)</label>
            <textarea rows="4" placeholder="Why are you a great fit?" style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'white', outline: 'none', resize: 'vertical' }}></textarea>
          </div>

          <div className="flex gap-4" style={{ marginTop: '1rem' }}>
            <button disabled={loading} type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.8rem', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
}

function SuccessModal({ onClose }) {
  return (
    <ModalBackdrop onClose={onClose}>
      <div className="glass-panel flex-col items-center flex" style={{ padding: '3rem 2rem', background: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>
          ✓
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Application Sent!</h2>
        <p className="text-muted mb-4">Your application has been successfully submitted to the employer. We'll be in touch soon.</p>
        <button className="btn btn-primary" onClick={onClose} style={{ padding: '0.6rem 2rem' }}>Close</button>
      </div>
    </ModalBackdrop>
  );
}

export default App;
