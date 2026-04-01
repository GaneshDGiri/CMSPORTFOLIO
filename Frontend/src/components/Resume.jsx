import { Briefcase, Download, Eye } from 'lucide-react';

export default function Resume() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white flex items-center gap-3">
        <Briefcase size={32} className="text-blue-500" /> Experience & Resume
      </h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 border-l-green-500 transition hover:shadow-md">
          <h3 className="text-xl font-bold dark:text-white">Associate Trainee (Full Stack Developer)</h3>
          <p className="text-green-600 dark:text-green-400 font-medium mt-1">VcreaTeke Consulting</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">2025 - Present</p>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
            Developed and maintained multiple MERN stack web applications, focusing on scalable backend architectures and responsive React frontends.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-md">
            <Eye size={20} /> View Resume
          </a>
          <a href="public/Ganesh_Resume.pdf" download="Ganesh_Resume.pdf" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-white transition shadow-md">
            <Download size={20} /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}