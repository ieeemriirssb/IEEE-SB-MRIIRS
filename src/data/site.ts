import ETS1 from "@/assets/ETS1.png";
import ETS2 from "@/assets/ETS2.png";
import ETS3 from "@/assets/ETS3.png";
import ETS4 from "@/assets/ETS4.png";
import ETS5 from "@/assets/ETS5.png";
import ETS6 from "@/assets/ETS6.png";
import ETS7 from "@/assets/ETS7.png";
import ETS8 from "@/assets/ETS8.png";
import ETS9 from "@/assets/ETS9.png";
import OnsiteTraining from "@/assets/OnsiteTraining.png";
import GoogleSuite from "@/assets/GoogleAISuite.png";
import TrainingInternship from "@/assets/TrainingINternship.png";
import PowerBI from "@/assets/PowerBi.png";
import IEEEDay from "@/assets/IEEEDay.png";
import IEEEYPDelhi from "@/assets/IEEEYPDELHI.png";
import MemberShipDriveP1 from "@/assets/MembershipDrivePhase1.png";
import AISmartLearning from "@/assets/AISmartLearning.png";
import Upcoming from "@/assets/Upcoming.png";

export const site = {
  collegeName: "Manav Rachna International Instititute of Research and Studies",
  shortName: "IEEE_SB_MRIIRS",
  branchName: "IEEE Student Branch MRIIRS",
  tagline: "Empowering Minds, Shaping the Future",
  email: "ieeemriirssb@gmail.com",
  address:
    "Plot A, Manav Rachna Campus Road, Gadakhor Basti Village, Sector 43, Faridabad, Haryana 121004, India",
  mapQuery: "Manav Rachna International Instititute of Research and Studies",
  social: {
    linkedin: "https://www.linkedin.com/company/mriirs-ieee",
    instagram: "https://www.instagram.com/ieee_mriirs_sb",
    youtube: "https://www.youtube.com/@IEEE_MRIIRS_SB",
    github: "https://github.com/ieeemriirssb",
  },
  joinUrl: "https://forms.gle/EoCp53FLxT9BU8hV6",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Team", to: "/team" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Membership", to: "/membership" },
  { label: "Resources", to: "/resources" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;

export const stats = [
  { value: 500, suffix: "+", label: "Students Reached" },
  { value: 21, suffix: "+", label: "Events Organized" },
  { value: 15, suffix: "+", label: "Technical Workshops" },
  { value: 10, suffix: "+", label: "Projects" },
  { value: 15, suffix: "+", label: "Student Volunteers" },
];

export const eventCategories = [
  "All",
  "Workshop",
  "Hackathon",
  "Seminar",
  "Competition",
  "Social",
  "Technical",
] as const;

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  category: string;
  excerpt: string;
  description: string;
  organizer: string;
  speakers: { name: string; role: string }[];
  agenda: { time: string; item: string }[];
  requirements: string[];
  faqs: { q: string; a: string }[];
  status: "Open" | "Closing Soon" | "Full" | "Completed" | "Upcoming";
  participants?: number;
  past?: boolean;
  image: string;
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=70`;

export const events: EventItem[] = [
  {
    slug: "expert-talk-series-9",
    title: "Expert Talk Series 9",
    date: "2026-08-26",
    dateLabel: "26 AUG 2026",
    time: "2:00 PM - 3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "An insightful expert talk on learning beyond academic boundaries, developing interdisciplinary knowledge, and leading beyond conventional labels.",
    description:
      "IEEE Student Branch MRIIRS, in association with the School of Computer Applications and Manav Rachna International Institute of Research and Studies, organized Expert Talk Series 9 featuring Mr. Amit Kumar, CS. The session focused on going beyond one's academic degree, learning across boundaries, and developing the ability to lead beyond conventional labels. With expertise spanning finance, learning, accounting, and industry, the session offered students a broader perspective on interdisciplinary learning and professional growth.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Mr. Amit Kumar, CS",
        role: "Finance Leader | Professor | Researcher",
      },
    ],
    agenda: [
      {
        time: "2:00 PM",
        item: "Expert Talk and Introduction",
      },
      {
        time: "2:15 PM",
        item: "Learning Across Boundaries",
      },
      {
        time: "2:35 PM",
        item: "Leading Beyond Labels",
      },
      {
        time: "2:50 PM",
        item: "Interactive Discussion",
      },
    ],

    requirements: [
      "No specific prerequisites required",
      "Interest in interdisciplinary learning and professional development",
    ],

    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in interdisciplinary learning, professional development, finance, learning, and industry.",
      },
      {
        q: "Who was the speaker?",
        a: "The session featured Mr. Amit Kumar, CS, a Finance Leader, Professor, and Researcher.",
      },
      {
        q: "What was the focus of the session?",
        a: "The session focused on going beyond one's degree, learning across boundaries, and developing leadership beyond conventional labels.",
      },
      {
        q: "Where was the session conducted?",
        a: "The session was conducted through a Teams Meeting.",
      },
    ],
    status: "Completed",
    past: true,
    image: ETS9.src,
  },
  {
    slug: "expert-talk-series-1",
    title: "Expert Talk Series 1",
    date: "2025-08-08",
    dateLabel: "08 AUG 2025",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "An insightful session focused on identifying meaningful research problems in emerging technologies and developing a research-oriented mindset.",
    description:
      "IEEE Student Branch MRIIRS launched its Expert Talk Series with an insightful session focused on identifying meaningful research problems in emerging technologies. The session introduced students to the research process, emerging technological domains, and approaches to recognising problems that can be transformed into viable research questions.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Dr. Yasir Afaq",
        role: "Assistant Professor, Department of Computer Science and Engineering, SRM University-AP",
      },
    ],
    agenda: [
      {
        time: "3:00 PM",
        item: "Emerging technologies",
      },
      {
        time: "3:15 PM",
        item: "Identifying meaningful research problems",
      },
      {
        time: "3:30 PM",
        item: "Understanding research opportunities",
      },
      {
        time: "3:45 PM",
        item: "Developing a research-oriented approach",
      },
    ],
    requirements: [
      "No specific prerequisites required",
      "Interest in technology, research, and emerging fields",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in technology, research, and emerging fields.",
      },
      {
        q: "Was prior research experience required?",
        a: "No prior research experience was required.",
      },
      {
        q: "What was the focus of the session?",
        a: "Identifying and understanding research problems in emerging technologies.",
      },
    ],
    status: "Completed",
    past: true,
    image: ETS1.src,
  },

  {
    slug: "expert-talk-series-2",
    title: "Expert Talk Series 2",
    date: "2025-08-22",
    dateLabel: "22 Aug 2025",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "A practical session helping students understand research writing, manuscript preparation, journal selection, plagiarism, and responsible use of AI tools.",
    description:
      "Expert Talk Series 2 focused on helping students understand the journey from developing a research idea to successfully communicating and publishing it. The session covered research writing, manuscript preparation and submission, journal categories, plagiarism awareness, and the responsible use of AI tools in research.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Dr. Vinay Kumar Pandey",
        role: "Researcher / Academic",
      },
    ],
    agenda: [
      {
        time: "3:00 PM",
        item: "Introduction to research writing",
      },
      {
        time: "3:15 PM",
        item: "Manuscript preparation and submission",
      },
      {
        time: "3:30 PM",
        item: "Journal selection and categories",
      },
      {
        time: "3:45 PM",
        item: "Plagiarism awareness",
      },
      {
        time: "4:00 PM",
        item: "Useful AI tools for research",
      },
      {
        time: "4:15 PM",
        item: "Interaction and Q&A",
      },
    ],
    requirements: [
      "No specific prerequisites required",
      "Interest in research and academic publication",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in research and academic publication.",
      },
      {
        q: "Did participants need prior research experience?",
        a: "No prior research experience was required.",
      },
      {
        q: "What topics were covered?",
        a: "Research writing, manuscript submission, journals, plagiarism, and AI tools.",
      },
    ],
    status: "Completed",
    past: true,
    image: ETS2.src,
  },

  {
    slug: "expert-talk-series-3",
    title: "Expert Talk Series 3",
    date: "2025-09-05",
    dateLabel: "05 Sep 2025",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "A continuation of the IEEE Student Branch MRIIRS initiative connecting students with experts from academia and industry.",
    description:
      "Expert Talk Series 3 continued IEEE Student Branch MRIIRS's initiative of connecting students with experts from academia and industry. The series provided students with exposure to current technological developments, research opportunities, professional pathways, and practical insights.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Mr. Sandesh Agarwal",
        role: "Sr. Manager, Verispire Inc.",
      },
    ],
    agenda: [
      {
        time: "3:00 PM",
        item: "Current technological developments",
      },
      {
        time: "3:15 PM",
        item: "Research opportunities",
      },
      {
        time: "3:30 PM",
        item: "Professional pathways",
      },
      {
        time: "3:45 PM",
        item: "Real-world applications",
      },
    ],
    requirements: [
      "Interest in technology, research, and professional development",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in technology, research, and professional development.",
      },
      {
        q: "What was the purpose of the session?",
        a: "To connect students with experts and provide practical insights into technology and research.",
      },
    ],
    status: "Completed",
    past: true,
    image: ETS3.src,
  },

  {
    slug: "expert-talk-series-4",
    title: "Expert Talk Series 4",
    date: "2025-09-12",
    dateLabel: "12 SEP 2025",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "A research-focused session covering research writing, publication practices, and the fundamentals of building a stronger research profile.",
    description:
      "Expert Talk Series 4 focused on strengthening students' understanding of research writing and academic publications. The session covered the fundamentals required to build a stronger research profile, including research writing, publication practices, and the broader academic research ecosystem.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Dr. Vinay Kumar Pandey",
        role: "Research & Development Cell at, MRIIRS",
      },
    ],
    agenda: [
      {
        time: "3:00 PM",
        item: "Research profile development",
      },
      {
        time: "3:15 PM",
        item: "Fundamentals of research writing",
      },
      {
        time: "3:30 PM",
        item: "Publication process",
      },
      {
        time: "3:45 PM",
        item: "Academic research practices",
      },
      {
        time: "4:00 PM",
        item: "Interaction with the expert",
      },
    ],
    requirements: [
      "No prior publication experience required",
      "Interest in research and publications",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in research and publications.",
      },
      {
        q: "Was prior publication experience necessary?",
        a: "No prior publication experience was required.",
      },
      {
        q: "What was the objective?",
        a: "To help students understand the fundamentals of research writing and publications.",
      },
    ],
    status: "Completed",
    participants: 40,
    past: true,
    image: ETS4.src,
  },

  {
    slug: "expert-talk-series-5",
    title: "Expert Talk Series 5",
    date: "2025-11-11",
    dateLabel: "11 Nov 2025",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "A continuation of the branch's expert interaction programme bringing specialised knowledge and expert perspectives to students.",
    description:
      "Expert Talk Series 5 continued the branch's effort to bring specialised knowledge and expert perspectives directly to students. The series provided students with opportunities to engage with professionals and academics and understand emerging developments in technology and research.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Dr. Shagufta Jabin",
        role: "Head of Department SET, MRIIRS",
      },
    ],
    agenda: [
      {
        time: "3:15 PM",
        item: "Expert interaction",
      },
      {
        time: "3:30 PM",
        item: "Emerging technology developments",
      },
      {
        time: "3:45 PM",
        item: "Research perspectives",
      },
    ],
    requirements: [
      "Interest in technology, research, and professional development",
    ],
    faqs: [
      {
        q: "What was the purpose?",
        a: "To provide students with specialised knowledge and expert perspectives.",
      },
      {
        q: "Was this part of a larger series?",
        a: "Yes. It formed part of the Expert Talk Series.",
      },
    ],
    status: "Completed",
    past: true,
    image: ETS5.src,
  },

  {
    slug: "expert-talk-series-6",
    title: "Expert Talk Series 6",
    date: "2025-11-21",
    dateLabel: "21 Nov 2025",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "A session exploring cybersecurity, privacy, ethics, online safety, and responsible digital behaviour on social networks.",
    description:
      "Expert Talk Series 6 addressed cybersecurity, privacy, ethics, online safety, and responsible digital behaviour on social networks. The session explored cybersecurity threats, phishing, identity theft, misinformation, and responsible use of social platforms.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Dr. Manorama Patnaik",
        role: "Assistant Professor (Grade III), Amity University Jharkhand",
      },
    ],
    agenda: [
      {
        time: "3:00 PM",
        item: "Cybersecurity fundamentals",
      },
      {
        time: "3:15 PM",
        item: "Social-network security",
      },
      {
        time: "3:30 PM",
        item: "Privacy",
      },
      {
        time: "3:45 PM",
        item: "Phishing and identity theft",
      },
      {
        time: "4:00 PM",
        item: "Misinformation",
      },
      {
        time: "4:15 PM",
        item: "Ethical and responsible digital behaviour",
      },
      {
        time: "4:30 PM",
        item: "Q&A",
      },
    ],
    requirements: [
      "No technical cybersecurity knowledge required",
      "Interest in cybersecurity, technology, and digital safety",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in cybersecurity, technology, and digital safety.",
      },
      {
        q: "Was technical cybersecurity knowledge required?",
        a: "No.",
      },
      {
        q: "What was the main focus?",
        a: "Understanding cyber risks and ethical behaviour on social networks.",
      },
    ],
    status: "Completed",
    past: true,
    image: ETS6.src,
  },

  {
    slug: "expert-talk-series-7",
    title: "Expert Talk Series 7",
    date: "2026-02-06",
    dateLabel: "06 FEB 2026",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "An expert session exploring Generative AI, healthcare applications, smart health systems, and research opportunities.",
    description:
      "Expert Talk Series 7 explored the growing role of Generative AI in healthcare and smart health systems. The session introduced students to Generative AI, different categories of AI models, healthcare applications, and research challenges in healthcare AI.",
    organizer:
      "IEEE MRIIRS Student Branch; Manav Rachna School of Computer Applications",
    speakers: [
      {
        name: "Dr. Sonali Vyas",
        role: "Senior Associate Professor, UPES University",
      },
    ],
    agenda: [
      {
        time: "3:00 PM",
        item: "Introduction to Generative AI",
      },
      {
        time: "3:15 PM",
        item: "Types of AI models",
      },
      {
        time: "3:30 PM",
        item: "Healthcare applications",
      },
      {
        time: "3:45 PM",
        item: "Doximity's Dialer case study",
      },
      {
        time: "4:00 PM",
        item: "Research opportunities and challenges",
      },
      {
        time: "4:15 PM",
        item: "Discussion and Q&A",
      },
    ],
    requirements: [
      "Interest in AI, healthcare technology, and emerging research areas",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in AI, healthcare technology, and emerging research areas.",
      },
      {
        q: "What case study was discussed?",
        a: "Doximity's Dialer.",
      },
    ],
    status: "Completed",
    past: true,
    image: ETS7.src,
  },

  {
    slug: "expert-talk-series-8",
    title: "Expert Talk Series 8",
    date: "2026-04-03",
    dateLabel: "03 Apr 2026",
    time: "3:00 PM",
    location: "Online",
    category: "Seminar",
    excerpt:
      "The continuation of IEEE Student Branch MRIIRS's expert interaction initiative.",
    description:
      "Expert Talk Series 8 continued IEEE Student Branch MRIIRS's expert interaction initiative, bringing professionals and academics from diverse domains closer to students and enabling participants to explore emerging technologies, research opportunities, professional pathways, and real-world applications.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Dr. Ritu Sachdeva",
        role: "Assistant Professor MRIIRS SCA",
      },
    ],
    agenda: [
      {
        time: "3:00 PM",
        item: "Expert interaction",
      },
      {
        time: "3:15 PM",
        item: "Emerging technologies",
      },
      {
        time: "3:30 PM",
        item: "Research opportunities",
      },
      {
        time: "3:45 PM",
        item: "Professional pathways",
      },
      {
        time: "4:00 PM",
        item: "Real-world applications",
      },
    ],
    requirements: [
      "Interest in technology, research, and professional development",
    ],
    faqs: [],
    status: "Completed",
    past: true,
    image: ETS8.src,
  },

  {
    slug: "on-site-training-session",
    title: "IEEE Student Branch MRIIRS — On-Site Training Session",
    date: "2026-02-16",
    dateLabel: "16 Feb 2026",
    time: "12:00 PM",
    location: "MRIIRS Campus, Faridabad",
    category: "Technical",
    excerpt:
      "A practical on-site training session providing students with direct exposure, demonstrations, and hands-on learning.",
    description:
      "IEEE Student Branch MRIIRS conducted an on-site technical training session designed to provide students with direct practical exposure to the subject being covered. The session focused on hands-on learning and direct interaction between the trainer and participants.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Ritesh Kumar",
        role: "IEEE Trainer",
      },
    ],
    agenda: [
      {
        time: "12:00 PM",
        item: "Trainer-led instruction",
      },
      {
        time: "12:30 PM",
        item: "Practical demonstrations",
      },
      {
        time: "1:00 PM",
        item: "Participant interaction",
      },
      {
        time: "1:30 PM",
        item: "Hands-on learning",
      },
    ],
    requirements: ["MRIIRS students"],
    faqs: [
      {
        q: "Who could attend?",
        a: "MRIIRS students.",
      },
      {
        q: "Was the session hands-on?",
        a: "Yes, the session was designed around practical on-site training.",
      },
    ],
    status: "Completed",
    past: true,
    image: OnsiteTraining.src,
  },

  {
    slug: "power-bi-from-data-to-dashboards",
    title: "Power BI: From Data to Dashboards",
    date: "2025-09-19",
    dateLabel: "19 Sep 2025",
    time: "12:00 PM",
    location: "MRIIRS Campus, Faridabad",
    category: "Workshop",
    excerpt:
      "A hands-on programme covering Power BI, data preparation, visualisation, dashboard development, and DAX.",
    description:
      "Power BI: From Data to Dashboards was a hands-on learning programme designed to take students through the complete workflow of using Microsoft Power BI for data analysis and visualisation.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Mr. Priyanshu Maheshwari",
        role: "Data Analytics and Business Intelligence",
      },
      {
        name: "Mr. Garvit Bathla",
        role: "Data Analytics & Business Intelligence",
      },
    ],
    agenda: [
      {
        time: "12:00 PM",
        item: "Introduction to Power BI",
      },
      {
        time: "12:15 PM",
        item: "Importing data",
      },
      {
        time: "12:30 PM",
        item: "Data cleaning and transformation",
      },
      {
        time: "12:45 PM",
        item: "Data modelling",
      },
      {
        time: "1:00 PM",
        item: "Visualisations",
      },
      {
        time: "1:15 PM",
        item: "Dashboard development",
      },
      {
        time: "1:30 PM",
        item: "DAX",
      },
      {
        time: "1:45 PM",
        item: "Practical exercises",
      },
    ],
    requirements: [
      "Interest in data analytics and visualisation",
      "No prior Power BI knowledge required",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students interested in data analytics and visualisation.",
      },
      {
        q: "Was prior Power BI knowledge required?",
        a: "No.",
      },
      {
        q: "What was the outcome?",
        a: "Participants developed practical Power BI and dashboard-building skills.",
      },
    ],
    status: "Completed",
    past: true,
    image: PowerBI.src,
  },

  {
    slug: "one-week-skill-development-workshop",
    title: "Google Suite",
    date: "2026-02-23",
    dateLabel: "23 FEB - 01 MAR 2026",
    time: "11:00 AM - 1:00 PM",
    location: "MRIIRS Campus, Faridabad",
    category: "Workshop",
    excerpt:
      "A one-week practical programme covering Google Forms, Excel, PowerPoint, Generative AI, and Prompt Engineering.",
    description:
      "IEEE MRIIRS Student Branch organised a one-week skill-development workshop focused on practical, career-oriented digital skills. The programme covered Google Forms, Microsoft Excel, Microsoft PowerPoint, Generative AI, and Prompt Engineering, along with assignments, a final project, and an online assessment.",
    organizer:
      "IEEE MRIIRS Student Branch; Manav Rachna School of Computer Applications",
    speakers: [
      {
        name: "Mr. Priyanshu Maheshwari",
        role: "Data Analytics and Business Intelligence",
      },
      {
        name: "Mr. Garvit Bathla",
        role: "Data Analytics & Business Intelligence",
      },
      {
        name: "Mr. Bhaskar Mishra",
        role: "Data Analytics & Business Intelligence",
      },
    ],
    agenda: [
      {
        time: "23 Feb",
        item: "Google Forms",
      },
      {
        time: "24 Feb",
        item: "Microsoft Excel",
      },
      {
        time: "25 Feb",
        item: "Microsoft PowerPoint",
      },
      {
        time: "26 Feb",
        item: "Generative AI fundamentals",
      },
      {
        time: "27 Feb",
        item: "Prompt Engineering",
      },
      {
        time: "28 Feb",
        item: "Assignments",
      },
      {
        time: "1 March",
        item: "Final project",
      },
      {
        time: "1 March",
        item: "Online assessment",
      },
    ],
    requirements: [
      "No prior experience required",
      "Interest in practical digital and AI skills",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students seeking practical digital and AI skills.",
      },
      {
        q: "Was prior experience required?",
        a: "No.",
      },
      {
        q: "Was a certificate provided?",
        a: "Yes, upon successful completion.",
      },
    ],
    status: "Completed",
    past: true,
    image: GoogleSuite.src,
  },

  {
    slug: "training-cum-internship-programme-2026",
    title: "IEEE Student Branch MRIIRS Training-cum-Internship Program 2026",
    date: "2026-06-08",
    dateLabel: "08 JUN - 08 JUL 2026",
    time: "09:00 AM",
    location: "Hybrid Mode",
    category: "Technical",
    excerpt:
      "A four-week intensive programme offering Data Analytics, IT & IoT, AI/ML & Computer Vision, and Digital Marketing tracks.",
    description:
      "The IEEE Student Branch MRIIRS Training-cum-Internship Programme 2026 was a four-week intensive programme designed to bridge the gap between classroom learning and industry expectations. The programme offered four specialised tracks: Data Analytics, IT & IoT, AI/ML & Computer Vision, and Digital Marketing.",
    organizer:
      "IEEE Student Branch MRIIRS; Manav Rachna School of Computer Applications",
    speakers: [
      {
        name: "Acezd Consultancy",
        role: "Organization — Data Analytics",
      },
      {
        name: "Vorkz Pvt. Ltd.",
        role: "Organization — IT & IoT",
      },
      {
        name: "LNCT Drone Centre of Excellence",
        role: "Organization — AI/ML & Computer Vision",
      },
      {
        name: "Vaibhav Saxena",
        role: "Co-Founder, Travellr.in — Digital Marketing",
      },
    ],
    agenda: [
      {
        time: "08 Jun",
        item: "Data Analytics track",
      },
      {
        time: "15 Jun",
        item: "IT & IoT track",
      },
      {
        time: "22 Jun",
        item: "AI/ML & Computer Vision track",
      },
      {
        time: "29 Jun",
        item: "Digital Marketing track",
      },
      {
        time: "30 Jun",
        item: "Domain-specific technical sessions",
      },
      {
        time: "1 Jul",
        item: "Practical assignments",
      },
      {
        time: "2 Jul",
        item: "Real-world projects",
      },
      {
        time: "8 Jul",
        item: "Mentorship and project showcase",
      },
    ],
    requirements: [
      "Regular attendance",
      "Active participation",
      "Completion of assigned work",
      "Development of respective projects",
    ],
    faqs: [
      {
        q: "What domains were available?",
        a: "Data Analytics, IT & IoT, AI/ML & Computer Vision, and Digital Marketing.",
      },
      {
        q: "What was the mode?",
        a: "Hybrid.",
      },
      {
        q: "How long was the programme?",
        a: "Four weeks / one month.",
      },
      {
        q: "Was it only theoretical?",
        a: "No. The programme included practical projects and mentorship.",
      },
      {
        q: "Was certification provided?",
        a: "Yes, an official IEEE certification was part of the programme.",
      },
    ],
    status: "Completed",
    participants: 40,
    past: true,
    image: TrainingInternship.src,
  },

  {
    slug: "ai-for-smarter-learning",
    title: "AI for Smarter Learning Workshop",
    date: "2025-11-21",
    dateLabel: "21 NOV 2025",
    time: "12:00 PM",
    location:
      "Rajkiya Varishth Madhyamik Vidyalaya, Sirohi Kalan, Sector 84, Faridabad",
    category: "Workshop",
    excerpt:
      "A community outreach programme introducing school students to AI, responsible technology use, and future opportunities.",
    description:
      "As part of its Corporate Social Responsibility initiatives, IEEE Student Branch MRIIRS conducted AI for Smarter Learning, a community outreach programme for students of Classes 9 to 12 at a government school in Faridabad. The initiative introduced students to Artificial Intelligence in education and everyday life while encouraging curiosity about technology and future career opportunities.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Himani Singhal",
        role: "Student Volunteer",
      },
      {
        name: "Aamnah Faiyaz",
        role: "Student Volunteer",
      },
      {
        name: "Ms. Sunita Joshi",
        role: "IEEE Student Branch Counselor",
      },
    ],
    agenda: [
      {
        time: "12:00 PM",
        item: "Introduction to AI",
      },
      {
        time: "12:15 PM",
        item: "AI in education",
      },
      {
        time: "12.30 PM",
        item: "Everyday applications",
      },
      {
        time: "12.45 PM",
        item: "Career guidance",
      },
      {
        time: "01:00 PM",
        item: "One-on-one interactions",
      },
      {
        time: "01:15 PM",
        item: "Group discussions",
      },
      {
        time: "01:30 PM",
        item: "Responsible technology use",
      },
    ],
    requirements: ["Students of Classes 9-12"],
    faqs: [
      {
        q: "Who was the programme for?",
        a: "Students of Classes 9-12.",
      },
      {
        q: "Where was it conducted?",
        a: "Rajkiya Varishth Madhyamik Vidyalaya, Sirohi Kalan, Faridabad.",
      },
      {
        q: "What was the objective?",
        a: "To build AI awareness and encourage students to explore future opportunities in technology.",
      },
      {
        q: "How many students participated?",
        a: "64 students.",
      },
    ],
    status: "Completed",
    participants: 64,
    past: true,
    image: AISmartLearning.src,
  },

  {
    slug: "ieee-membership-drive-phase-1",
    title: "IEEE MRIIRS Student Branch Membership Drive Phase 1",
    date: "2025-07-23",
    dateLabel: "23 Jul 2025",
    time: "12:00 PM",
    location: "MRIIRS Campus, Faridabad",
    category: "Social",
    excerpt:
      "An IEEE awareness and membership initiative introducing students to professional networking, technical learning, leadership, competitions, and workshops.",
    description:
      "The IEEE MRIIRS Student Branch Membership Drive was organised to introduce students to the opportunities offered through IEEE and encourage them to become part of the wider IEEE community. The initiative highlighted professional networking, technical learning, participation in IEEE activities, student leadership, competitions, workshops, and exposure to the global technology community.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [
      {
        name: "Mrs. Sunita Joshi",
        role: "IEEE Faculty Head",
      },
    ],
    agenda: [
      {
        time: "12:00 PM",
        item: "Introduction to IEEE",
      },
      {
        time: "12:10 PM",
        item: "Membership benefits",
      },
      {
        time: "12:20 PM",
        item: "Student Branch activities",
      },
      {
        time: "12:30 PM",
        item: "Technical and professional development opportunities",
      },
      {
        time: "12:40 PM",
        item: "Membership guidance and registration",
      },
    ],
    requirements: ["MRIIRS students"],
    faqs: [
      {
        q: "Who could attend?",
        a: "MRIIRS students.",
      },
      {
        q: "How many students attended?",
        a: "500+ students.",
      },
    ],
    status: "Completed",
    participants: 500,
    past: true,
    image: MemberShipDriveP1.src,
  },

  {
    slug: "ieee-week-2025",
    title: "IEEE Week/Multi-Event 2025",
    date: "2025-10-06",
    dateLabel: "6 Oct - 13 Oct 2025",
    time: "12:00 PM",
    location: "MRIIRS Campus SCA, Faridabad",
    category: "Social",
    excerpt:
      "A week-long IEEE celebration combining technical, professional, creative, interactive, and community activities.",
    description:
      "IEEE Week 2025 was celebrated as a week-long initiative designed to bring the IEEE community together through a combination of technical, professional, and interactive activities. The celebration provided students with opportunities to engage with IEEE's values of innovation, learning, collaboration, and technological advancement.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [],
    agenda: [
      {
        time: "6 Oct",
        item: "Identification of Research Area",
      },
      {
        time: "7 Oct",
        item: "Literature Review",
      },
      {
        time: "8 Oct",
        item: "Methodology of Research",
      },
      {
        time: "9 oct",
        item: "Preliminary Data",
      },
      {
        time: "10 Oct",
        item: "Statement & Limitation",
      },
      {
        time: "11 Oct",
        item: "Research Paper Expo",
      },
      {
        time: "13 Oct",
        item: "Facilitating 2025 IEEE EXCOM Member",
      },
    ],
    requirements: ["MRIIRS students", "IEEE community members"],
    faqs: [
      {
        q: "Who could participate?",
        a: "MRIIRS students and IEEE community members.",
      },
      {
        q: "What activities were included?",
        a: "Technical, professional, creative, interactive, and community-focused activities.",
      },
    ],
    status: "Completed",
    past: true,
    image: IEEEDay.src,
  },

  {
    slug: "ieee-yp-delhi-summit-1",
    title: "IEEE YP Delhi Summit 1.0",
    date: "2026-05-30",
    dateLabel: "30-31 MAY 2026",
    time: "9:00 AM onwards",
    location:
      "Manav Rachna International Institute of Research and Studies, Faridabad, Haryana",
    category: "Technical",
    excerpt:
      "A two-day professional development and networking summit bringing together students, young professionals, researchers, and industry leaders.",
    description:
      "IEEE YP Delhi Summit 1.0 brought together students, young professionals, industry leaders, researchers, and members of the IEEE community for two days of professional development, networking, technology exposure, and career-oriented interaction. MRIIRS IEEE Student Branch served as an Organizing Partner for the summit in collaboration with IEEE Young Professionals Delhi Section.",
    organizer:
      "IEEE Young Professionals Delhi Section; MRIIRS IEEE Student Branch as Organizing Partner",
    speakers: [
      {
        name: "Industry and IEEE professionals",
        role: "Professional and industry speakers",
      },
    ],
    agenda: [
      {
        time: "09:00 AM",
        item: "Industry-readiness sessions",
      },
      {
        time: "09:15 AM",
        item: "HR and placement guidance",
      },
      {
        time: "09:30 AM",
        item: "Mock interviews",
      },
      {
        time: "09:45 AM",
        item: "Live hiring opportunities",
      },
      {
        time: "10:00 AM",
        item: "AI hands-on workshop",
      },
      {
        time: "10:15 AM",
        item: "Networking",
      },
      {
        time: "10:30 AM",
        item: "Professional-development sessions",
      },
    ],
    requirements: [
      "Students",
      "Young professionals",
      "Researchers",
      "Academicians",
      "Industry professionals",
    ],
    faqs: [
      {
        q: "Who could attend?",
        a: "Students, young professionals, researchers, academicians, and industry professionals.",
      },
      {
        q: "Where was it held?",
        a: "MRIIRS, Faridabad.",
      },
      {
        q: "What was the focus?",
        a: "Career development, networking, emerging technologies, and professional readiness.",
      },
    ],
    status: "Completed",
    past: true,
    image: IEEEYPDelhi.src,
  },

  {
    slug: "capture-the-flag-ctf",
    title: "Capture The Flag (CTF)",
    date: "",
    dateLabel: "",
    time: "",
    location: "MRIIRS Campus, Faridabad",
    category: "Competition",
    excerpt:
      "An upcoming challenge-based cybersecurity experience designed to develop security awareness, problem-solving, and practical technical skills.",
    description:
      "The upcoming Capture The Flag initiative is intended to provide students with an engaging, challenge-based cybersecurity experience. Participants will solve technical and logical problems designed to test analytical thinking, security awareness, problem-solving, and practical technical skills.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [],
    agenda: [
      {
        time: "",
        item: "Challenge-based cybersecurity problems",
      },
      {
        time: "",
        item: "Cryptography",
      },
      {
        time: "",
        item: "Web security",
      },
      {
        time: "",
        item: "OSINT",
      },
      {
        time: "",
        item: "Reverse engineering",
      },
      {
        time: "",
        item: "Forensics",
      },
    ],
    requirements: ["Interest in cybersecurity", "Problem-solving mindset"],
    faqs: [],
    status: "Upcoming",
    image: Upcoming.src,
  },

  {
    slug: "expert-talk-series-upcoming",
    title: "Expert Talk Series — Upcoming Session",
    date: "",
    dateLabel: "",
    time: "",
    location: "Online",
    category: "Seminar",
    excerpt:
      "An upcoming expert interaction providing students with exposure to emerging technologies, research opportunities, industry practices, and career pathways.",
    description:
      "IEEE Student Branch MRIIRS will continue its Expert Talk Series with additional sessions featuring experts from diverse technological, academic, and professional domains. The initiative is designed to give students direct access to experienced professionals and researchers while exposing them to emerging technologies, current industry practices, research opportunities, career pathways, and real-world applications.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [],
    agenda: [
      {
        time: "",
        item: "Expert interaction",
      },
      {
        time: "",
        item: "Emerging technologies",
      },
      {
        time: "",
        item: "Current industry practices",
      },
      {
        time: "",
        item: "Research opportunities",
      },
      {
        time: "",
        item: "Career pathways",
      },
      {
        time: "",
        item: "Real-world applications",
      },
    ],
    requirements: ["Interest in technology and professional development"],
    faqs: [],
    status: "Upcoming",
    image: Upcoming.src,
  },

  {
    slug: "csr-activity",
    title: "CSR Activity",
    date: "",
    dateLabel: "",
    time: "",
    location: "",
    category: "Social",
    excerpt:
      "An upcoming community outreach initiative aimed at extending technology, education, and awareness beyond the university campus.",
    description:
      "Building on its previous AI-focused community outreach initiative, IEEE Student Branch MRIIRS is planning another CSR activity aimed at extending the benefits of technology, education, and awareness beyond the university campus. The initiative will provide participants from the beneficiary community with meaningful exposure to technology while promoting responsible innovation and social impact.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [],
    agenda: [
      {
        time: "",
        item: "Community technology awareness",
      },
      {
        time: "",
        item: "Educational engagement",
      },
      {
        time: "",
        item: "Responsible innovation",
      },
      {
        time: "",
        item: "Social impact",
      },
    ],
    requirements: [],
    faqs: [],
    status: "Upcoming",
    image: Upcoming.src,
  },

  {
    slug: "networking-activity",
    title: "Networking Activity",
    date: "",
    dateLabel: "",
    time: "",
    location: "",
    category: "Social",
    excerpt:
      "An upcoming networking initiative providing students opportunities to connect with peers, IEEE members, professionals, and technology enthusiasts.",
    description:
      "The upcoming networking activity will provide students with an opportunity to connect with peers, IEEE members, professionals, and technology enthusiasts in an informal and engaging environment. The initiative is intended to encourage meaningful conversations, exchange of ideas, professional connections, collaboration, and peer learning.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [],
    agenda: [
      {
        time: "",
        item: "Peer networking",
      },
      {
        time: "",
        item: "Professional interaction",
      },
      {
        time: "",
        item: "Exchange of ideas",
      },
      {
        time: "",
        item: "Collaboration and peer learning",
      },
    ],
    requirements: ["Interest in networking and professional development"],
    faqs: [],
    status: "Upcoming",
    image: Upcoming.src,
  },

  {
    slug: "ieee-week-2026",
    title: "IEEE Week 2026",
    date: "",
    dateLabel: "",
    time: "",
    location: "",
    category: "Social",
    excerpt:
      "A flagship IEEE celebration bringing together technical, professional, creative, interactive, and community activities.",
    description:
      "IEEE Week 2026 will serve as a flagship celebration of the IEEE community at MRIIRS, bringing together technical, professional, creative, and interactive activities throughout the week. The celebration will provide students with opportunities to participate in technical challenges, expert interactions, networking initiatives, workshops, competitions, and community-focused activities.",
    organizer: "IEEE Student Branch MRIIRS",
    speakers: [],
    agenda: [
      {
        time: "",
        item: "Technical challenges",
      },
      {
        time: "",
        item: "Expert interactions",
      },
      {
        time: "",
        item: "Networking initiatives",
      },
      {
        time: "",
        item: "Workshops",
      },
      {
        time: "",
        item: "Competitions",
      },
      {
        time: "",
        item: "Community-focused activities",
      },
    ],
    requirements: ["MRIIRS students", "IEEE community members"],
    faqs: [],
    status: "Upcoming",
    image: Upcoming.src,
  },
];

export const upcomingEvents = events.filter((e) => !e.past);
export const pastEvents = events.filter((e) => e.past);

export type Member = {
  slug: string;
  name: string;
  position: string;
  department: string;
  group: string;
  bio: string;
  linkedin?: string;
  github?: string;
  membershipId?: string;
  image: string;
};

const portrait = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=600&q=70`;

export const team: Member[] = [
  // =====================================================
  // SESSION 2026–27 — CURRENT
  // ====================================================
  {
    slug: "aamnah-faiyaz",
    name: "Aamnah Faiyaz",
    position: "President",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "President of IEEE Student Branch MRIIRS for the 2026-27 session, leading the branch's initiatives, events, technical activities and student engagement.",
    linkedin: "https://www.linkedin.com/in/aamnah-faiyaz06",
    github: "https://github.com/AamnahFaiyaz",
    membershipId: "101236916",
    image: "/teamphoto/Aamnah.jpg",
  },
  {
    slug: "himani-singhal-2026",
    name: "Himani Singhal",
    position: "Vice President",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Vice President of IEEE Student Branch MRIIRS for the 2026-27 session, supporting branch leadership, planning and execution of activities.",
    linkedin: "https://www.linkedin.com/in/himani-singhal-a4b096318",
    membershipId: "101238190",
    image: "/teamphoto/Himani.png",
  },
  {
    slug: "isha-2026",
    name: "Isha",
    position: "Secretary",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Secretary of IEEE Student Branch MRIIRS for the 2026-27 session, responsible for documentation, coordination and branch administration.",
    linkedin: "https://www.linkedin.com/in/isha-rawat-690599203",
    github: "https://github.com/Isha4040",
    image: portrait("photo-1487412720507-e7ab37603c6f"),
  },
  {
    slug: "yashveer-singh",
    name: "Yashveer Singh",
    position: "Treasurer",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Treasurer of IEEE Student Branch MRIIRS for the 2026-27 session, supporting financial planning and management of branch activities.",
    linkedin: "https://www.linkedin.com/in/yashveer-singh-029b08347",
    github: "https://github.com/yashveer976679",
    image: "/teamphoto/Yashveer.png",
  },
  {
    slug: "shahnaz-ansari",
    name: "Shahnaz Ansari",
    position: "Social Media",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Social Media handler of IEEE Student Branch MRIIRS for the 2026-27 session, helps in maintaining social media presence for IEEE SB MRIIRS.",
    linkedin: "https://www.linkedin.com/in/shahnaz-ansari1714/",
    github: "https://github.com/shahnaz14",
    image: "/teamphoto/Shahnaz.png",
  },
  {
    slug: "manneet-kaur",
    name: "Manneet Kaur",
    position: "Webmaster",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Webmaster of IEEE Student Branch MRIIRS for the 2026-27 session, managing the branch's web presence and digital platforms.",
    linkedin: "https://www.linkedin.com/in/manmeetkaurcs",
    image: portrait("photo-1517841905240-472988babdf9"),
  },
  {
    slug: "ayush-ranjan-tiwari",
    name: "Ayush Ranjan Tiwari",
    position: "Operations Head",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Operations Head of IEEE Student Branch MRIIRS for the 2026-27 session, coordinating operational planning and execution of branch activities.",
    linkedin: "#",
    image: "/teamphoto/Ayush.png",
  },
  {
    slug: "rahul-patel",
    name: "Rahul Patel",
    position: "Technical Head",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Technical Head of IEEE Student Branch MRIIRS for the 2026-27 session, leading technical initiatives, workshops and learning activities.",
    linkedin: "https://in.linkedin.com/in/rahul-patel-3a626435b",
    github: "https://github.com/rahul0679",
    image: "/teamphoto/Rahulpfp.png",
  },
  {
    slug: "sneha-siddhu",
    name: "Sneha Siddhu",
    position: "Report Head",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Report Head of IEEE Student Branch MRIIRS for the 2026-27 session, overseeing event documentation and reporting.",
    linkedin: "https://www.linkedin.com/in/sneha-sidhu-063690377",
    github: "https://github.com/SnehaSidhu",
    membershipId: "102491241",
    image: "/teamphoto/Sneha.jpg",
  },
  {
    slug: "harshita-pati",
    name: "Harshita Pati",
    position: "Report Specialist",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Report Specialist of IEEE Student Branch MRIIRS for the 2026-27 session, contributing to documentation and reporting activities.",
    linkedin: "https://www.linkedin.com/in/harshita-pati-1b58453a9",
    github: "https://github.com/harshiTA007147",
    image: "/teamphoto/Harshita.png",
  },
  {
    slug: "sai-kumar",
    name: "Sai Kumar",
    position: "Cyber Expert",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Cyber Expert of IEEE Student Branch MRIIRS for the 2026-27 session, supporting cybersecurity-focused technical initiatives.",
    linkedin: "https://www.linkedin.com/in/saikumar-cybersec/",
    github: "https://github.com/skmonkey1233",
    image: "/teamphoto/Sai.png",
  },
  {
    slug: "arpit-kansal",
    name: "Arpit Kansal",
    position: "Web Expert",
    department: "SCA, MRIIRS",
    group: "Session 2026-27",
    bio: "Web Expert of IEEE Student Branch MRIIRS for the 2026-27 session, contributing to web development and digital initiatives.",
    linkedin: "https://www.linkedin.com/in/arpit-kansal-9346862a8",
    github: "https://github.com/ArpitKansal01",
    image: "/teamphoto/Arpit.jpg",
  },

  // =====================================================
  // FACULTY
  // =====================================================

  {
    slug: "sunita-joshi",
    name: "Mrs. Sunita Joshi",
    position: "Faculty Counselor",
    department: "SCA, MRIIRS",
    group: "Faculty",
    bio: "Faculty Counselor of IEEE Student Branch MRIIRS, providing guidance and support for the branch's student-led activities and initiatives.",
    linkedin: "https://www.linkedin.com/in/sunita-joshi-38a39628a",
    image: "/teamphoto/sunita.jpg",
  },
];

export const teamGroups = [
  "Leadership",
  "Executive Committee",
  "Technical Team",
  "Design & Media Team",
  "Event Management Team",
  "Outreach Team",
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  members: string[];
  github: string;
  demo?: string;
  image: string;
};

export const projectCategories = [
  "All",
  "AI/ML",
  "Web Development",
  "IoT",
  "Robotics",
  "Blockchain",
  "Cybersecurity",
  "Research",
];

export const projects: Project[] = [
  {
    slug: "campus-sphere",
    title: "Campus Sphere - Full-Stack Student Community Platform",
    category: "Web Development",
    description:
      "A full-stack student community platform that connects students, enables collaboration and provides centralized access to campus resources and activities.",

    longDescription:
      "Campus Sphere is a full-stack student community platform designed to provide students with a centralized digital space for collaboration, communication and campus engagement. The platform allows students to create and manage profiles, connect with other students, share information and participate in campus-related activities. It uses a modern web architecture with a responsive frontend, backend APIs and database integration to manage application data. The system focuses on providing an organized and user-friendly experience for students while maintaining a scalable structure for future features and integrations.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "REST API",
      "Tailwind CSS",
      "Socket.IO",
      "Git",
      "GitHub",
    ],
    members: ["Arpit"],
    github: "https://github.com/ArpitKansal01/Campus-Sphere",
    demo: "https://campus-sphere-two.vercel.app/",
    image: "/projects/CampusSphere.png",
  },
  {
    slug: "third-eye-ai-cam",
    title: "ThirdEye AI Cam - Edge AI Surveillance & Threat Detection System",
    category: "AI/ML",
    description:
      "An offline AI-powered surveillance system that uses YOLO and OpenCV to detect potential threats in real time through a webcam.",
    longDescription:
      "ThirdEye AI Cam is a desktop-based Edge AI surveillance application designed for real-time threat detection without cloud dependency. It captures live webcam video and processes frames using the YOLOv8 object detection model. The system detects objects such as persons, cars, buses, trucks and motorcycles, highlights detected objects with bounding boxes and confidence scores, maintains detection history using SQLite, saves threat snapshots, displays FPS and threat count, and provides notifications and alarm alerts. A Tkinter-based dashboard allows users to start and stop the camera, monitor live detections, view recent threats and access detection history.",
    technologies: [
      "Python",
      "OpenCV",
      "YOLOv8",
      "Ultralytics",
      "Tkinter",
      "Pillow(PIL)",
      "SQLite",
      "NumPy",
      "Git",
      "GitHub",
    ],
    members: ["Rahul"],
    github: "https://github.com/rahul0679/ThirdEye-AI-Cam",
    demo: "#",
    image: img("photo-1461749280684-dccba630e2f6"),
  },
  {
    slug: "image-analyzer-bot",

    title: "Image Analyzer Bot - AI-Powered Image Understanding System",

    category: "AI/ML",

    description:
      "An AI-powered image analysis web application that uses Google Gemini to understand uploaded images and generate detailed textual descriptions.",

    longDescription:
      "Image Analyzer Bot is a Python and Flask-based AI application that analyzes user-uploaded images using the Google Gemini API. The system accepts an image as input and uses Gemini's multimodal capabilities to identify and describe objects, people, their actions and facial expressions within the image. The generated analysis is returned as text and displayed through an interactive web interface. The application combines a Flask backend for handling image uploads and AI processing with an HTML-based frontend for presenting the generated results. The project demonstrates the integration of generative AI APIs with a web application to build an interactive computer-vision and image-understanding system.",

    technologies: [
      "Python",
      "Flask",
      "Google Gemini API",
      "Generative AI",
      "Computer Vision",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
      "Vercel",
    ],

    members: ["Arpit"],

    github: "https://github.com/ArpitKansal01/Image-Analyzer-Bot",

    demo: "https://image-analyzer-bot.vercel.app",

    image: "/projects/ImageAnalyzer.png",
  },
];

