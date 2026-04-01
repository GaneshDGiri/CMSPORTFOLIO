import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import { Download, GraduationCap, Briefcase } from 'lucide-react'; // Added new icons

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Reusable Tailwind class for inputs to ensure text is always visible
  const inputClasses = "w-full p-2 border rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:placeholder-gray-400";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          api.get('/profile'),
          api.get('/projects')
        ]);
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
      } catch (error) { console.error("Error fetching data:", error); }
    };
    fetchData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    try {
      await api.post('/messages', contactForm);
      setFormStatus('Message sent successfully!');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000); 
    } catch (error) { setFormStatus('Failed to send message.'); }
  };

  if (!profile) return <div className="text-center py-20">Loading portfolio...</div>;

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center gap-10 py-10">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight dark:text-white">
            Hi, I'm <span className="text-blue-600">{profile.name}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {profile.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="w-64 h-64 md:w-80 md:h-80 shrink-0">
          <img 
            src={profile.image?.startsWith('/uploads') 
              ? `http://localhost:5000${profile.image}` 
              : (profile.image || "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop")
            } 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-xl"
          />
        </div>
      </section>

      {/* 2. PROJECTS SECTION */}
      <section>
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white">My Work</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No projects added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* 3. NEW: EDUCATION & RESUME SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education Column */}
        <div>
          <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white flex items-center gap-3">
            <GraduationCap size={32} className="text-blue-500" /> Education
          </h2>
          <div className="space-y-6">
            {/* Education Item 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 border-l-blue-500 transition hover:shadow-md">
              <h3 className="text-xl font-bold dark:text-white">Bachelor of Engineering in IT / CS</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">Your University / College Name</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">2018 - 2022</p>
            </div>
            
            {/* Education Item 2 (Optional) */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 border-l-blue-500 transition hover:shadow-md">
              <h3 className="text-xl font-bold dark:text-white">Higher Secondary Education</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">Your College / School Name</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">2016 - 2018</p>
            </div>
          </div>
        </div>

        {/* Experience & Resume Column */}
        <div>
          <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white flex items-center gap-3">
            <Briefcase size={32} className="text-blue-500" /> Experience
          </h2>
          <div className="space-y-6">
            {/* Experience Item */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 border-l-green-500 transition hover:shadow-md">
              <h3 className="text-xl font-bold dark:text-white">Full Stack Developer</h3>
              <p className="text-green-600 dark:text-green-400 font-medium mt-1">VcreaTek Consulting</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">2025 - Present</p>
              <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                Developed and maintained multiple MERN stack web applications, focusing on scalable backend architectures and responsive React frontends.
              </p>
            </div>

            {/* Resume Download Button */}
            <div className="pt-4">
              <a 
                href="/resume.pdf" 
                target="_blank"
                download="Ganesh_Resume.pdf" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-white transition shadow-md w-full md:w-auto justify-center"
              >
                <Download size={20} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section className="max-w-2xl mx-auto pb-10">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white">Get in Touch</h2>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
              <input required type="text" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
              <input required type="email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className={inputClasses} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Message</label>
              <textarea required rows="4" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className={inputClasses}></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
              Send Message
            </button>
            {formStatus && (
              <p className={`text-center mt-4 font-medium ${formStatus.includes('success') ? 'text-green-500' : 'text-blue-500'}`}>
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}