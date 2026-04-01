import { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import Education from '../components/Education';
import Resume from '../components/Resume';
import ContactInfo from '../components/ContactInfo'; 
import { AuthContext } from '../context/AuthContext'; 
import * as Icons from 'lucide-react'; 

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [editProfile, setEditProfile] = useState({ 
    name: '', bio: '', skills: '', image: '',
    github: '', linkedin: '', gmail: '', phone: '', address: '' 
  });
  const [newProject, setNewProject] = useState({ 
    title: '', description: '', techStack: '', githubLink: '', liveLink: '', image: null 
  });

  const inputClasses = "w-full p-2 border rounded-lg bg-white text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:placeholder-gray-400";

  const loadPublicData = async () => {
    try {
      const [profileRes, projectsRes] = await Promise.all([
        api.get('/profile'),
        api.get('/projects')
      ]);
      setProfile(profileRes.data);
      setProjects(projectsRes.data);
      if (profileRes.data) {
        setEditProfile({ 
          ...profileRes.data, 
          skills: profileRes.data.skills.join(', '), 
          image: '' 
        });
      }
    } catch (error) { console.error("Error fetching public data:", error); }
  };

  const loadAdminData = async () => {
    if (!user) return;
    try {
      const msgRes = await api.get('/messages');
      setMessages(msgRes.data);
    } catch (error) { console.error("Error fetching admin messages:", error); }
  };

  useEffect(() => { loadPublicData(); }, []);
  useEffect(() => { if (user) { loadAdminData(); } }, [user]);

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

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(editProfile).forEach(key => {
      if (key === 'image') {
        if (editProfile[key] instanceof File) data.append('image', editProfile[key]);
      } else {
        data.append(key, editProfile[key]);
      }
    });
    try {
      await api.put('/profile', data);
      alert('Profile & Contact Info updated!');
      loadPublicData(); 
    } catch (err) { alert('Update failed.'); }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', newProject.title);
    data.append('description', newProject.description);
    data.append('techStack', newProject.techStack);
    if (newProject.githubLink) data.append('githubLink', newProject.githubLink);
    if (newProject.liveLink) data.append('liveLink', newProject.liveLink);
    if (newProject.image) data.append('image', newProject.image);
    try {
      await api.post('/projects', data);
      alert('Project added successfully!');
      setNewProject({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', image: null });
      document.getElementById('homeProjectImageInput').value = '';
      loadPublicData(); 
    } catch (err) { alert('Upload failed.'); }
  };

  const handleDeleteProject = async (id) => {
    if(!window.confirm('Delete project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      loadPublicData();
    } catch (err) { alert('Delete failed.'); }
  };

  const handleDeleteMessage = async (id) => {
    if(!window.confirm('Delete message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      loadAdminData();
    } catch (err) { alert('Delete failed.'); }
  };

  if (!profile) return <div className="text-center py-20 dark:text-white">Loading portfolio...</div>;

  return (
    <div className="space-y-24">
      <section id="profile" className="flex flex-col md:flex-row items-center gap-10 py-10 scroll-mt-20">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight dark:text-white">
            Hi, I'm <span className="text-blue-600">{profile.name}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {profile.skills.map((skill, index) => (
              <span key={`skill-${index}-${skill}`} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded-full text-sm font-medium">
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

      <ContactInfo profile={profile} />

      <section id="projects" className="scroll-mt-24">
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white">My Work</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No projects added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id || project.title} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div id="education" className="scroll-mt-24">
          <Education />
        </div>
        <div id="experience" className="scroll-mt-24">
          <Resume />
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto pb-10 scroll-mt-24">
        {user ? (
          <div className="space-y-12 bg-blue-50/30 dark:bg-gray-900/50 p-6 md:p-10 rounded-2xl border-2 border-blue-500 shadow-2xl">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 flex items-center gap-3 border-b-2 border-blue-500 pb-4">
              <Icons.Settings className="animate-spin-slow text-blue-600" size={32} /> Admin Dashboard
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Update Personal Info</h3>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" value={editProfile.name} onChange={e => setEditProfile({...editProfile, name: e.target.value})} className={inputClasses} />
                    <input type="text" placeholder="GitHub URL" value={editProfile.github} onChange={e => setEditProfile({...editProfile, github: e.target.value})} className={inputClasses} />
                    <input type="text" placeholder="LinkedIn URL" value={editProfile.linkedin} onChange={e => setEditProfile({...editProfile, linkedin: e.target.value})} className={inputClasses} />
                    <input type="email" placeholder="Gmail Address" value={editProfile.gmail} onChange={e => setEditProfile({...editProfile, gmail: e.target.value})} className={inputClasses} />
                    <input type="text" placeholder="Phone Number" value={editProfile.phone} onChange={e => setEditProfile({...editProfile, phone: e.target.value})} className={inputClasses} />
                    <input type="text" placeholder="Full Address" value={editProfile.address} onChange={e => setEditProfile({...editProfile, address: e.target.value})} className={inputClasses} />
                  </div>
                  <input type="text" placeholder="Skills (comma separated)" value={editProfile.skills} onChange={e => setEditProfile({...editProfile, skills: e.target.value})} className={inputClasses} />
                  <textarea placeholder="Bio" value={editProfile.bio} onChange={e => setEditProfile({...editProfile, bio: e.target.value})} className={inputClasses} rows="3" />
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Profile Image</label>
                    <input type="file" onChange={e => setEditProfile({...editProfile, image: e.target.files[0]})} className={inputClasses} />
                  </div>
                  <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Save All Information</button>
                </form>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex flex-col max-h-[550px]">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 dark:text-white"><Icons.Mail size={20}/> Contact Inbox</h3>
                <div className="overflow-y-auto space-y-4 pr-2">
                  {messages.length === 0 ? <p className="text-gray-500 italic">No new messages.</p> : messages.map((msg, idx) => (
                    <div key={msg._id || `msg-${idx}`} className="p-4 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 relative">
                      <button onClick={() => handleDeleteMessage(msg._id)} className="absolute top-2 right-2 text-red-500 hover:scale-110"><Icons.Trash2 size={18} /></button>
                      <h4 className="font-bold dark:text-white text-sm">{msg.name}</h4>
                      <p className="text-blue-500 text-xs mb-2">{msg.email}</p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2"><Icons.Plus size={20}/> Upload New Project</h3>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <input required type="text" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className={inputClasses} />
                  <textarea required placeholder="Project Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className={inputClasses} rows="3" />
                  <input required type="text" placeholder="Tech Stack (React, Node, etc.)" value={newProject.techStack} onChange={e => setNewProject({...newProject, techStack: e.target.value})} className={inputClasses} />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="url" placeholder="GitHub Link" value={newProject.githubLink} onChange={e => setNewProject({...newProject, githubLink: e.target.value})} className={inputClasses} />
                    <input type="url" placeholder="Live Link" value={newProject.liveLink} onChange={e => setNewProject({...newProject, liveLink: e.target.value})} className={inputClasses} />
                  </div>
                  <input id="homeProjectImageInput" required type="file" accept="image/*" onChange={e => setNewProject({...newProject, image: e.target.files[0]})} className={inputClasses} />
                  <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition">Publish Project</button>
                </form>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 flex flex-col max-h-[500px]">
                <h3 className="text-xl font-bold mb-4 dark:text-white flex items-center gap-2"><Icons.Layout size={20}/> Manage Projects</h3>
                <div className="overflow-y-auto space-y-2 pr-2">
                  {projects.map((p, idx) => (
                    <div key={p._id || `p-${idx}`} className="flex justify-between items-center p-3 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <span className="dark:text-white text-sm font-medium truncate pr-4">{p.title}</span>
                      <button onClick={() => handleDeleteProject(p._id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition">
                        <Icons.Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white">Get in Touch</h2>
            <form onSubmit={handleContactSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border dark:border-gray-700 space-y-4">
              <input required type="text" placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className={inputClasses} />
              <input required type="email" placeholder="Your Email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className={inputClasses} />
              <textarea required rows="4" placeholder="Your Message..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className={inputClasses}></textarea>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">Send Message</button>
              {formStatus && <p className="text-center mt-4 text-green-600 font-bold animate-pulse">{formStatus}</p>}
            </form>
          </div>
        )}
      </section>
    </div>
  );
}