export type Post = {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readingTime: string;
  excerpt: string;
  content: { heading: string; body: string }[];
  image: string;
  link: string;
};

export const posts: Post[] = [
  {
    slug: "what-ieee-taught-me-beyond-the-classroom",
    title: "What IEEE Taught Me Beyond the Classroom",
    author: "Aamnah Faiyaz",
    date: "5 Sep 2026",
    category: "Leadership",
    readingTime: "5 min read",
    excerpt:
      "How IEEE transformed my college journey by teaching me confidence, communication, leadership, delegation, adaptability, and time management beyond the classroom.",

    content: [
      {
        heading: "From Student Member to Report Specialist",
        body: "When I first joined the IEEE MRIIRS Student Branch, I was simply a student member. I never expected it to become such an important part of my college journey. Within a few months, I became a Report Specialist, creating reports for various events I attended. What started as a responsibility gradually built my confidence, improved how I expressed my thoughts, and made me more comfortable putting my work out there.",
      },

      {
        heading: "Learning to Communicate and Adapt",
        body: "I also got opportunities to host several IEEE events. Being on stage, interacting with an audience, and keeping an event moving taught me a completely different kind of confidence. There were times when things did not go according to plan and I had to change the script right then and there. Those moments taught me to stay composed, think on my feet, communicate clearly, and adapt quickly.",
      },

      {
        heading: "Leadership and the Power of Delegation",
        body: "Today, as the President of the IEEE Student Branch MRIIRS, I have been learning things I never imagined I would learn from a student organization. One of the biggest lessons has been delegation. I have always preferred relying on myself, but this position made me realize that I do not have to do everything alone. I can trust my team, and they can do an incredible job.",
      },

      {
        heading: "A Leader Does Not Have to Have All the Answers",
        body: "There have also been plenty of times when I thought I had a fantastic idea, only for someone else to come up with something better. And honestly, I love that. It taught me that being a leader does not mean having all the answers. Sometimes, it means listening and recognizing that someone else might see something you did not.",
      },

      {
        heading: "Balancing Academics, Life and Responsibilities",
        body: "Perhaps the biggest lesson for me has been time management. Balancing academics, personal life, extracurricular activities, and IEEE responsibilities is not easy. IEEE became a constant part of my life, and I had to learn how to make everything fit instead of letting one commitment take over everything else.",
      },

      {
        heading: "More Than Just a Resume Experience",
        body: "Looking back, IEEE has given me much more than event experience or something to put on a resume. It has given me opportunities to write, speak, organize, lead, delegate, listen, adapt, solve problems, and trust others. Most importantly, it has changed how I see myself.",
      },

      {
        heading: "A Journey That Is Still Continuing",
        body: "I joined as a student member. I became a Report Specialist. I got opportunities to host events. And today, I have the opportunity to lead a team. I definitely did not imagine this journey when I first joined. For me, IEEE has been that opportunity, and I am still learning.",
      },
    ],

    image: img("photo-1521737711867-e3b97375f902"),
    link: "https://www.linkedin.com/posts/aamnah-faiyaz06_ieee-ieeesb-ieeestudentbranch-activity-7501691831320018944-qsMM",
  },
  {
    slug: "achieving-google-cloud-skill-badge-gemini-imagen",
    title:
      "Achieving the Google Cloud Skill Badge: Building Real-World AI Applications with Gemini and Imagen",
    author: "Arpit Kansal",
    date: "18 Apr 2025",
    category: "AI/ML",
    readingTime: "2 min read",
    excerpt:
      "My journey of earning the Google Cloud Skill Badge by building real-world AI applications using Gemini, Imagen, NLP, and Vertex AI.",

    content: [
      {
        heading: "Earning the Google Cloud Skill Badge",
        body: "I’m thrilled to share that I’ve earned the “Build Real World AI Applications with Gemini and Imagen” skill badge from Google Cloud. This accomplishment reflects my dedication to learning cutting-edge AI technologies and applying them to solve real-world challenges.",
      },

      {
        heading: "Course Overview",
        body: "This foundational course, offered through Google Cloud Skills Boost, provided hands-on experience with Google’s Gemini and Imagen models. These tools support capabilities such as image recognition, natural language processing, and image generation, integrated through the Vertex AI platform.",
      },

      {
        heading: "AI Image Recognition with Gemini",
        body: "As part of the learning experience, I developed an application that uses Gemini’s capabilities to analyze and interpret images. This can enable practical applications such as product categorization, content understanding, and content moderation.",
      },

      {
        heading: "Image Generation with Imagen",
        body: "I also explored Imagen for generating high-quality images from textual descriptions. This demonstrated how generative AI can be used for creative content creation, visual design, and other applications where text-to-image generation can add value.",
      },

      {
        heading: "Natural Language Processing",
        body: "The course also provided hands-on experience with natural language processing. I worked with applications capable of processing and understanding human language, enabling use cases such as chatbots and automated content analysis.",
      },

      {
        heading: "Deploying AI Applications with Vertex AI",
        body: "The learning journey culminated in deploying AI applications on Vertex AI. This provided practical exposure to building scalable AI solutions using Google Cloud’s infrastructure and services.",
      },

      {
        heading: "Why This Achievement Matters",
        body: "In today’s AI-driven world, the ability to develop and deploy AI applications is increasingly valuable. This skill badge validates my experience with important AI technologies while giving me practical knowledge that I can apply to future AI projects and innovations.",
      },

      {
        heading: "Looking Ahead",
        body: "I’m excited to continue exploring the possibilities of artificial intelligence and apply these skills to future projects. There is still a lot to learn, and this achievement is another step forward in my journey of building practical AI solutions.",
      },
    ],

    image: img("photo-1677442136019-21780ecad995"),

    link: "https://medium.com/@kansalarpit06/achieving-the-google-cloud-skill-badge-building-real-world-ai-applications-with-gemini-and-imagen-35d8dadae1a7?sharedUserId=kansalarpit06",
  },
];

