export const PERSONAL_INFO = {
  name: 'Pandya Herry Sanjaykumar',
  preferredName: 'Herry Pandya',
  role: 'Full Stack Developer & CS Student',
  subheading: 'Building responsive, scalable web applications and intuitive digital experiences.',
  bio: 'Passionate Full Stack Developer and Computer Science enthusiast specializing in modern web applications, scalable backend systems, and clean UI/UX designs. Committed to continuous learning and building impactful digital solutions across the full software lifecycle.',
  email: 'pandyaherry51@gmail.com', // support user input email
  displayEmail: 'pandyaherry51@gmil.com',
  linkedin: 'https://www.linkedin.com/in/herry-pandya-928b602a3',
  github: 'https://github.com/herry-pandya',
  location: 'Gujarat, India',
  status: 'Open to internships & full-time opportunities',
};

export const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    description: 'Creating interactive, accessible, and responsive user interfaces.',
    skills: [
      { name: 'React.js', level: 'Advanced', icon: 'Atom' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', icon: 'Code' },
      { name: 'HTML5', level: 'Expert', icon: 'Layout' },
      { name: 'CSS3', level: 'Expert', icon: 'Palette' },
      { name: 'Tailwind CSS', level: 'Advanced', icon: 'Flame' },
    ],
  },
  {
    title: 'Backend & Databases',
    description: 'Engineering robust server APIs, business logic, and relational/NoSQL databases.',
    skills: [
      { name: 'Node.js', level: 'Advanced', icon: 'Server' },
      { name: 'Express.js', level: 'Advanced', icon: 'Cpu' },
      { name: 'MongoDB', level: 'Intermediate', icon: 'Database' },
      { name: 'MySQL', level: 'Intermediate', icon: 'Database' },
      { name: 'SQL', level: 'Intermediate', icon: 'Table' },
    ],
  },
  {
    title: 'Programming Languages & Core',
    description: 'Strong foundation in object-oriented programming, data structures, and algorithms.',
    skills: [
      { name: 'Java', level: 'Advanced', icon: 'Coffee' },
      { name: 'C', level: 'Intermediate', icon: 'Terminal' },
      { name: 'OOP & Data Structures', level: 'Advanced', icon: 'Layers' },
    ],
  },
  {
    title: 'Tools & Development Environment',
    description: 'Tools, IDEs, and version control systems powering daily development.',
    skills: [
      { name: 'VS Code', level: 'Expert', icon: 'FileCode' },
      { name: 'Android Studio', level: 'Intermediate', icon: 'Smartphone' },
      { name: 'Git & GitHub', level: 'Advanced', icon: 'GitBranch' },
      { name: 'Postman', level: 'Intermediate', icon: 'Send' },
    ],
  },
];

export const EDUCATION_EXPERIENCE = [
  {
    id: 1,
    type: 'education',
    title: 'Bachelor of Technology / Computer Science Engineering',
    institution: 'University / Institute of Technology',
    period: '2022 - Present',
    description: 'Pursuing comprehensive computer science degree with emphasis on core software engineering principles, algorithms, distributed systems, and modern web application development.',
    highlights: [
      'Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (Java/C), Database Management Systems (MySQL/SQL), Operating Systems, Computer Networks.',
      'Active participant in coding hackathons, technical symposia, and collaborative web engineering projects.',
      'Maintained consistent high academic performance across all semesters.',
    ],
  },
  {
    id: 2,
    type: 'experience',
    title: 'Full Stack Development Projects & Open Source',
    institution: 'Independent & Collaborative Projects',
    period: '2023 - Present',
    description: 'Architected and deployed full-stack web and mobile applications using the MERN stack, Java backend services, and Android Studio.',
    highlights: [
      'Developed and published responsive web applications utilizing React, Tailwind CSS, Node.js, Express, and MongoDB.',
      'Implemented secure RESTful APIs with JWT authentication, input validation, and role-based access control.',
      'Engineered Android applications in Java utilizing SQLite local caching and modern Material Design patterns.',
    ],
  },
];

