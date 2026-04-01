import * as Icons from 'lucide-react';

export default function ContactInfo({ profile }) {
  if (!profile) return null;

  const renderIcon = (name, color) => {
    const Icon = Icons[name] || Icons.HelpCircle;
    return <Icon className={`${color} transition-colors`} size={22} />;
  };

  const cardClass = "flex items-center gap-3 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all shadow-sm group";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
      {profile.github && (
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className={cardClass}>
          {renderIcon('Github', 'text-gray-700 dark:text-gray-300 group-hover:text-blue-600')}
          <span className="dark:text-white font-semibold">GitHub</span>
        </a>
      )}
      {profile.linkedin && (
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={cardClass}>
          {renderIcon('Linkedin', 'text-blue-600')}
          <span className="dark:text-white font-semibold">LinkedIn</span>
        </a>
      )}
      {profile.gmail && (
        <a href={`mailto:${profile.gmail}`} className={cardClass}>
          {renderIcon('Mail', 'text-red-500')}
          <span className="dark:text-white font-semibold truncate">{profile.gmail}</span>
        </a>
      )}
      {profile.phone && (
        <div className={cardClass}>
          {renderIcon('Phone', 'text-green-500')}
          <span className="dark:text-white font-semibold">{profile.phone}</span>
        </div>
      )}
      {profile.address && (
        <div className={`${cardClass} md:col-span-2 lg:col-span-2`}>
          {renderIcon('MapPin', 'text-orange-500')}
          <span className="dark:text-white font-semibold">{profile.address}</span>
        </div>
      )}
    </div>
  );
}