export const achievements = [
  {
    year: "2026",
    title: "IEEE YP Delhi Summit 1.0 — Organizing Partner",
    body: "IEEE SB MRIIRS served as an Organizing Partner for IEEE YP Delhi Summit 1.0, supporting a major professional networking and career-development initiative.",
  },
  {
    year: "2026",
    title: "40+ Students Engaged in Training-cum-Internship Programme",
    body: "Conducted a four-week training-cum-internship programme across four specialised domains, with 40+ students participating regularly.",
  },
  {
    year: "2026",
    title: "Four-Domain Training Programme Delivered",
    body: "Delivered structured training across Data Analytics, AI/ML & Computer Vision, IoT, and Digital Marketing.",
  },
  {
    year: "2025",
    title: "8 Expert Talk Series Conducted",
    body: "Successfully conducted eight expert-led sessions covering research, publication, cybersecurity, AI, emerging technologies, and professional development.",
  },
  {
    year: "2025",
    title: "AI Awareness CSR Initiative",
    body: "Reached 64 school students through an AI-awareness and responsible-technology initiative at a government school in Faridabad.",
  },
  {
    year: "2025",
    title: "500+ Students Reached Through Membership Outreach",
    body: "A membership-awareness drive engaged more than 500 students and introduced them to IEEE's professional, technical, and networking opportunities.",
  },
  {
    year: "2025",
    title: "IEEE Student Branch MRIIRS Established",
    body: "IEEE SB MRIIRS was established in 2025 to provide students with opportunities for technical learning, innovation, professional development, networking, and leadership.",
  },
];

