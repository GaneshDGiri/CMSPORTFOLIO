import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 border-b-2 border-blue-500 inline-block pb-2 dark:text-white flex items-center gap-3">
        <GraduationCap size={32} className="text-blue-500" /> Education
      </h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 border-l-blue-500 transition hover:shadow-md">
          <h3 className="text-xl font-bold dark:text-white">Bachelor of Engineering in IT </h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">SKNSITS LONAVALA</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">2020 - 2024</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 border-l-blue-500 transition hover:shadow-md">
          <h3 className="text-xl font-bold dark:text-white">Higher Secondary Education</h3>
          <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">Purushottom dada Sonwanwane Collage</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">2019 - 2020</p>
        </div>
      </div>
    </div>
  );
}