export const galleryCategories = [
  "All",
  "Events",
  "Workshops",
  "Hackathons",
  "Team",
  "Competitions",
  "Community",
];

export const gallery = [
  {
    id: 1,
    category: "Workshops",
    caption: "PowerBI Workshop",
    src: "gallery/image1.png",
    tall: true,
  },
  {
    id: 2,
    category: "Community",
    caption: "Expert Talk Series",
    src: "/gallery/image2.png",
  },
  {
    id: 3,
    category: "Events",
    caption: "IEEE Week Celebration",
    src: "/gallery/image3.png",
  },
  {
    id: 4,
    category: "Team",
    caption: "Orientation Day",
    src: "gallery/image6.png",
  },

  {
    id: 5,
    category: "Events",
    caption: "CSR Activity",
    src: "gallery/image5.png",
  },
  {
    id: 6,
    category: "Workshops",
    caption: "Google AI Suite",
    src: "gallery/image4.png",
    tall: true,
  },
  {
    id: 7,
    category: "Events",
    caption: "IEEE Training Cum Internship Closing Ceremony",
    src: "gallery/image7.png",
  },
  {
    id: 8,
    category: "Events",
    caption: "IEEE Training Cum Internship Closing Ceremony",
    src: "/gallery/image8.png",
    tall: true,
  },
];

export const testimonials = [
  {
    quote:
      "It was a wonderful experience interacting with the IEEE Student Branch MRIIRS. I sincerely appreciate the team for the opportunity and for conducting the session so effectively.",
    name: "Dr. Vinay Kumar Pandey",
    role: "Guest Speaker — Research & Publication Journey",
    image: portrait("photo-1500648767791-00dcc994a43e"),
  },
  {
    quote:
      "It was a rewarding experience to conduct a training session with IEEE Student Branch MRIIRS and contribute towards preparing students for an increasingly AI-driven and technology-focused future.",
    name: "Mr. Raam Kumar ",
    role: "IoT Trainer & Mentor ",
    image: portrait("photo-1573496359142-b8d87734a5a2"),
  },
  {
    quote:
      "I have spoken at a dozen campuses this year. The questions I got here were the sharpest by a distance.",
    name: "Ms. Sanskriti Verma",
    role: "AI/ML & Computer Vision Trainer",
    image: portrait("photo-1519085360753-af0119f7cbe7"),
  },
];

export const resources = [
  {
    group: "IEEE Resources",
    items: [
      {
        title: "IEEE Xplore",
        desc: "Access millions of research papers, standards and conference proceedings.",
        url: "https://ieeexplore.ieee.org",
      },
      {
        title: "IEEE Learning Network",
        desc: "Courses and certifications curated for members across every discipline.",
        url: "https://iln.ieee.org",
      },
      {
        title: "IEEE Spectrum",
        desc: "Award-winning technology journalism from the world's largest technical society.",
        url: "https://spectrum.ieee.org",
      },
      {
        title: "IEEE Collabratec",
        desc: "Networking and collaboration workspace for IEEE members.",
        url: "https://ieee-collabratec.ieee.org",
      },
    ],
  },
  {
    group: "Learning",
    items: [
      {
        title: "Programming Foundations",
        desc: "Structured paths in C, Python and data structures for first-year students.",
        url: "https://roadmap.sh",
      },
      {
        title: "AI / Machine Learning",
        desc: "Curated courses, datasets and reading lists from our technical team.",
        url: "https://paperswithcode.com",
      },
      {
        title: "Web Development",
        desc: "MDN, framework docs and our internal project starter templates.",
        url: "https://developer.mozilla.org",
      },
      {
        title: "Cybersecurity",
        desc: "Legal practice labs, CTF archives and writeups from branch events.",
        url: "https://tryhackme.com",
      },
      {
        title: "Electronics & Embedded",
        desc: "Datasheets, simulation tools and lab guides for hardware projects.",
        url: "https://www.tinkercad.com/circuits",
      },
    ],
  },
  {
    group: "Career",
    items: [
      {
        title: "Resume Resources",
        desc: "Engineering resume templates reviewed by alumni recruiters.",
        url: "https://www.overleaf.com/gallery/tagged/cv",
      },
      {
        title: "Interview Preparation",
        desc: "DSA sheets, system design primers and mock interview signups.",
        url: "https://neetcode.io",
      },
      {
        title: "Internship Opportunities",
        desc: "Openings shared by alumni and IEEE industry partners.",
        url: "https://www.linkedin.com/jobs",
      },
      {
        title: "Research Opportunities",
        desc: "Faculty projects, summer fellowships and IEEE student grants.",
        url: "https://www.ieee.org/membership/students/index.html",
      },
    ],
  },
];
