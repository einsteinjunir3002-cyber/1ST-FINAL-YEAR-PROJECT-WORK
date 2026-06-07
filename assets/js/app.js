/* ==========================================================================
   SMARTLEARN AI - APPLICATION REACTIVE ENGINE
   State Management, UI View Router, AI Simulation, Interactive Calculators
   ========================================================================== */

// Global State Object
const appState = {
  theme: 'dark', // Default dark mode
  currentView: 'landing-shell', // 'landing-shell', 'student-portal', 'lecturer-portal'
  activeStudentTab: 'student-dashboard',
  activeLecturerTab: 'lecturer-dashboard',
  
  // Simulated DB
  courses: [
    { id: 'CS101', title: 'Introduction to Computer Science & Coding', code: 'CS101', instructor: 'Dr. Kwame Mensah', avatar: 'avatar_lecturer.jpg', notesCount: 4, assignmentsCount: 2 },
    { id: 'MATH102', title: 'Calculus & Applied Mathematics', code: 'MATH102', instructor: 'Prof. Ama Serwaa', avatar: 'avatar_lecturer.jpg', notesCount: 3, assignmentsCount: 1 },
    { id: 'ENG201', title: 'Software Engineering & Architectures', code: 'ENG201', instructor: 'Mr. Emmanuel Osei', avatar: 'avatar_lecturer.jpg', notesCount: 5, assignmentsCount: 3 },
    { id: 'BUA202', title: 'Business Administration & Management', code: 'BUA202', instructor: 'Dr. Sophia Tetteh', avatar: 'avatar_lecturer.jpg', notesCount: 2, assignmentsCount: 1 }
  ],
  
  notes: [
    { id: 1, courseId: 'CS101', title: 'Lec 1: Fundamentals of Python & Control Structures.pdf', date: '2026-05-15', size: '2.4 MB' },
    { id: 2, courseId: 'CS101', title: 'Lec 2: Object Oriented Programming in Python.pdf', date: '2026-05-20', size: '3.1 MB' },
    { id: 3, courseId: 'MATH102', title: 'Lec 1: Derivatives and Rate of Changes.pdf', date: '2026-05-12', size: '1.8 MB' },
    { id: 4, courseId: 'ENG201', title: 'Lec 1: Intro to Agile Methodologies & Scrum.pdf', date: '2026-05-18', size: '4.2 MB' }
  ],
  
  assignments: [
    { id: 1, courseId: 'CS101', title: 'Assignment 1: Logic Gates & Basic Control Flows', deadline: '2026-05-28', totalPoints: 100, status: 'Pending' },
    { id: 2, courseId: 'ENG201', title: 'Assignment 2: Drawing UML Diagrams', deadline: '2026-06-02', totalPoints: 100, status: 'Submitted', grade: '95', feedback: 'Excellent layout of class diagrams!' },
    { id: 3, courseId: 'MATH102', title: 'Problem Set 1: Matrix Inversion & Linear Systems', deadline: '2026-05-30', totalPoints: 50, status: 'Pending' }
  ],
  
  submissions: [
    { id: 1, assignmentId: 2, studentName: 'Kofi Mensah', fileName: 'uml_diagrams_kofi.pdf', date: '2026-05-22', grade: '95', feedback: 'Excellent layout of class diagrams!' }
  ],
  
  forumThreads: [
    { id: 1, category: 'Computer Science', author: 'Kofi Mensah', avatar: 'avatar_student.jpg', title: 'Struggling with Recursion in Python - Need help!', body: 'Hi everyone, I am trying to understand the base case in recursive functions. My function keeps hitting infinite loops. Can anyone explain how to prevent stack overflow?', upvotes: 14, replies: [
      { author: 'Mr. Emmanuel Osei', avatar: 'avatar_lecturer.jpg', role: 'Lecturer', body: 'Think of the base case as the exit door. You must structure your arguments so they get closer to that door on each step. Try writing down the inputs step-by-step.' }
    ] },
    { id: 2, category: 'Business', author: 'Efua Ampah', avatar: 'avatar_student.jpg', title: 'Top Entrepreneurship models in Ghana', body: 'What are the main financial models local startups are using to raise capital in Accra? Would love some case studies.', upvotes: 8, replies: [] }
  ],
  
  notifications: [
    { id: 1, text: 'Lecturer graded assignment: Assignment 2 (Grade: 95/100)', date: '2 hours ago', unread: true },
    { id: 2, text: 'New notes uploaded: Intro to Agile Methodologies & Scrum', date: '1 day ago', unread: false }
  ],

  // Careers Mapping DB for recommendation logic
  careersDb: {
    programming: {
      programs: ['Computer Science', 'Software Engineering', 'Cybersecurity'],
      universities: ['Ashesi University', 'KNUST', 'University of Ghana'],
      description: 'You have strong logic, problem solving and coding capabilities. You are built for building digital infrastructure.',
      demand: 'Critically High (92% employment rate)',
      salary: 'GH₵ 8,000 - GH₵ 20,000+ / mo',
      skills: ['Algorithms', 'Python/JS', 'Data Structures', 'Git']
    },
    business: {
      programs: ['Business Administration', 'Finance & Accounting', 'Marketing & Sales'],
      universities: ['UPSA', 'University of Ghana', 'Central University'],
      description: 'You are highly business-oriented, structured, and an excellent planner and communicator.',
      demand: 'High (80% employment rate)',
      salary: 'GH₵ 6,000 - GH₵ 15,000 / mo',
      skills: ['Leadership', 'Financial Analysis', 'Excel Modeling', 'Pitching']
    },
    datascience: {
      programs: ['Data Science', 'Statistics', 'Mathematics'],
      universities: ['KNUST', 'University of Ghana'],
      description: 'You are passionate about finding hidden patterns in large sets of numbers and building predictions.',
      demand: 'Extremely High (88% employment rate)',
      salary: 'GH₵ 9,000 - GH₵ 22,000 / mo',
      skills: ['Data Mining', 'SQL', 'R/Python', 'Machine Learning']
    }
  },
  universities: [
    {
      id: "ug",
      name: "University of Ghana (UG)",
      ranking: 1,
      image: "picture/ug_campus.jpg",
      type: "Public",
      location: "Legon, Accra",
      established: 1948,
      academicsInfo: "Renowned for its liberal arts, humanities, law, basic and applied sciences, and medicine. It is the premier and largest university in Ghana.",
      performanceReview: "Highly ranked in West Africa for research productivity, citation impact, and international collaboration.",
      feesRange: "GH₵ 3,500 - GH₵ 7,500 / year",
      scholarshipsInfo: "UG Financial Aid Office, MasterCard Foundation Scholars Program, and various corporate bursaries.",
      programsOffered: ["Bachelor of Laws (LLB)", "BSc Computer Science", "Bachelor of Medicine and Surgery", "BSc Business Administration", "BSc Nursing", "BA Political Science"],
      admissionRequirements: "WASSCE: Credit passes (A1-C6) in 3 core subjects (Maths, English, Science/Social) plus 3 electives. Aggregate total must be 24 or lower."
    },
    {
      id: "knust",
      name: "Kwame Nkrumah University of Science and Technology (KNUST)",
      ranking: 2,
      image: "picture/knust_campus.jpg",
      type: "Public",
      location: "Kumasi, Ashanti Region",
      established: 1951,
      academicsInfo: "The leading institution in science and technology education in Ghana. Strong programs in engineering, architecture, pharmacy, and physical sciences.",
      performanceReview: "Exceptional output in technical innovations, research patents, and engineering projects in Sub-Saharan Africa.",
      feesRange: "GH₵ 3,800 - GH₵ 8,500 / year",
      scholarshipsInfo: "MasterCard Foundation, Vice-Chancellor's Fund, and GETFund local bursaries.",
      programsOffered: ["BSc Civil Engineering", "BSc Computer Engineering", "BSc Architecture", "Doctor of Pharmacy", "BSc Mechanical Engineering", "BSc Aerospace Engineering"],
      admissionRequirements: "WASSCE: Credits in English, Core Maths, Integrated Science, and 3 Electives in related sciences (Physics, Chemistry, Applied Maths) with aggregate <= 24."
    },
    {
      id: "ucc",
      name: "University of Cape Coast (UCC)",
      ranking: 3,
      image: "picture/ucc_campus.jpg",
      type: "Public",
      location: "Cape Coast, Central Region",
      established: 1962,
      academicsInfo: "Famous for teacher training, business, agriculture, development studies, and medical science education.",
      performanceReview: "Consistently ranked as the top university in Ghana for research influence and pedagogical training.",
      feesRange: "GH₵ 3,400 - GH₵ 7,200 / year",
      scholarshipsInfo: "UCC Student Financial Support Office, local district assembly sponsorships, and Kakum bursaries.",
      programsOffered: ["BEd Computer Science", "BSc Accounting and Finance", "Bachelor of Medicine", "BSc Optometry", "BSc Molecular Biology", "BA Development Studies"],
      admissionRequirements: "WASSCE: Credits in English, Core Maths, Science/Social, and 3 electives with aggregate total <= 24."
    },
    {
      id: "uds",
      name: "University for Development Studies (UDS)",
      ranking: 4,
      image: "picture/uds_campus.jpg",
      type: "Public",
      location: "Tamale, Northern Region",
      established: 1992,
      academicsInfo: "Pioneered the third-trimester practical field program. Specialized in agriculture, medicine, allied health sciences, and development studies.",
      performanceReview: "High community impact through student-led rural development audits and community service programs.",
      feesRange: "GH₵ 2,800 - GH₵ 6,000 / year",
      scholarshipsInfo: "Northern Development Authority grants, WHO health study sponsorships, and UDS financial aid program.",
      programsOffered: ["Doctor of Medicine (MD)", "BSc Agriculture", "BSc Development Studies", "BSc Community Nutrition", "BSc Nursing (Public Health)"],
      admissionRequirements: "WASSCE: Credit passes (A1-C6) in English, Core Maths, Integrated Science, and 3 electives with aggregate total <= 24."
    },
    {
      id: "uew",
      name: "University of Education, Winneba (UEW)",
      ranking: 5,
      image: "picture/uew_campus.jpg",
      type: "Public",
      location: "Winneba, Central Region",
      established: 1992,
      academicsInfo: "Specialized in training teachers and education professionals for basic and secondary schools in Ghana.",
      performanceReview: "Recognized as the primary driver of national teacher training, pedagogy development, and educational research.",
      feesRange: "GH₵ 2,900 - GH₵ 5,500 / year",
      scholarshipsInfo: "GETFund support, UEW institutional bursaries, and local municipal teacher financial aids.",
      programsOffered: ["BEd Mathematics Education", "BEd English Education", "BSc Information Technology Education", "BA Music Education", "BEd Special Education"],
      admissionRequirements: "WASSCE: Credit passes in English, Core Maths, Science/Social, plus 3 relevant teaching electives."
    },
    {
      id: "gimpa",
      name: "Ghana Institute of Management and Public Administration (GIMPA)",
      ranking: 6,
      image: "picture/gimpa_campus.jpg",
      type: "Public",
      location: "Greenhill, Accra",
      established: 1961,
      academicsInfo: "Elite business school specializing in public administration, corporate governance, information technology management, and law.",
      performanceReview: "Voted top executive school in Ghana, popular with public sector leaders and working corporate managers.",
      feesRange: "GH₵ 6,000 - GH₵ 12,000 / year",
      scholarshipsInfo: "GIMPA Corporate Executive Sponsorships, public service staff training packages, and merit bursaries.",
      programsOffered: ["Bachelor of Laws (LLB)", "BSc Business Administration", "BSc Information Technology", "Master of Public Administration (MPA)", "BSc Finance"],
      admissionRequirements: "WASSCE: Minimum of 6 credit passes (A1-C6) including English and Core Mathematics. Post-diploma entry available."
    },
    {
      id: "upsa",
      name: "University of Professional Studies, Accra (UPSA)",
      ranking: 7,
      image: "picture/upsa_campus.jpg",
      type: "Public",
      location: "Madina, Accra",
      established: 1965,
      academicsInfo: "Blends academic excellence with professional practice. Major courses in marketing, accounting, public relations, and business administration.",
      performanceReview: "Renowned for high professional exam pass rates (ICAG, ACCA, CIM) among students.",
      feesRange: "GH₵ 3,200 - GH₵ 6,800 / year",
      scholarshipsInfo: "UPSA Vice Chancellor Endowment Fund (VCEF), corporate financial sponsorships, and local union grants.",
      programsOffered: ["BSc Accounting", "BSc Marketing", "BSc Business Economics", "BSc Public Relations Management", "BSc Information Technology"],
      admissionRequirements: "WASSCE: 3 credit passes in core subjects (Maths, English, Science) plus 3 electives in related business tracks."
    },
    {
      id: "umat",
      name: "University of Mines and Technology (UMaT)",
      ranking: 8,
      image: "picture/umat_campus.jpg",
      type: "Public",
      location: "Tarkwa, Western Region",
      established: 2004,
      academicsInfo: "Highly specialized mining engineering institution. Courses cover mineral extraction, geological sciences, petroleum engineering, and environmental safety.",
      performanceReview: "World-class laboratory facilities and nearly 100% employment rate for graduates in global mining corporations.",
      feesRange: "GH₵ 3,900 - GH₵ 8,200 / year",
      scholarshipsInfo: "Ghana Chamber of Mines Scholarships, mining corporate sponsorships (Newmont, Gold Fields), and local development aids.",
      programsOffered: ["BSc Mining Engineering", "BSc Geological Engineering", "BSc Petroleum Engineering", "BSc Mineral Engineering", "BSc Geomatic Engineering"],
      admissionRequirements: "WASSCE: Credit passes in English, Core Maths, Physics, Chemistry, and Elective Maths."
    },
    {
      id: "uhas",
      name: "University of Health and Allied Sciences (UHAS)",
      ranking: 9,
      image: "picture/uhas_campus.jpg",
      type: "Public",
      location: "Ho, Volta Region",
      established: 2011,
      academicsInfo: "Dedicated exclusively to health professional training, research, and community service. Medicine, pharmacy, nursing, public health, and therapy.",
      performanceReview: "Highly competitive admission entries and strong clinical training partnerships with local teaching hospitals.",
      feesRange: "GH₵ 4,200 - GH₵ 9,000 / year",
      scholarshipsInfo: "Ministry of Health bursaries, Volta Region development grants, and UHAS corporate endowments.",
      programsOffered: ["Bachelor of Medicine & Surgery", "Doctor of Pharmacy (PharmD)", "BSc General Nursing", "BSc Public Health", "BSc Medical Laboratory Science"],
      admissionRequirements: "WASSCE: Strict credit passes in English, Core Maths, Integrated Science, Biology, Chemistry, and Physics with aggregate <= 15."
    },
    {
      id: "uenr",
      name: "University of Energy and Natural Resources (UENR)",
      ranking: 10,
      image: "picture/uenr_campus.jpg",
      type: "Public",
      location: "Sunyani, Bono Region",
      established: 2011,
      academicsInfo: "Focused on solving national energy challenges and managing forestry, wildlife, and agricultural natural resources.",
      performanceReview: "Leader in renewable energy research, solar energy installation tests, and forestry tracking systems in West Africa.",
      feesRange: "GH₵ 3,100 - GH₵ 6,900 / year",
      scholarshipsInfo: "UENR Energy Research Fund, environmental NGO grants, and Ministry of Energy scholarships.",
      programsOffered: ["BSc Renewable Energy Engineering", "BSc Natural Resources Management", "BSc Computer Science", "BSc Agricultural Engineering", "BSc Forest Resources Management"],
      admissionRequirements: "WASSCE: Credit passes in English, Core Maths, Integrated Science/Physics, and 3 electives."
    },
    {
      id: "central",
      name: "Central University",
      ranking: 11,
      image: "picture/central_campus.jpg",
      type: "Private",
      location: "Miotso, Greater Accra Region",
      established: 1998,
      academicsInfo: "Largest private university in Ghana, owned by the International Central Gospel Church. Broad business, science, humanities, and pharmacy curricula.",
      performanceReview: "Strong industry links in banking and media sectors, with an expansive, well-equipped campus.",
      feesRange: "GH₵ 7,500 - GH₵ 14,000 / year",
      scholarshipsInfo: "ICGC Educational Grants, Central University Financial Aid, and Chancellor's Scholarships.",
      programsOffered: ["Doctor of Pharmacy (PharmD)", "BSc Architecture", "BSc Computer Science", "BBA Human Resource Management", "BSc Nursing"],
      admissionRequirements: "WASSCE: Credits in 6 subjects including Core Mathematics and English. Science electives required for Pharmacy."
    },
    {
      id: "kstu",
      name: "Kumasi Technical University (KsTU)",
      ranking: 12,
      image: "picture/kstu_campus.jpg",
      type: "Public",
      location: "Kumasi, Ashanti Region",
      established: 1954,
      academicsInfo: "Leading vocational-technical education centre in the middle belt of Ghana. Engineering, environment, and business technology.",
      performanceReview: "Excellent output in solar energy training courses and national TVET skills competitions.",
      feesRange: "GH₵ 2,600 - GH₵ 5,000 / year",
      scholarshipsInfo: "KsTU Student Aid, MasterCard Foundation partnership programs, and GETFund local allocations.",
      programsOffered: ["BTech Electrical & Electronic Engineering", "BTech Building Technology", "BTech Computer Science", "BTech Chemical Engineering", "BTech Marketing"],
      admissionRequirements: "WASSCE: 6 credit passes including Maths and English, or Technical School certificates."
    },
    {
      id: "pentecost",
      name: "Pentecost University",
      ranking: 13,
      image: "picture/pentecost_campus.jpg",
      type: "Private",
      location: "Sowutuom, Accra",
      established: 2003,
      academicsInfo: "Owned by The Church of Pentecost. Focuses on ethical leadership, business administration, health sciences, and engineering studies.",
      performanceReview: "Strong records in nurse training licensing exams and active international university research partnerships.",
      feesRange: "GH₵ 5,500 - GH₵ 9,500 / year",
      scholarshipsInfo: "Pentecost Church Education Fund, PU Work-Study, and leadership merit grants.",
      programsOffered: ["BSc Nursing", "BSc Physician Assistantship", "BSc Computer Science", "BBA Accounting", "BSc Construction Technology"],
      admissionRequirements: "WASSCE: Credits in English, Core Maths, Science/Social, plus 3 electives."
    },
    {
      id: "atu",
      name: "Accra Technical University (ATU)",
      ranking: 14,
      image: "picture/atu_campus.jpg",
      type: "Public",
      location: "Barnes Road, Accra",
      established: 1949,
      academicsInfo: "Premier technical university in Ghana focusing on hands-on TVET education, mechanical, civil and electrical engineering, and applied sciences.",
      performanceReview: "Pioneered industrial internship placements and practical machinery training in downtown Accra.",
      feesRange: "GH₵ 2,500 - GH₵ 4,800 / year",
      scholarshipsInfo: "Government TVET scholarships, ATU Staff Welfare loans, and local industrial sponsorships.",
      programsOffered: ["BTech Mechanical Engineering", "BTech Civil Engineering", "BTech Computer Science", "BTech Fashion Design", "BTech Accounting"],
      admissionRequirements: "WASSCE: 6 credit passes including English and Mathematics, or TVET technical certificate credentials."
    },
    {
      id: "htu",
      name: "Ho Technical University (HTU)",
      ranking: 15,
      image: "picture/ho_campus.jpg",
      type: "Public",
      location: "Ho, Volta Region",
      established: 1968,
      academicsInfo: "Renowned for food science, hospitality management, fashion design, and agricultural engineering technology programs.",
      performanceReview: "Leader in hospitality education, hosting training hotels and advanced culinary test centers.",
      feesRange: "GH₵ 2,200 - GH₵ 4,300 / year",
      scholarshipsInfo: "HTU Financial Aid Scheme, local tourism board grants, and Volta scholarship boards.",
      programsOffered: ["BTech Hospitality & Tourism Management", "BTech Agro-Enterprise Development", "BTech Fashion Design", "BTech Computer Science", "BTech Agricultural Engineering"],
      admissionRequirements: "WASSCE: 6 credit passes including English and Core Mathematics, plus relevant electives."
    },
    {
      id: "cug",
      name: "Catholic University of Ghana (CUG)",
      ranking: 16,
      image: "picture/catholic_campus.jpg",
      type: "Private",
      location: "Fiapre, Sunyani",
      established: 2003,
      academicsInfo: "Focuses on moral and academic training. Major programs in computer science, public health, nursing, and education.",
      performanceReview: "Recognized for high ethical and professional standards among graduates in local municipal hospitals.",
      feesRange: "GH₵ 5,400 - GH₵ 8,900 / year",
      scholarshipsInfo: "Catholic Secretariat Bursaries, CUG Needy Students Fund, and diocesan educational aids.",
      programsOffered: ["BSc Computer Science", "BSc Public Health", "BSc Economics and Business Administration", "BEd English", "BSc Mathematics & Statistics"],
      admissionRequirements: "WASSCE: 6 credit passes (A1-C6) including Core English and Core Mathematics."
    },
    {
      id: "ttu",
      name: "Takoradi Technical University (TTU)",
      ranking: 18,
      image: "picture/ttu_campus.jpg",
      type: "Public",
      location: "Takoradi, Western Region",
      established: 1954,
      academicsInfo: "Pioneers technical courses for Ghana's petroleum and gas industries. Mechanical engineering, welding technology, and business administration.",
      performanceReview: "Strategically located in the oil hub of Ghana, with heavy corporate placements in offshore drilling firms.",
      feesRange: "GH₵ 2,500 - GH₵ 4,900 / year",
      scholarshipsInfo: "GASSUP Petroleum Scholarships, Takoradi Chamber of Commerce grants, and TVET funding.",
      programsOffered: ["BTech Petroleum Engineering", "BTech Mechanical Engineering", "BTech Electrical Technology", "BTech Procurement Management", "BTech Graphic Design"],
      admissionRequirements: "WASSCE: Credit passes in Mathematics, English, Integrated Science, and 3 science/technical electives."
    },
    {
      id: "pug",
      name: "Presbyterian University Ghana (PUG)",
      ranking: 21,
      image: "picture/pug_campus.jpg",
      type: "Private",
      location: "Abetifi-Kwahu, Eastern Region",
      established: 2003,
      academicsInfo: "Multi-campus university combining academic excellence with Christian values. Environmental studies, information technology, and nursing.",
      performanceReview: "Consistently ranked as one of the most disciplined and high-quality private universities in Ghana.",
      feesRange: "GH₵ 5,800 - GH₵ 9,800 / year",
      scholarshipsInfo: "Presbyterian Church Scholarship Fund, PUG needy student subsidies, and local community aids.",
      programsOffered: ["BSc Nursing", "BSc Information Technology", "BSc Environmental and Development Studies", "BBA Agribusiness", "BSc Physician Assistantship"],
      admissionRequirements: "WASSCE: 6 credit passes (A1-C6) including core English and Mathematics."
    },
    {
      id: "cctu",
      name: "Cape Coast Technical University (CCTU)",
      ranking: 22,
      image: "picture/cctu_campus.jpg",
      type: "Public",
      location: "Cape Coast, Central Region",
      established: 1984,
      academicsInfo: "Dedicated to engineering, applied sciences, TVET systems, and green energy studies. Promotes sustainable environmental design.",
      performanceReview: "Primary resource center for mechanical, construction, and hospitality vocational training in southern Ghana.",
      feesRange: "GH₵ 2,300 - GH₵ 4,600 / year",
      scholarshipsInfo: "Government TVET support, CCTU Student Aid, and tourism corporate grants.",
      programsOffered: ["BTech Renewable Energy", "BTech Civil Engineering", "BTech Hospitality Management", "BTech Mechanical Engineering", "BTech Computer Science"],
      admissionRequirements: "WASSCE: Credit passes in English, Mathematics, Science, and 3 vocational electives."
    },
    {
      id: "methodist",
      name: "Methodist University Ghana (MUG)",
      ranking: 25,
      image: "picture/methodist_campus.jpg",
      type: "Private",
      location: "Dansoman, Accra",
      established: 2000,
      academicsInfo: "Affiliated with the Methodist Church Ghana. Excellent programs in counseling, psychology, business administration, and accounting.",
      performanceReview: "Noted for its serene campus atmosphere and strong corporate placement department.",
      feesRange: "GH₵ 5,200 - GH₵ 9,000 / year",
      scholarshipsInfo: "Methodist Church Education Fund, MUG Work-Study Program, and local district welfare grants.",
      programsOffered: ["BSc Psychology", "BBA Accounting", "BSc Information Technology", "BA Social Work", "BSc Nursing"],
      admissionRequirements: "WASSCE: Credits in English, Core Maths, Science/Social, plus 3 electives."
    },
    {
      id: "ashesi",
      name: "Ashesi University",
      ranking: 27,
      image: "picture/ashesi_campus.jpg",
      type: "Private",
      location: "Berekuso, Eastern Region",
      established: 2002,
      academicsInfo: "A liberal arts college known for its strict honor code, leadership training, critical thinking instruction, and high-impact technology and business courses.",
      performanceReview: "Achieved global acclaim for its student career placements, entrepreneurship incubator, and state-of-the-art green campus.",
      feesRange: "GH₵ 48,000 / year (All-inclusive tuition)",
      scholarshipsInfo: "100% full tuition need-based scholarships, Ashesi Foundation support, and MasterCard Foundation scholarships.",
      programsOffered: ["BSc Computer Science", "BSc Management Information Systems", "BSc Business Administration", "BSc Mechanical Engineering", "BSc Electrical Engineering"],
      admissionRequirements: "WASSCE: Minimum 6 credit passes (A1-C6) including Core Maths and English, plus personal essays and an entrance interview."
    },
    {
      id: "anu",
      name: "All Nations University (ANU)",
      ranking: 28,
      image: "picture/anu_campus.jpg",
      type: "Private",
      location: "Koforidua, Eastern Region",
      established: 2002,
      academicsInfo: "Highly recognized for engineering and space science programs. Designed and launched Ghana's first educational satellite (Ghanasat-1).",
      performanceReview: "Pioneered space science education and satellite research in West Africa, hosting advanced laboratories.",
      feesRange: "GH₵ 6,000 - GH₵ 10,500 / year",
      scholarshipsInfo: "ANU Space Research Scholarship, leadership grants, and Church sponsorships.",
      programsOffered: ["BSc Electronics & Communications Engineering", "BSc Computer Science", "BSc Biomedical Engineering", "BBA Oil and Gas Management", "BSc Nursing"],
      admissionRequirements: "WASSCE: 6 credits including English, Core Maths, and Science (Physics/Chemistry for engineering)."
    },
    {
      id: "vvu",
      name: "Valley View University (VVU)",
      ranking: 33,
      image: "picture/vvu_campus.jpg",
      type: "Private",
      location: "Oyibi, Greater Accra Region",
      established: 1979,
      academicsInfo: "First private university in Ghana to receive a presidential charter. Values-based education focused on integrity, technology, and health.",
      performanceReview: "Outstanding computer science graduate base with strong ethical code records in local industry.",
      feesRange: "GH₵ 6,500 - GH₵ 10,000 / year",
      scholarshipsInfo: "Seventh-day Adventist Church bursaries, VVU Work-Study programs, and academic excellence scholarships.",
      programsOffered: ["BSc Computer Science", "BSc Information Technology", "BSc Nursing", "BBA Accounting", "BSc Mathematics"],
      admissionRequirements: "WASSCE: Credit passes in 3 core subjects (including Core Maths and English) and 3 electives."
    },
    {
      id: "regent",
      name: "Regent University College of Science and Technology",
      ranking: 37,
      image: "picture/regent_campus.jpg",
      type: "Private",
      location: "McCarthy Hill, Accra",
      established: 2003,
      academicsInfo: "Pioneered specialized private sector science and ICT education in Accra. Strong networks in engineering, business, and theology studies.",
      performanceReview: "High placements in telecommunications corporations and banking software departments in Accra.",
      feesRange: "GH₵ 5,500 - GH₵ 9,000 / year",
      scholarshipsInfo: "Regent Institutional Aid, telecom corporate bursaries, and merit-based tuition discounts.",
      programsOffered: ["BSc Computer Science", "BSc Information Systems Sciences", "BSc Telecommunications Engineering", "BBA Banking and Finance", "BTh Theology"],
      admissionRequirements: "WASSCE: Credit passes in English, Core Maths, Integrated Science/Physics, and 3 electives."
    },
    {
      id: "ktu",
      name: "Koforidua Technical University (KTU)",
      ranking: 40,
      image: "picture/ktu_campus.jpg",
      type: "Public",
      location: "Koforidua, Eastern Region",
      established: 1997,
      academicsInfo: "Stresses technical skills and entrepreneurship. Heavy programs in computer science, statistics, biomedical engineering, and automotive systems.",
      performanceReview: "Gained national acclaim for building local electric vehicle prototypes and software systems.",
      feesRange: "GH₵ 2,400 - GH₵ 4,500 / year",
      scholarshipsInfo: "KTU Financial Aid Scheme, local mining and technical corporate bursaries.",
      programsOffered: ["BTech Computer Science", "BTech Biomedical Engineering", "BTech Automotive Engineering", "BTech Graphic Design", "BTech Statistics"],
      admissionRequirements: "WASSCE: Credit passes in English, Mathematics, Integrated Science, and 3 related technical electives."
    },
    {
      id: "lancaster",
      name: "Lancaster University Ghana",
      ranking: 42,
      image: "picture/lancaster_campus.jpg",
      type: "Private",
      location: "East Legon, Accra",
      established: 2013,
      academicsInfo: "UK-accredited university offering British degree standards locally. Strong focus on business, international relations, law, and computer science.",
      performanceReview: "Excellent global curriculum standards and foreign exchange study opportunities.",
      feesRange: "GH₵ 45,000 - GH₵ 60,000 / year",
      scholarshipsInfo: "Lancaster Global Scholarship, merit-based entry discounts, and international corporate sponsorships.",
      programsOffered: ["BSc Computer Science", "Bachelor of Laws (LLB)", "BSc Business Studies", "BA International Relations", "BSc Accounting & Finance"],
      admissionRequirements: "WASSCE/A-Levels: Minimum 6 credits in WASSCE or 3 B grades in A-levels including Core Mathematics and English."
    },
    {
      id: "bluecrest",
      name: "BlueCrest University College",
      ranking: 43,
      image: "picture/bluecrest_campus.jpg",
      type: "Private",
      location: "Kokomlemle, Accra",
      established: 1999,
      academicsInfo: "Tech-centric institution with professional certifications built into standard IT, fashion design, and journalism degree programs.",
      performanceReview: "Recognized for practical IT training labs, networking systems certifications, and annual student fashion exhibitions.",
      feesRange: "GH₵ 6,500 - GH₵ 12,000 / year",
      scholarshipsInfo: "BlueCrest Scholarship Foundation, tech talent discount waivers, and school excellence awards.",
      programsOffered: ["BSc Information Technology", "BA Fashion Design", "BSc Journalism & Mass Communication", "BBA Finance", "BSc Software Engineering"],
      admissionRequirements: "WASSCE: Credit passes in English and Core Maths, plus 3 electives. IT electives are an advantage."
    },
    {
      id: "wisconsin",
      name: "Wisconsin International University College",
      ranking: 44,
      image: "picture/wisconsin_campus.jpg",
      type: "Private",
      location: "Agbogba, Accra",
      established: 2000,
      academicsInfo: "Offers multicultural study environments. Top-tier programs in nursing, law, security management, and business communication.",
      performanceReview: "Popular with international students from Nigeria, Ivory Coast, and Gabon. Houses state-of-the-art simulation law courts.",
      feesRange: "GH₵ 6,200 - GH₵ 11,000 / year",
      scholarshipsInfo: "Wisconsin Institutional Aid, international student bursaries, and merit waivers.",
      programsOffered: ["Bachelor of Laws (LLB)", "BSc Nursing", "BSc IT and Management", "BSc Security & Forensic Studies", "BBA Banking & Finance"],
      admissionRequirements: "WASSCE: Credit passes in Maths, English, Science/Social, and 3 electives. Aggregate total <= 24."
    },
    {
      id: "academiccity",
      name: "Academic City University College",
      ranking: 45,
      image: "picture/academiccity_campus.jpg",
      type: "Private",
      location: "Haatso, Accra",
      established: 2017,
      academicsInfo: "Innovative university utilizing modern project-based learning. Specializes in advanced engineering, artificial intelligence, robotics, and design thinking.",
      performanceReview: "Equipped with the first real engineering makerspace in a private college in Ghana. High student startup incubation output.",
      feesRange: "GH₵ 25,000 - GH₵ 35,000 / year",
      scholarshipsInfo: "Academic City President's Scholarship, need-based tuition waivers, and tech talent bursaries.",
      programsOffered: ["BSc Artificial Intelligence", "BSc Robotics Engineering", "BSc Computer Engineering", "BSc Entrepreneurship", "BSc Journalism & Mass Communication"],
      admissionRequirements: "WASSCE: Credits in Core Maths, English, Integrated Science, and 3 electives (Physics, Elective Maths, Chemistry for Engineering)."
    },
    {
      id: "webster",
      name: "Webster University Ghana",
      ranking: 51,
      image: "picture/webster_campus.jpg",
      type: "Private",
      location: "East Legon, Accra",
      established: 2013,
      academicsInfo: "American-accredited university offering US degrees in Ghana. Specializes in international relations, media communications, and management.",
      performanceReview: "Features highly diverse classrooms, international exchange programs, and study-abroad options to Webster USA and Europe.",
      feesRange: "GH₵ 50,000 - GH₵ 70,000 / year",
      scholarshipsInfo: "Webster Legacy Scholarships, US federal aid eligibility (FAFSA), and local merit bursaries.",
      programsOffered: ["BA International Relations", "BA Media Communications", "BSc Business Administration", "BS Computer Science", "BA Psychology"],
      admissionRequirements: "WASSCE/SAT: Credits in English and Maths, plus SAT/ACT score submission for American standards."
    }
  ],
  selectedUniType: 'All',
  uniSearchQuery: ''
};

/* ==========================================================================
   UI STATE ROUTER
   ========================================================================== */
function navigateTo(shellId) {
  // Hide all main shells
  document.getElementById('landing-shell').classList.add('hidden');
  document.getElementById('portal-shell').classList.add('hidden');
  
  // Show target shell
  document.getElementById(shellId).classList.remove('hidden');
  appState.currentView = shellId;
  
  // Reset navigation states if shifting to portal
  if (shellId === 'portal-shell') {
    if (appState.theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    }
    // Update Sidebar details based on role
    updateSidebarDetails();
    renderStateData();
  }
  window.scrollTo(0,0);
}

function switchTab(role, tabId) {
  // Deactivate all content tabs
  const tabClass = role === 'student' ? 'student-view' : 'lecturer-view';
  document.querySelectorAll('.' + tabClass).forEach(el => el.classList.remove('active'));
  
  // Activate target content tab
  const targetEl = document.getElementById(tabId);
  if (targetEl) targetEl.classList.add('active');
  
  // Update sidebar menu highlight
  document.querySelectorAll('.sidebar-nav-item').forEach(el => el.classList.remove('active'));
  const sidebarBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (sidebarBtn) sidebarBtn.classList.add('active');
  
  if (role === 'student') {
    appState.activeStudentTab = tabId;
  } else {
    appState.activeLecturerTab = tabId;
  }
}

const API_BASE = 'http://localhost:5000';

let activeAuthTab = 'signin';
let activeSignupRole = 'student';

function openAuthModal() {
  document.getElementById('auth-modal').style.display = 'flex';
  document.getElementById('auth-alert').style.display = 'none';
  switchAuthTab('signin');
}

function closeAuthModal() {
  document.getElementById('auth-modal').style.display = 'none';
}

function switchAuthTab(tab) {
  activeAuthTab = tab;
  const alertEl = document.getElementById('auth-alert');
  alertEl.style.display = 'none';
  
  if (tab === 'signin') {
    document.getElementById('auth-modal-title').textContent = 'Sign In to SmartLearn';
    document.getElementById('tab-signin-btn').style.background = 'var(--primary)';
    document.getElementById('tab-signin-btn').style.color = 'white';
    document.getElementById('tab-signup-btn').style.background = 'transparent';
    document.getElementById('tab-signup-btn').style.color = 'var(--text-muted)';
    document.getElementById('auth-signin-form').style.display = 'block';
    document.getElementById('auth-signup-form').style.display = 'none';
  } else {
    document.getElementById('auth-modal-title').textContent = 'Create Academic Account';
    document.getElementById('tab-signin-btn').style.background = 'transparent';
    document.getElementById('tab-signin-btn').style.color = 'var(--text-muted)';
    document.getElementById('tab-signup-btn').style.background = 'var(--primary)';
    document.getElementById('tab-signup-btn').style.color = 'white';
    document.getElementById('auth-signin-form').style.display = 'none';
    document.getElementById('auth-signup-form').style.display = 'block';
    setSignupRole(activeSignupRole);
  }
}

function setSignupRole(role) {
  activeSignupRole = role;
  
  // Highlight chosen button
  ['student', 'lecturer', 'admin'].forEach(r => {
    const btn = document.getElementById(`role-${r}-btn`);
    if (r === role) {
      btn.style.background = 'rgba(124,58,237,0.1)';
      btn.style.border = '1px solid var(--primary)';
      btn.style.color = 'var(--primary)';
    } else {
      btn.style.background = 'transparent';
      btn.style.border = '1px solid rgba(255,255,255,0.08)';
      btn.style.color = 'var(--text-muted)';
    }
  });
  
  // Toggle metadata fields
  if (role === 'student') {
    document.getElementById('signup-student-fields').style.display = 'flex';
    document.getElementById('signup-lecturer-fields').style.display = 'none';
  } else if (role === 'lecturer') {
    document.getElementById('signup-student-fields').style.display = 'none';
    document.getElementById('signup-lecturer-fields').style.display = 'flex';
  } else {
    document.getElementById('signup-student-fields').style.display = 'none';
    document.getElementById('signup-lecturer-fields').style.display = 'none';
  }
}

function showAuthAlert(message, isSuccess = false) {
  const alertEl = document.getElementById('auth-alert');
  alertEl.style.display = 'block';
  alertEl.style.background = isSuccess ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)';
  alertEl.style.border = isSuccess ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)';
  alertEl.style.color = isSuccess ? '#10b981' : '#ef4444';
  alertEl.textContent = message;
}

// REST API calls
async function handlePrototypeSignIn() {
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  
  if (!email || !password) {
    showAuthAlert('Please fill in both email and password.');
    return;
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (!res.ok) {
      showAuthAlert(data.message || 'Invalid email or password.');
      return;
    }
    
    localStorage.setItem('proto_token', data.token);
    appState.user = data.user;
    
    showAuthAlert('Successfully logged in! Redirecting...', true);
    setTimeout(() => {
      closeAuthModal();
      setUserRole(data.user.role);
    }, 1000);
  } catch (err) {
    console.error(err);
    showAuthAlert('Network error connecting to Express database.');
  }
}

async function handlePrototypeSignUp() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  
  if (!name || !email || !password) {
    showAuthAlert('Please fill in all general fields.');
    return;
  }
  
  const payload = {
    name,
    email,
    password,
    role: activeSignupRole
  };
  
  if (activeSignupRole === 'student') {
    payload.department = document.getElementById('signup-dept').value || 'Computer Science';
    payload.studentIdNumber = document.getElementById('signup-stdid').value || `SL-${Math.floor(100000 + Math.random() * 900000)}`;
  } else if (activeSignupRole === 'lecturer') {
    payload.title = document.getElementById('signup-title').value;
    payload.office = document.getElementById('signup-office').value || 'Office Block C';
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    if (!res.ok) {
      showAuthAlert(data.message || 'Signup failed.');
      return;
    }
    
    localStorage.setItem('proto_token', data.token);
    appState.user = data.user;
    
    showAuthAlert('Account created successfully! Redirecting...', true);
    setTimeout(() => {
      closeAuthModal();
      setUserRole(data.user.role);
    }, 1000);
  } catch (err) {
    console.error(err);
    showAuthAlert('Network error connecting to Express database.');
  }
}

// Biometrics signing simulation via Web Crypto API (identical cryptographically to the React app)
async function handlePrototypeBiometricSignIn() {
  const email = document.getElementById('signin-email').value;
  if (!email) {
    showAuthAlert('Type your email first to query device biometric keys.');
    return;
  }
  
  try {
    const optRes = await fetch(`${API_BASE}/api/auth/biometrics/login-options`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const optData = await optRes.json();
    if (!optRes.ok) {
      showAuthAlert(optData.message || 'Biometrics not setup or user not found.');
      return;
    }
    
    const { challenge, keyId } = optData;
    
    const privateKeyJwkJson = localStorage.getItem(keyId);
    if (!privateKeyJwkJson) {
      showAuthAlert('Biometric keys for this account were not found on this browser device.');
      return;
    }
    const privateKeyJwk = JSON.parse(privateKeyJwkJson);
    
    const privateKey = await window.crypto.subtle.importKey(
      'jwk',
      privateKeyJwk,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: { name: 'SHA-256' }
      },
      true,
      ['sign']
    );
    
    const encoder = new TextEncoder();
    const signatureBuffer = await window.crypto.subtle.sign(
      { name: 'RSASSA-PKCS1-v1_5' },
      privateKey,
      encoder.encode(challenge)
    );
    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
    
    const verifyRes = await fetch(`${API_BASE}/api/auth/biometrics/login-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, signature: signatureBase64 })
    });
    
    const verifyData = await verifyRes.json();
    if (!verifyRes.ok) {
      showAuthAlert(verifyData.message || 'Biometric signature validation failed.');
      return;
    }
    
    localStorage.setItem('proto_token', verifyData.token);
    appState.user = verifyData.user;
    
    showAuthAlert('Biometrics verified! Redirecting...', true);
    setTimeout(() => {
      closeAuthModal();
      setUserRole(verifyData.user.role);
    }, 1000);
  } catch (err) {
    console.error(err);
    showAuthAlert('Biometric verification failed.');
  }
}

// Biometric Enrollment inside the portal
async function enrollPrototypeBiometrics() {
  if (!appState.user) return;
  const token = localStorage.getItem('proto_token');
  if (!token) return;
  
  try {
    const optRes = await fetch(`${API_BASE}/api/auth/biometrics/register-options`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const optData = await optRes.json();
    if (!optRes.ok) {
      alert(optData.message || 'Failed to initialize biometric challenge.');
      return;
    }
    const { challenge } = optData;
    
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSASSA-PKCS1-v1_5',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: 'SHA-256' }
      },
      true,
      ['sign', 'verify']
    );
    
    const publicKeyBuffer = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
    const publicKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(publicKeyBuffer)));
    
    const privateKeyJwk = await window.crypto.subtle.exportKey('jwk', keyPair.privateKey);
    const keyId = `smartlearn_bio_${appState.user.id}`;
    localStorage.setItem(keyId, JSON.stringify(privateKeyJwk));
    
    const encoder = new TextEncoder();
    const signatureBuffer = await window.crypto.subtle.sign(
      { name: 'RSASSA-PKCS1-v1_5' },
      keyPair.privateKey,
      encoder.encode(challenge)
    );
    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
    
    const regRes = await fetch(`${API_BASE}/api/auth/biometrics/register-verify`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        publicKey: publicKeyBase64,
        signature: signatureBase64,
        keyId
      })
    });
    
    const regData = await regRes.json();
    if (!regRes.ok) {
      alert(regData.message || 'Biometric key verification failed.');
      return;
    }
    
    alert('🔒 Biometric signature set up successfully on this device!');
  } catch (err) {
    console.error(err);
    alert('Failed to register biometrics: ' + err.message);
  }
}

// Strict Role Portal View routing
function setUserRole(role) {
  appState.role = role;
  navigateTo('portal-shell');
  
  // Setup Switcher dropdown inside Navbar (For admins only!)
  const switcherContainer = document.getElementById('portal-role-switcher-container');
  if (switcherContainer) {
    if (role === 'admin') {
      switcherContainer.innerHTML = `
        <select style="padding:6px 12px; font-size:0.75rem; font-weight:700; border-radius:8px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); color:var(--primary); cursor:pointer;" onchange="setAdminPrototypeView(this.value)">
          <option value="student">🎓 View: Student Portal</option>
          <option value="lecturer">💼 View: Lecturer Desk</option>
        </select>
      `;
    } else {
      switcherContainer.innerHTML = '';
    }
  }
  
  // Route portal layout
  if (role === 'admin') {
    setAdminPrototypeView('student');
  } else if (role === 'student') {
    document.querySelectorAll('.student-only').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.lecturer-only').forEach(el => el.style.display = 'none');
    switchTab('student', 'student-dashboard');
  } else {
    document.querySelectorAll('.student-only').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.lecturer-only').forEach(el => el.style.display = 'flex');
    switchTab('lecturer', 'lecturer-dashboard');
  }
}

function setAdminPrototypeView(view) {
  if (view === 'student') {
    document.querySelectorAll('.student-only').forEach(el => el.style.display = 'flex');
    document.querySelectorAll('.lecturer-only').forEach(el => el.style.display = 'none');
    switchTab('student', 'student-dashboard');
  } else {
    document.querySelectorAll('.student-only').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.lecturer-only').forEach(el => el.style.display = 'flex');
    switchTab('lecturer', 'lecturer-dashboard');
  }
}

function handlePrototypeLogout() {
  localStorage.removeItem('proto_token');
  appState.user = null;
  navigateTo('landing-shell');
}

// Session autologin
async function validatePrototypeSession() {
  const token = localStorage.getItem('proto_token');
  if (!token) return;
  
  try {
    const res = await fetch(`${API_BASE}/api/auth/session`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok && data.user) {
      appState.user = data.user;
      setUserRole(data.user.role);
    }
  } catch (err) {
    console.warn('Auto login session validation failed.');
  }
}

// Automatically check session on script load
window.addEventListener('DOMContentLoaded', () => {
  validatePrototypeSession();
});

function updateSidebarDetails() {
  const avatarEl = document.getElementById('sidebar-user-avatar');
  const nameEl = document.getElementById('sidebar-user-name');
  const roleEl = document.getElementById('sidebar-user-role');
  
  if (!appState.user) return;
  
  nameEl.textContent = appState.user.name;
  if (appState.role === 'admin') {
    avatarEl.src = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${appState.user.name}`;
    roleEl.textContent = 'Administrator Portal';
  } else if (appState.role === 'student') {
    avatarEl.src = 'picture/avatar_student.jpg';
    roleEl.textContent = `${appState.user.department || 'Computer Science'} Student`;
  } else {
    avatarEl.src = 'picture/avatar_lecturer.jpg';
    roleEl.textContent = `Faculty Member • ${appState.user.office || 'Block C'}`;
  }
}

/* ==========================================================================
   DYNAMIC RENDER CONTROLLER
   ========================================================================== */
async function fetchStateData() {
  const token = localStorage.getItem('proto_token');
  if (!token) return;
  
  try {
    const coursesRes = await fetch(`${API_BASE}/api/courses`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (coursesRes.ok) {
      appState.courses = await coursesRes.json();
    }
    
    const notesRes = await fetch(`${API_BASE}/api/courses/notes`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (notesRes.ok) {
      appState.notes = await notesRes.json();
    }
    
    const assignmentsRes = await fetch(`${API_BASE}/api/assignments`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (assignmentsRes.ok) {
      appState.assignments = await assignmentsRes.json();
    }
    
    const forumsRes = await fetch(`${API_BASE}/api/forums`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (forumsRes.ok) {
      appState.forumThreads = await forumsRes.json();
    }
    
    if (appState.role === 'lecturer' || appState.role === 'admin') {
      const subsRes = await fetch(`${API_BASE}/api/assignments/submissions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (subsRes.ok) {
        appState.submissions = await subsRes.json();
      }
    }

    const universitiesRes = await fetch(`${API_BASE}/api/universities`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (universitiesRes.ok) {
      appState.universities = await universitiesRes.json();
    }
  } catch (err) {
    console.error('Error fetching dynamic state data:', err);
  }
}

function renderAllComponents() {
  // 1. Render Student Dashboard Courses & materials
  renderStudentCourses();
  renderStudentNotes();
  renderStudentAssignments();
  
  // 2. Render Lecturer Dashboards
  renderLecturerAnalytics();
  renderLecturerSubmissions();
  
  // 3. Render Forums
  renderForums();

  // 4. Render Calendar Timetable
  generateCalendarGrid();

  // 5. Render Dedicated Assignment Submission Center
  renderDedicatedAssignmentsDeck();

  // 6. Render Dynamic Universities Hub
  renderStudentUniversities();
}

async function renderStateData() {
  // Render local simulated state data immediately
  renderAllComponents();

  // Fetch updated data from backend asynchronously
  try {
    await fetchStateData();
    // Re-render components with the updated data
    renderAllComponents();
  } catch (err) {
    console.error('Error fetching state data:', err);
  }
}

// Render student courses list
function renderStudentCourses() {
  const container = document.getElementById('student-courses-grid');
  if (!container) return;
  container.innerHTML = '';
  
  appState.courses.forEach(course => {
    container.innerHTML += `
      <div class="course-card">
        <div class="course-banner">
          <span class="course-code">${course.code}</span>
          <h3 style="font-size:1.05rem; margin-top:10px;">${course.title}</h3>
        </div>
        <div class="course-body">
          <p>Complete introduction course mapping foundations, tests, and research guides.</p>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
            <span>📚 ${course.notesCount} Lecture Notes</span>
            <span>📝 ${course.assignmentsCount} Assignments</span>
          </div>
        </div>
        <div class="course-footer">
          <div class="instructor-profile">
            <div class="instructor-avatar">
              <img src="picture/${course.avatar}" alt="Lecturer">
            </div>
            <span>${course.instructor}</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="switchTab('student', 'student-chat')">Contact</button>
        </div>
      </div>
    `;
  });
}

// Render notes for download
function renderStudentNotes() {
  const container = document.getElementById('student-notes-list');
  if (!container) return;
  container.innerHTML = '';

  appState.notes.forEach(note => {
    const course = appState.courses.find(c => c.id === note.courseId);
    container.innerHTML += `
      <div class="glass" style="padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="badge badge-primary" style="font-size:0.65rem; margin-bottom:4px;">${course ? course.code : 'GEN'}</span>
          <h4 style="font-size:0.95rem;">${note.title}</h4>
          <span style="font-size:0.75rem; color:var(--text-light)">Uploaded on ${note.date} • ${note.size}</span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="simulateSummarizeNote('${note.title}')">AI Summarize</button>
          <a class="btn btn-primary btn-sm" href="${note.fileUrl}" target="_blank" download>Download</a>
        </div>
      </div>
    `;
  });
}

// Render student assignment submission list
function renderStudentAssignments() {
  const container = document.getElementById('student-assignments-list');
  if (!container) return;
  container.innerHTML = '';

  appState.assignments.forEach(asg => {
    const course = appState.courses.find(c => c.id === asg.courseId);
    let actionHtml = '';
    let statusBadge = '';
    
    if (asg.status === 'Pending') {
      statusBadge = '<span class="badge badge-warning">Pending</span>';
      actionHtml = `<button class="btn btn-primary btn-sm" onclick="openSubmitAssignmentModal(${asg.id}, '${asg.title}')">Submit File</button>`;
    } else {
      statusBadge = `<span class="badge badge-success">Submitted</span>`;
      if (asg.grade) {
        actionHtml = `<div style="text-align:right;">
          <span style="font-weight:700; color:var(--success)">Grade: ${asg.grade}/100</span><br>
          <span style="font-size:0.75rem; color:var(--text-muted)">Feedback: "${asg.feedback}"</span>
        </div>`;
      } else {
        actionHtml = `<span style="font-size:0.8rem; color:var(--text-muted)">Awaiting Grade</span>`;
      }
    }

    container.innerHTML += `
      <div class="glass" style="padding:20px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
            <span class="badge badge-info" style="font-size:0.65rem;">${course ? course.code : 'GEN'}</span>
            ${statusBadge}
          </div>
          <h4 style="font-size:1.05rem; margin-bottom:4px;">${asg.title}</h4>
          <span style="font-size:0.8rem; color:var(--danger)">Deadline: ${asg.deadline}</span>
        </div>
        <div>
          ${actionHtml}
        </div>
      </div>
    `;
  });
}

// Render Lecturer analytic table and details
function renderLecturerAnalytics() {
  const container = document.getElementById('lecturer-students-table-body');
  if (!container) return;
  container.innerHTML = `
    <tr>
      <td>Kofi Mensah</td>
      <td>CS101, ENG201</td>
      <td>95%</td>
      <td>3.82</td>
      <td><span class="badge badge-success">Good Stand</span></td>
    </tr>
    <tr>
      <td>Efua Ampah</td>
      <td>CS101, BUA202</td>
      <td>88%</td>
      <td>3.10</td>
      <td><span class="badge badge-success">Good Stand</span></td>
    </tr>
    <tr>
      <td>Joseph Addo</td>
      <td>CS101, MATH102</td>
      <td>65%</td>
      <td>1.95</td>
      <td><span class="badge badge-danger">Needs Help</span></td>
    </tr>
  `;
}

// Render Lecturer submissions grading view
function renderLecturerSubmissions() {
  const container = document.getElementById('lecturer-submissions-list');
  if (!container) return;
  container.innerHTML = '';

  appState.submissions.forEach(sub => {
    const asg = appState.assignments.find(a => a.id === sub.assignmentId);
    let gradeInput = '';
    
    if (sub.grade) {
      gradeInput = `
        <div style="text-align:right;">
          <span style="font-weight:700; color:var(--success)">Graded: ${sub.grade}/100</span><br>
          <span style="font-size:0.75rem; color:var(--text-light)">"${sub.feedback}"</span>
        </div>
      `;
    } else {
      gradeInput = `
        <div style="display:flex; gap:8px;">
          <input type="number" id="grade-val-${sub.id}" placeholder="Grade" style="width:70px; padding:6px; border-radius:4px; border:1px solid var(--border)">
          <input type="text" id="feedback-val-${sub.id}" placeholder="Feedback" style="width:150px; padding:6px; border-radius:4px; border:1px solid var(--border)">
          <button class="btn btn-primary btn-sm" onclick="submitGrade(${sub.id})">Grade</button>
        </div>
      `;
    }

    container.innerHTML += `
      <div class="glass" style="padding:20px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h4 style="font-size:0.95rem; margin-bottom:4px;">Student: <strong>${sub.studentName}</strong></h4>
          <span style="font-size:0.8rem; color:var(--text-muted)">File: <a href="#" style="color:var(--primary); text-decoration:underline;">${sub.fileName}</a></span><br>
          <span style="font-size:0.85rem; font-weight:600; color:var(--primary)">Assignment: ${asg ? asg.title : 'General'}</span>
        </div>
        <div>
          ${gradeInput}
        </div>
      </div>
    `;
  });
}

// Submit Grade from Lecturer View
async function submitGrade(subId) {
  const gradeInputEl = document.getElementById(`grade-val-${subId}`);
  const feedbackInputEl = document.getElementById(`feedback-val-${subId}`);
  
  if (!gradeInputEl || !gradeInputEl.value) {
    showToastNotification('Please enter a grade.');
    return;
  }
  
  const token = localStorage.getItem('proto_token');
  if (!token) return;
  
  try {
    const res = await fetch(`${API_BASE}/api/assignments/grade`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        submissionId: subId,
        grade: parseFloat(gradeInputEl.value),
        feedback: feedbackInputEl.value || 'Well done.'
      })
    });
    
    if (res.ok) {
      showToastNotification('Student graded successfully!');
      renderStateData();
    } else {
      const data = await res.json();
      showToastNotification(data.message || 'Failed to submit grade.');
    }
  } catch (err) {
    console.error(err);
    showToastNotification('Failed to connect to server to submit grade.');
  }
}

// Render Forums Discussion Board
function renderForums() {
  const container = document.getElementById('forum-posts-container');
  if (!container) return;
  container.innerHTML = '';
  
  appState.forumThreads.forEach(thread => {
    let repliesHtml = '';
    
    thread.replies.forEach(reply => {
      repliesHtml += `
        <div style="background:var(--bg-base); padding:12px 16px; border-radius:var(--radius-sm); margin-top:12px; border-left:3px solid var(--secondary);">
          <div style="display:flex; align-items:center; gap:8px; font-size:0.8rem; margin-bottom:4px;">
            <div class="instructor-avatar" style="width:20px; height:20px;">
              <img src="picture/${reply.avatar}">
            </div>
            <strong>${reply.author}</strong>
            <span class="badge badge-info" style="font-size:0.55rem;">${reply.role || 'User'}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-muted);">${reply.body}</p>
        </div>
      `;
    });

    container.innerHTML += `
      <div class="widget glass forum-thread-card">
        <div class="forum-header">
          <div class="forum-post-meta">
            <div class="forum-user-img">
              <img src="picture/${thread.avatar}">
            </div>
            <div>
              <strong>${thread.author}</strong>
              <span style="font-size:0.75rem; color:var(--text-light); margin-left:8px;">Category: ${thread.category}</span>
            </div>
          </div>
          <span class="badge badge-primary" style="font-size:0.65rem;">${thread.category}</span>
        </div>
        <div class="forum-body">
          <h4>${thread.title}</h4>
          <p>${thread.body}</p>
        </div>
        <div class="forum-actions">
          <button class="forum-action-btn" onclick="upvoteThread(${thread.id})">
            👍 <span id="upvotes-count-${thread.id}">${thread.upvotes}</span> Upvotes
          </button>
          <button class="forum-action-btn" onclick="toggleRepliesBox(${thread.id})">
            💬 ${thread.replies.length} Replies
          </button>
        </div>
        
        <!-- Replies Box -->
        <div id="replies-box-${thread.id}" style="display:block; margin-top:16px;">
          ${repliesHtml}
          
          <div style="display:flex; gap:8px; margin-top:16px;">
            <input type="text" id="reply-input-${thread.id}" placeholder="Write an academic response..." class="form-control" style="padding:8px 12px; font-size:0.85rem;">
            <button class="btn btn-secondary btn-sm" onclick="submitForumReply(${thread.id})">Comment</button>
          </div>
        </div>
      </div>
    `;
  });
}

async function upvoteThread(id) {
  const token = localStorage.getItem('proto_token');
  if (!token) return;
  try {
    const res = await fetch(`${API_BASE}/api/forums/upvote/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      showToastNotification('Upvoted thread!');
      renderStateData();
    }
  } catch (err) {
    console.error(err);
  }
}

function toggleRepliesBox(id) {
  const el = document.getElementById(`replies-box-${id}`);
  if (el.style.display === 'none') {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

async function submitForumReply(threadId) {
  const input = document.getElementById(`reply-input-${threadId}`);
  if (!input || !input.value) return;
  
  const token = localStorage.getItem('proto_token');
  if (!token) return;
  try {
    const res = await fetch(`${API_BASE}/api/forums/reply`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ threadId, body: input.value })
    });
    if (res.ok) {
      input.value = '';
      showToastNotification('Reply submitted successfully!');
      renderStateData();
    }
  } catch (err) {
    console.error(err);
  }
}

async function createForumThread() {
  const title = document.getElementById('new-thread-title').value;
  const category = document.getElementById('new-thread-category').value;
  const body = document.getElementById('new-thread-body').value;
  
  if (!title || !body) {
    showToastNotification('Please enter a title and description.');
    return;
  }
  
  const token = localStorage.getItem('proto_token');
  if (!token) return;
  try {
    const res = await fetch(`${API_BASE}/api/forums/thread`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ category, title, body })
    });
    if (res.ok) {
      document.getElementById('new-thread-title').value = '';
      document.getElementById('new-thread-body').value = '';
      showToastNotification('Thread posted successfully!');
      renderStateData();
    }
  } catch (err) {
    console.error(err);
  }
}

/* ==========================================================================
   AI CHAT ENGINE
   ========================================================================== */
const aiResponses = {
  study: [
    { key: 'recursion', response: 'Recursion is a programming concept where a function calls itself. To prevent infinite loops or stack overflow, you must have a **Base Case** (the exit clause) and a **Recursive Step** that moves inputs closer to that base case. Example:\n```python\ndef factorial(n):\n    if n == 1: return 1 # Base Case\n    return n * factorial(n - 1) # Recursive Step\n```' },
    { key: 'gpa', response: 'To raise your CGPA at university, focus on heavy-credit courses, review syllabus before semester, practice past questions (PQs), and request AI summarization for hard topics!' },
    { key: 'explain', response: 'Sure, I can explain that topic. Please provide the complex term or paste your lecture slides text here, and I will break it down into clean summaries!' }
  ],
  career: [
    { key: 'job', response: 'Ghana\'s digital economy is expanding. Top career fields right now include: Data Analysis, Web Development, Cybersecurity engineering, and FinTech product management.' },
    { key: 'ashesi', response: 'Ashesi University is well-known for its strict honor code, liberal arts curriculum, and robust computer science & management programs located on the beautiful Berekuso hills.' },
    { key: 'knust', response: 'KNUST is standard for robust core engineering and technical disciplines in Kumasi, Ghana, featuring strong laboratory support and large-scale industrial projects.' }
  ],
  helper: [
    { key: 'plagiarism', response: 'SmartLearn AI screens submissions using semantic matching. To avoid plagiarism, always write your summaries in your own words, reference source materials properly, and cite Ghanaian academic databases.' }
  ],
  tutor: [
    { key: 'code', response: 'Let me look at your code. Make sure your variables are declared, syntax is aligned, and you have imported standard python libraries. Share the error message here!' },
    { key: 'loop', response: 'A Loop repeats actions. A `for` loop is used for looping through lists/ranges, and a `while` loop runs as long as a condition is true. Watch out for infinite `while` loops!' }
  ]
};

let currentAiMode = 'study';
let chatSessionHistory = [];

function getSystemPrompt(mode) {
  const prompts = {
    study: 'You are an intelligent, empathetic Academic Study Assistant at a top Ghanaian university (like Ashesi, KNUST, or University of Ghana). Your goal is to explain concepts clearly, summarize lecture notes, suggest study strategies, and reference Ghanaian educational context where appropriate. Keep answers structured, neat, and highly professional.',
    career: 'You are an expert Career and Academic Advisor for tertiary students in Ghana. Your goal is to guide students on matching majors, job opportunities in Accra, Kumasi, and beyond (such as Hubtel, Ecobank, expressPay, Telecel, MTN), average local salaries, and the skills needed to succeed. Provide inspiring, actionable advice.',
    helper: 'You are an academic writing counselor and Assignment Helper. Assist students with structuring their essays, checking logic, suggesting citations, and understanding guidelines. Remind them that you provide guidance, not plagiarism write-ups. Review content analytically.',
    tutor: 'You are an experienced, patient Programming Tutor and Software Engineer. Explain coding syntax, trace bugs, clarify algorithm complexity (Big O), and provide brief code examples in Python, JavaScript, SQL, or Java. Keep code snippets clean and correct.'
  };
  return prompts[mode] || prompts['study'];
}

function setAiMode(mode) {
  currentAiMode = mode;
  document.querySelectorAll('.ai-mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-mode="${mode}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  
  // Reset session history
  chatSessionHistory = [];
  
  // Clear and add default greeting
  const messagesBox = document.getElementById('ai-chat-messages');
  if (!messagesBox) return;
  messagesBox.innerHTML = '';
  
  let greetingText = '';
  if (mode === 'study') greetingText = 'Hello! I am your AI Study Assistant. Ask me to explain concepts, generate study summaries, or translate lecture notes.';
  if (mode === 'career') greetingText = 'Welcome! I am your AI Career Advisor. Tell me your skills and interests, and I will suggest programs and Ghanaian universities.';
  if (mode === 'helper') greetingText = 'I am your Assignment Helper. Drop questions or paste guidelines to get structural feedback and plagiarism screenings.';
  if (mode === 'tutor') greetingText = 'Hey! I am your AI Programming Tutor. Paste your buggy code or coding concepts, and let\'s debug together!';

  // Push greeting to history
  chatSessionHistory.push({ role: 'assistant', content: greetingText });
  
  appendChatMessage('ai', greetingText);
}

function appendChatMessage(sender, text) {
  const box = document.getElementById('ai-chat-messages');
  if (!box) return;
  
  const bubble = document.createElement('div');
  bubble.className = `message-bubble ${sender === 'user' ? 'message-user' : 'message-ai'}`;
  
  // Format markdown lists and bold text simply
  let formattedText = text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/```(python|javascript|js|sql|java)?([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.05); padding:10px; border-radius:6px; margin:10px 0; font-family: Courier, monospace; overflow-x: auto;">$2</pre>');
    
  bubble.innerHTML = formattedText;
  box.appendChild(bubble);
  box.scrollTop = box.scrollHeight;
}

async function sendAiMessage() {
  const input = document.getElementById('ai-chat-input');
  if (!input || !input.value) return;
  
  const text = input.value;
  appendChatMessage('user', text);
  chatSessionHistory.push({ role: 'user', content: text });
  input.value = '';
  
  // Show Typing Indicator
  const box = document.getElementById('ai-chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message-bubble message-ai typing-indicator';
  typingDiv.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div> AI is thinking...`;
  box.appendChild(typingDiv);
  box.scrollTop = box.scrollHeight;
  
  // Check local key configuration
  const geminiKey = localStorage.getItem('smartlearn_gemini_key');
  let responseText = '';
  
  try {
    if (geminiKey) {
      // 1. Google Gemini API Call
      updateApiStatusBadge('gemini');
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      
      // Format history array for Gemini API schema
      const geminiHistory = chatSessionHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: geminiHistory,
          systemInstruction: {
            parts: [{ text: getSystemPrompt(currentAiMode) }]
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Gemini API responded with status ${response.status}`);
      }
      
      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
        responseText = data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Gemini API response structure mismatch.');
      }
    } else {
      // 2. Pollinations AI (Keyless Fallback)
      updateApiStatusBadge('keyless');
      const systemPrompt = getSystemPrompt(currentAiMode);
      
      const payloadMessages = [
        { role: 'system', content: systemPrompt },
        ...chatSessionHistory
      ];
      
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payloadMessages,
          model: 'openai'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Pollinations API responded with status ${response.status}`);
      }
      
      responseText = await response.text();
    }
  } catch (error) {
    console.error('API connection failed.', error);
    showToastNotification('AI service connection failed.');
    responseText = `⚠️ **AI Service Error:** Failed to generate response. Please verify your internet connection or that the AI Keys are properly configured.`;
  } finally {
    // Remove typing indicator
    typingDiv.remove();
    
    // Render and append to chat UI & session history
    appendChatMessage('ai', responseText);
    chatSessionHistory.push({ role: 'assistant', content: responseText });
    
    // Restore proper badge after fallback notification times out
    setTimeout(() => {
      const activeKey = localStorage.getItem('smartlearn_gemini_key');
      updateApiStatusBadge(activeKey ? 'gemini' : 'keyless');
    }, 5000);
  }
}

/* ==========================================================================
   AI NOTE SUMMARIZER
   ========================================================================== */
async function simulateSummarizeNote(title) {
  // Switch to AI Assistant tab
  switchTab('student', 'student-ai-assistant');
  setAiMode('study');
  
  const box = document.getElementById('ai-chat-messages');
  const userMsgText = `Please summarize: "${title}"`;
  appendChatMessage('user', userMsgText);
  chatSessionHistory.push({ role: 'user', content: userMsgText });
  
  // Sim Typing
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message-bubble message-ai typing-indicator';
  typingDiv.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div> Analyzing file...`;
  box.appendChild(typingDiv);
  box.scrollTop = box.scrollHeight;

  const token = localStorage.getItem('proto_token');
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE}/api/ai/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        textContent: `Content from ${title}. Please summarize the key objectives, outline core topics and create a practice flashcard.`
      })
    });

    const data = await res.json();
    typingDiv.remove();
    if (res.ok && data.summary) {
      appendChatMessage('ai', data.summary);
      chatSessionHistory.push({ role: 'assistant', content: data.summary });
    } else {
      const errMsg = data.message || 'Failed to summarize notes.';
      appendChatMessage('ai', `⚠️ **AI Summarization Failed:** ${errMsg}`);
    }
  } catch (err) {
    typingDiv.remove();
    console.error(err);
    appendChatMessage('ai', `⚠️ **AI Summarization Failed:** Network error connecting to AI service.`);
  }
}

/* ==========================================================================
   PAST QUESTIONS SEARCH & EXPLORE
   ========================================================================== */
function searchPastQuestions() {
  const query = document.getElementById('pq-search-input').value.toUpperCase();
  const list = document.getElementById('pq-results-list');
  if (!list) return;
  list.innerHTML = '';
  
  const mockPqs = [
    { code: 'CS101', title: 'CS101 Intro to Coding Exam (2024)', year: '2024', semester: 'Sem 1' },
    { code: 'CS101', title: 'CS101 Mid-Sem Test Questions (2023)', year: '2023', semester: 'Sem 2' },
    { code: 'MATH102', title: 'MATH102 Calculus II Final Exam (2024)', year: '2024', semester: 'Sem 1' },
    { code: 'ENG201', title: 'ENG201 Software Architectures Final (2024)', year: '2024', semester: 'Sem 1' }
  ];
  
  const filtered = mockPqs.filter(pq => pq.code.includes(query) || pq.title.toUpperCase().includes(query));
  
  if (filtered.length === 0) {
    list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">No past questions found matching code. Try searching "CS101" or "MATH102".</p>`;
    return;
  }
  
  filtered.forEach(pq => {
    list.innerHTML += `
      <div class="glass" style="padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="badge badge-primary">${pq.code}</span>
          <h4 style="font-size:0.95rem; margin-top:4px;">${pq.title}</h4>
          <span style="font-size:0.75rem; color:var(--text-light)">Filter: Year ${pq.year} • Semester: ${pq.semester}</span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="simulatePqExplain('${pq.title}')">AI Explain Solution</button>
          <a class="btn btn-primary btn-sm" href="#" onclick="alert('Downloading past question PDF...')">Download</a>
        </div>
      </div>
    `;
  });
}

function simulatePqExplain(title) {
  // Open modal/Chat alert
  switchTab('student', 'student-ai-assistant');
  setAiMode('study');
  
  const userMsgText = `Show me the solution and step-by-step breakdown of: "${title}"`;
  appendChatMessage('user', userMsgText);
  chatSessionHistory.push({ role: 'user', content: userMsgText });
  
  const aiResponseText = `Analyzing **${title}** solution guidelines...\n\n**Section A - Question 1 Solution:**\nTo solve this, we apply standard operational hierarchies:\n- Step 1: Initialize values.\n- Step 2: Formulate recursive paths.\n- Step 3: Run validation checks.\n\n*Explanation:* This method ensures linear complexity, reducing the university computation workload by **O(N)**. Let me know if you would like me to formulate a practice quiz based on this past question!`;
  
  appendChatMessage('ai', aiResponseText);
  chatSessionHistory.push({ role: 'assistant', content: aiResponseText });
}

/* ==========================================================================
   INTERACTIVE CAREER TEST
   ========================================================================== */
let careerScores = { programming: 0, business: 0, datascience: 0 };
let currentQuestionIndex = 0;

function selectCareerOption(element, category) {
  // Deselect other options in the active slide
  const parent = element.parentElement;
  parent.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  
  // Select clicked
  element.classList.add('selected');
  element.setAttribute('data-choice', category);
  
  // Enable next button
  document.getElementById('career-next-btn').disabled = false;
}

function nextCareerQuestion() {
  const activeSlide = document.querySelector('.question-slide.active');
  const selectedOption = activeSlide.querySelector('.option-card.selected');
  
  if (!selectedOption) return;
  
  // Increment Score
  const choice = selectedOption.getAttribute('data-choice');
  careerScores[choice] += 1;
  
  // Go to next question or show results
  activeSlide.classList.remove('active');
  currentQuestionIndex += 1;
  
  const progressPercent = ((currentQuestionIndex + 1) / 5) * 100;
  document.getElementById('career-progress-bar').style.width = `${progressPercent}%`;

  const nextSlide = document.getElementById(`career-q-${currentQuestionIndex}`);
  if (nextSlide) {
    nextSlide.classList.add('active');
    document.getElementById('career-next-btn').disabled = true;
  } else {
    // Finished all questions
    showCareerResults();
  }
}

function showCareerResults() {
  // Hide questions
  document.getElementById('career-quiz-box').style.display = 'none';
  document.getElementById('career-result-box').style.display = 'block';
  
  // Determine top career
  let topCategory = 'programming';
  let maxScore = -1;
  for (let key in careerScores) {
    if (careerScores[key] > maxScore) {
      maxScore = careerScores[key];
      topCategory = key;
    }
  }
  
  const data = appState.careersDb[topCategory];
  
  // Update result text
  document.getElementById('career-result-title').textContent = `Recommended Track: ${data.programs[0]}`;
  document.getElementById('career-result-desc').textContent = data.description;
  document.getElementById('career-result-salary').textContent = data.salary;
  document.getElementById('career-result-demand').textContent = data.demand;
  
  // Skills list
  const skillsContainer = document.getElementById('career-result-skills');
  skillsContainer.innerHTML = '';
  data.skills.forEach(skill => {
    skillsContainer.innerHTML += `<span class="badge badge-primary">${skill}</span>`;
  });
  
  // University Recommendations
  const uniContainer = document.getElementById('career-result-unis');
  uniContainer.innerHTML = '';
  data.universities.forEach(uni => {
    uniContainer.innerHTML += `<li>📍 <strong>${uni}</strong> - High placement rates</li>`;
  });
  
  // Renders visual SVG nodes depending on results
  const diagramNode = document.getElementById('visual-node-end');
  if (diagramNode) {
    diagramNode.textContent = data.programs[0];
  }
}

function resetCareerQuiz() {
  careerScores = { programming: 0, business: 0, datascience: 0 };
  currentQuestionIndex = 0;
  
  document.getElementById('career-quiz-box').style.display = 'block';
  document.getElementById('career-result-box').style.display = 'none';
  
  document.getElementById('career-progress-bar').style.width = '20%';
  document.getElementById('career-next-btn').disabled = true;
  
  document.querySelectorAll('.question-slide').forEach(slide => slide.classList.remove('active'));
  document.getElementById('career-q-0').classList.add('active');
  
  document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
}

/* ==========================================================================
   DYNAMIC GPA PREDICTOR CALCULATOR
   ========================================================================== */
function updateGpaPredictor() {
  const gpa1 = parseFloat(document.getElementById('gpa-slide-cs101').value);
  const gpa2 = parseFloat(document.getElementById('gpa-slide-math102').value);
  const gpa3 = parseFloat(document.getElementById('gpa-slide-eng201').value);
  const gpa4 = parseFloat(document.getElementById('gpa-slide-bua202').value);
  
  // Read value labels
  document.getElementById('val-cs101').textContent = getGradeLetter(gpa1);
  document.getElementById('val-math102').textContent = getGradeLetter(gpa2);
  document.getElementById('val-eng201').textContent = getGradeLetter(gpa3);
  document.getElementById('val-bua202').textContent = getGradeLetter(gpa4);
  
  // Compute average
  const avg = ((gpa1 + gpa2 + gpa3 + gpa4) / 4).toFixed(2);
  
  // Render avg
  document.getElementById('predicted-gpa-score').textContent = avg;
  
  // Color scale
  const textEl = document.getElementById('predicted-gpa-score');
  if (avg >= 3.6) {
    textEl.style.color = 'var(--success)';
  } else if (avg >= 3.0) {
    textEl.style.color = 'var(--primary)';
  } else if (avg >= 2.0) {
    textEl.style.color = 'var(--warning)';
  } else {
    textEl.style.color = 'var(--danger)';
  }
}

function getGradeLetter(val) {
  if (val === 4.0) return 'A (4.0)';
  if (val === 3.5) return 'B+ (3.5)';
  if (val === 3.0) return 'B (3.0)';
  if (val === 2.5) return 'C+ (2.5)';
  if (val === 2.0) return 'C (2.0)';
  if (val === 1.5) return 'D+ (1.5)';
  if (val === 1.0) return 'D (1.0)';
  return 'F (0.0)';
}

/* ==========================================================================
   MOOD & STRESS WIDGETS
   ========================================================================== */
function selectMood(emoji, message) {
  const resultBox = document.getElementById('mood-response-box');
  if (!resultBox) return;
  
  let suggestion = '';
  if (emoji === '😫' || emoji === '🤯') {
    suggestion = `🚨 **Stress relief tip:** Take a 15-minute screen-free break. Put on comfortable shoes and walk around. Or ask your **AI Study Planner** to reduce your load today!`;
  } else if (emoji === '😐') {
    suggestion = `💪 **Keep going!** You are doing great. Plan study intervals using the Pomodoro technique: 25 minutes of work followed by a 5-minute coffee break.`;
  } else {
    suggestion = `🌟 **Fantastic!** Leverage this high positive energy to master your heavy programming modules today. Keep thriving!`;
  }
  
  resultBox.innerHTML = `
    <div class="glass" style="padding:16px; margin-top:16px; border-left: 4px solid var(--primary);">
      <p style="font-size:0.95rem;">You selected ${emoji}.</p>
      <p style="font-size:0.85rem; color:var(--text-muted); margin-top:6px;">${suggestion}</p>
    </div>
  `;
}

function updateStressMeter(value) {
  const bar = document.getElementById('stress-fill-bar');
  if (!bar) return;
  
  bar.style.width = `${value}%`;
  
  if (value > 75) {
    bar.style.backgroundColor = 'var(--danger)';
  } else if (value > 45) {
    bar.style.backgroundColor = 'var(--warning)';
  } else {
    bar.style.backgroundColor = 'var(--success)';
  }
}

/* ==========================================================================
   AI DAILY STUDY PLANNER
   ========================================================================== */
function generateDailyStudyPlan() {
  const subjects = parseInt(document.getElementById('plan-hours-input').value) || 4;
  const targetBox = document.getElementById('generated-study-plan-box');
  if (!targetBox) return;
  
  targetBox.innerHTML = `
    <div style="text-align:center; padding:12px 0;">
      <div class="typing-dots"><span></span><span></span><span></span></div> Optimizing plan...
    </div>
  `;
  
  setTimeout(() => {
    targetBox.innerHTML = `
      <div class="glass" style="padding:20px; border-left:4px solid var(--secondary);">
        <h4 style="font-size:1.1rem; margin-bottom:12px;">🌟 AI Custom Timetable (${subjects} Hours)</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:10px; font-size:0.9rem;">
          <li>⏰ <strong>Session 1 (2 Hours):</strong> Focus on **CS101 recursion & loops**. Best done in the morning.</li>
          <li>☕ <strong>Break (30 mins):</strong> Rest, stay hydrated, stand up.</li>
          <li>⏰ <strong>Session 2 (${subjects - 2} Hours):</strong> Read **MATH102 Derivatives**. Practice 3 past questions.</li>
          <li>🎯 <strong>Final Check:</strong> Update your submitted assignments log!</li>
        </ul>
      </div>
    `;
  }, 800);
}

/* ==========================================================================
   TIMETABLE CALENDAR GRID GENERATION
   ========================================================================== */
function generateCalendarGrid() {
  const container = document.getElementById('portal-calendar-grid');
  if (!container) return;
  container.innerHTML = '';
  
  // Static headers
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(d => {
    container.innerHTML += `<div class="calendar-header-day">${d}</div>`;
  });
  
  // Fill 35 calendar cells (representing May 2026)
  // May 1st 2026 starts on Friday (inactive cells for first 5 days)
  for (let i = 0; i < 5; i++) {
    container.innerHTML += `<div class="calendar-day-cell inactive"></div>`;
  }
  
  // May Days (1 to 30)
  for (let day = 1; day <= 30; day++) {
    let activeClass = '';
    let eventHtml = '';
    
    if (day === 24) {
      activeClass = 'today';
    }
    
    if (day === 28) {
      eventHtml = `<div class="calendar-event-dot danger">CS101 Deadline</div>`;
    } else if (day === 30) {
      eventHtml = `<div class="calendar-event-dot warning">MATH102 Exam</div>`;
    } else if (day === 15) {
      eventHtml = `<div class="calendar-event-dot success">Notes Uploaded</div>`;
    }
    
    container.innerHTML += `
      <div class="calendar-day-cell ${activeClass}">
        <span>${day}</span>
        ${eventHtml}
      </div>
    `;
  }
}

/* ==========================================================================
   ASSIGNMENT SUBMISSION AND LECTURER CREATE SIMULATIONS
   ========================================================================== */
let activeSubmittingAsgId = null;

function openSubmitAssignmentModal(id, title) {
  activeSubmittingAsgId = id;
  document.getElementById('modal-asg-title').textContent = title;
  document.getElementById('assignment-submit-modal').style.display = 'flex';
}

function closeSubmitAssignmentModal() {
  document.getElementById('assignment-submit-modal').style.display = 'none';
  activeSubmittingAsgId = null;
}

async function simulateSubmitFile() {
  const fileInput = document.getElementById('asg-file-upload');
  if (!fileInput || !fileInput.files.length) {
    showToastNotification('Please select a file to upload.');
    return;
  }
  
  const file = fileInput.files[0];
  const allowedExtensions = /(\.pdf|\.docx|\.ppt|\.zip)$/i;
  if (!allowedExtensions.exec(file.name)) {
    showToastNotification('Invalid file type! Supported: PDF, DOCX, PPT, ZIP.');
    return;
  }
  
  const token = localStorage.getItem('proto_token');
  if (!token) return;

  const formData = new FormData();
  formData.append('assignmentId', activeSubmittingAsgId);
  formData.append('homework', file);

  try {
    const res = await fetch(`${API_BASE}/api/assignments/submit`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
      body: formData
    });
    
    const data = await res.json();
    if (res.ok) {
      closeSubmitAssignmentModal();
      showToastNotification(`Assignment submitted successfully! Plagiarism: ${data.plagiarismScore}%`);
      renderStateData();
    } else {
      showToastNotification(data.message || 'Submission failed.');
    }
  } catch (err) {
    console.error(err);
    showToastNotification('Failed to connect to server.');
  }
}

async function simulateLecturerUploadNote() {
  const title = document.getElementById('lecturer-note-title').value;
  const courseId = document.getElementById('lecturer-note-course').value;
  
  if (!title) {
    showToastNotification('Please enter a note title.');
    return;
  }
  
  const token = localStorage.getItem('proto_token');
  if (!token) return;

  const noteBlob = new Blob([`SmartLearn Lecture Note: ${title}\nCourse: ${courseId}`], { type: 'application/pdf' });
  const formData = new FormData();
  formData.append('courseId', courseId);
  formData.append('title', title);
  formData.append('note', noteBlob, `${title}.pdf`);

  try {
    const res = await fetch(`${API_BASE}/api/courses/upload-note`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}` 
      },
      body: formData
    });
    
    if (res.ok) {
      document.getElementById('lecturer-note-title').value = '';
      showToastNotification('Lecture notes uploaded successfully!');
      renderStateData();
    } else {
      const data = await res.json();
      showToastNotification(data.message || 'Upload failed.');
    }
  } catch (err) {
    console.error(err);
    showToastNotification('Failed to connect to server.');
  }
}

async function simulateLecturerCreateAsg() {
  const title = document.getElementById('lecturer-asg-title').value;
  const courseId = document.getElementById('lecturer-asg-course').value;
  const deadline = document.getElementById('lecturer-asg-deadline').value || '2026-06-10';
  
  if (!title) {
    showToastNotification('Please enter an assignment title.');
    return;
  }
  
  const token = localStorage.getItem('proto_token');
  if (!token) return;

  try {
    const res = await fetch(`${API_BASE}/api/assignments/create`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        title,
        courseId,
        deadline,
        totalPoints: 100,
        description: `Complete the tasks outlined in the course outline for ${courseId}.`
      })
    });
    
    if (res.ok) {
      document.getElementById('lecturer-asg-title').value = '';
      showToastNotification('Assignment created and published!');
      renderStateData();
    } else {
      const data = await res.json();
      showToastNotification(data.message || 'Failed to create assignment.');
    }
  } catch (err) {
    console.error(err);
    showToastNotification('Failed to connect to server.');
  }
}

/* ==========================================================================
   INTERACTIVE SUB-PAGE CONTROLLERS & AI CALCULATORS
   ========================================================================== */

// 1. Program Selection AI Suitability Engine
function calculateProgramSuitability(program, score) {
  const displayBox = document.getElementById('ai-suitability-display-box');
  if (!displayBox) return;

  displayBox.innerHTML = `
    <div class="glass" style="padding: 24px; text-align: center; border-left: 4px solid var(--accent); animation: fadeIn 0.4s ease;">
      <div class="typing-dots" style="margin-bottom: 8px;"><span></span><span></span><span></span></div>
      Recalculating suitability based on Kofi Mensah's active CGPA (3.82) and CS101 parameters...
    </div>
  `;

  setTimeout(() => {
    // Incorporate current CGPA into score calculation
    let adjustedScore = ((score * 0.7) + (3.82 / 4.0 * 30)).toFixed(0);
    let standing = adjustedScore >= 85 ? 'First Class Outstanding Alignment' : 'Strong Profile Alignment';
    let color = adjustedScore >= 85 ? 'var(--success)' : 'var(--primary)';

    displayBox.innerHTML = `
      <div class="glass" style="padding: 32px; border-left: 4px solid var(--accent); animation: fadeIn 0.4s ease; display: grid; grid-template-columns: 100px 1fr; gap: 24px; align-items: center;">
        <div style="width: 90px; height: 90px; border-radius: var(--radius-full); border: 4px solid ${color}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; color: ${color}; box-shadow: 0 0 16px rgba(124, 58, 237, 0.15)">
          ${adjustedScore}%
        </div>
        <div>
          <span class="badge badge-primary">${standing}</span>
          <h3 style="margin: 8px 0 6px; font-size: 1.3rem;">AI Suitability Score: ${program}</h3>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.5; margin-bottom:12px;">
            Based on your active transcript standing and first-class coding indices, your math capability maps exceptionally well to this track. You have completed prerequisite coursework (CS101 grade: 4.0) successfully.
          </p>
          <div style="display:flex; gap:12px;">
            <button class="btn btn-secondary btn-sm" onclick="switchTab('student', 'student-chat')">Contact Department Head</button>
            <button class="btn btn-primary btn-sm" onclick="switchTab('student', 'student-career-guidance')">Plot Career Graph 📈</button>
          </div>
        </div>
      </div>
    `;
    showToastNotification(`AI Match calculated for ${program}!`);
  }, 1000);
}

// 2. Start Faculty Chat Link
function startFacultyChat(facultyName) {
  switchTab('student', 'student-ai-assistant');
  setAiMode('study');
  
  const box = document.getElementById('ai-chat-messages');
  // Mock message from Faculty member
  setTimeout(() => {
    appendChatMessage('ai', `<strong>${facultyName}</strong>: Hello Kofi! I received your chat notification via the SmartLearn directory. I checked your current class performance (95% attendance, Term GPA: 3.82) - exceptional work. Let me know if you have any questions regarding class modules or assignment grading scales!`);
  }, 3000);
  
  showToastNotification(`Bridge opened to ${facultyName}!`);
}

// 3. Book Video Consultation
async function scheduleFacultyCall() {
  const recipientSelect = document.getElementById('consult-recipient');
  const date = document.getElementById('consult-date').value;
  const purpose = document.getElementById('consult-purpose').value;
  
  if (!purpose) {
    showToastNotification('Please enter a consultation topic.');
    return;
  }

  const token = localStorage.getItem('proto_token');
  if (!token) return;

  let lecturerId = recipientSelect.value;
  if (!lecturerId || lecturerId.length < 10) {
    const course = appState.courses.find(c => c.instructorId);
    if (course && course.instructorId) {
      lecturerId = course.instructorId;
    } else {
      showToastNotification('No active lecturers found to book consultation.');
      return;
    }
  }

  try {
    const res = await fetch(`${API_BASE}/api/consultations/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        lecturerId,
        scheduledTime: date || new Date(Date.now() + 24*60*60*1000).toISOString(),
        topic: purpose,
        duration: 30
      })
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById('consult-purpose').value = '';
      showToastNotification('Consultation booked successfully!');
      renderStateData();
    } else {
      showToastNotification(data.message || 'Booking failed.');
    }
  } catch (err) {
    console.error(err);
    showToastNotification('Failed to connect to server.');
  }
}

// 4. Dedicated Assignment submission dashboard compiler
function renderDedicatedAssignmentsDeck() {
  const container = document.getElementById('dedicated-assignments-deck');
  if (!container) return;
  container.innerHTML = '';

  appState.assignments.forEach(asg => {
    const course = appState.courses.find(c => c.id === asg.courseId);
    let submitActionHtml = '';
    let plagiarismBadge = '<span class="badge badge-info">Plagiarism Shield Active</span>';
    let scoreDisplayHtml = '';
    
    // Calculate simulated deadline differences in days
    const deadlineDiff = Math.ceil((new Date(asg.deadline) - new Date('2026-05-24')) / (1000 * 60 * 60 * 24));
    let countdownText = deadlineDiff > 0 ? `⏰ Due in ${deadlineDiff} Days` : `🚨 Past Due`;
    let countdownBadgeClass = deadlineDiff > 3 ? 'badge-success' : 'badge-danger';
    
    if (asg.status === 'Pending') {
      submitActionHtml = `<button class="btn btn-primary btn-sm" onclick="openSubmitAssignmentModal(${asg.id}, '${asg.title}')">Upload & Submit File 🚀</button>`;
      scoreDisplayHtml = `<span style="font-size:0.85rem; color:var(--text-muted);">Status: <strong>Awaiting Upload</strong></span>`;
    } else {
      plagiarismBadge = '<span class="badge badge-success">0% Plagiarism Detected (Verified)</span>';
      if (asg.grade) {
        submitActionHtml = `<button class="btn btn-secondary btn-sm" onclick="openSubmitAssignmentModal(${asg.id}, '${asg.title}')">Resubmit Revision 🔄</button>`;
        scoreDisplayHtml = `
          <div style="background: rgba(16,185,129,0.03); border:1px solid var(--success); padding:16px; border-radius:var(--radius-sm); margin-top:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-weight:700; color:var(--success); font-size:1.05rem;">Grade Received: ${asg.grade}/100</span>
              <span style="font-size:0.75rem; color:var(--text-light)">Graded by Lecturer</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); font-style:italic; margin-bottom:12px;">"Feedback: ${asg.feedback}"</p>
            
            <!-- AI Suggestion enhancements -->
            <div style="background: rgba(124,58,237,0.05); padding:12px; border-radius:6px; border-left:3px solid var(--secondary);">
              <span style="font-size:0.75rem; font-weight:700; color:var(--secondary);">💡 SmartLearn AI Feedback Analysis:</span>
              <ul style="margin-left:14px; font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
                <li>Excellent layout of class diagrams. Expand UML relationships in exam modules for 5% higher potential grades.</li>
                <li>Your logical structure matches optimal structural patterns. Check the Study Planner for more practice materials!</li>
              </ul>
            </div>
          </div>
        `;
      } else {
        submitActionHtml = `<button class="btn btn-secondary btn-sm" onclick="openSubmitAssignmentModal(${asg.id}, '${asg.title}')">Resubmit File 🔄</button>`;
        scoreDisplayHtml = `
          <div style="background: rgba(245,158,11,0.03); border:1px solid var(--warning); padding:12px; border-radius:var(--radius-sm); margin-top:16px; font-size:0.85rem; color:var(--warning);">
            ⏳ File submitted successfully. Waiting for faculty evaluation and grading queue checks.
          </div>
        `;
      }
    }

    container.innerHTML += `
      <div class="widget glass" style="margin-bottom:24px; padding:32px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <span class="badge badge-primary">${course ? course.code : 'GEN'}</span>
              <span class="badge ${countdownBadgeClass}">${countdownText}</span>
              ${plagiarismBadge}
            </div>
            <h3 style="font-size:1.3rem; margin-bottom:4px;">${asg.title}</h3>
            <p style="font-size:0.85rem; color:var(--text-light)">Prerequisites: Core coding lectures 1-3. Document must be structured in double space.</p>
          </div>
          <div>
            ${submitActionHtml}
          </div>
        </div>

        ${scoreDisplayHtml}

        <!-- Submission History & Versions Tracker -->
        <div style="margin-top:20px; border-top: 1px solid var(--border); padding-top:16px;">
          <h4 style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">Submission Version History:</h4>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:0.8rem; color:var(--text-light)">
            ${asg.status === 'Submitted' ? `
              <div style="display:flex; justify-content:space-between;">
                <span>📄 v1_final_${asg.courseId.toLowerCase()}.pdf (Verified)</span>
                <span>Uploaded on 2026-05-22</span>
              </div>
            ` : '<em>No previous versions detected. Upload your first release.</em>'}
          </div>
        </div>
      </div>
    `;
  });
}

// 5. Faculty call COORDINATOR
// Handled by scheduleFacultyCall dynamic async version above.

/* ==========================================================================
   DYNAMIC GHANA UNIVERSITIES HUB RENDERER
   ========================================================================== */
function getMappedRecommendations(uni) {
  const name = uni.name.toLowerCase();
  if (name.includes('ashesi')) return ['Software Engineering', 'Business Management', 'Tech Entrepreneurship'];
  if (name.includes('ghana (ug)') || name.includes('legon')) return ['Medicine & Health', 'Law & Public Policy', 'Corporate Finance', 'Humanities'];
  if (name.includes('kwame nkrumah') || name.includes('knust')) return ['Mechanical & Civil Engineering', 'Computer Engineering', 'Pharmacy & Health'];
  if (name.includes('cape coast (ucc)')) return ['Educational Pedagogy', 'Accounting & Finance', 'Optometry'];
  if (name.includes('professional studies') || name.includes('upsa')) return ['Chartered Accounting', 'Marketing & Sales', 'Public Relations'];
  if (name.includes('mines and tech') || name.includes('umat')) return ['Mining & Geological Engineering', 'Petroleum Engineering'];
  if (name.includes('health and allied') || name.includes('uhas')) return ['Clinical Medicine', 'General Nursing', 'Medical Lab Science'];
  if (name.includes('energy and natural') || name.includes('uenr')) return ['Renewable Energy', 'Natural Resources Management'];
  if (name.includes('development studies') || name.includes('uds')) return ['Rural Development', 'Public Health', 'Agronomy'];
  if (name.includes('education, winneba') || name.includes('uew')) return ['Teacher Education', 'Mathematics Instruction'];
  if (name.includes('management and public') || name.includes('gimpa')) return ['Public Administration', 'Corporate Law', 'Executive Business'];
  if (name.includes('academic city')) return ['Robotics & Automation', 'Artificial Intelligence', 'Industrial Design'];
  if (name.includes('all nations') || name.includes('anu')) return ['Space Sciences & Satellites', 'Electronics Engineering'];
  if (name.includes('technical')) return ['TVET Technology', 'Applied Engineering', 'Vocational Arts'];
  
  if (uni.programsOffered && uni.programsOffered.length > 0) {
    return uni.programsOffered.slice(0, 2).map(p => p.replace(/^(BSc|BA|BEd|BTech|Doctor of|Bachelor of)\s+/, ''));
  }
  return ['General Academics', 'Career Readiness'];
}

function renderStudentUniversities() {
  const container = document.getElementById('uni-dynamic-grid-container');
  if (!container) return;

  // Filter list locally
  const query = appState.uniSearchQuery.toLowerCase();
  const typeFilter = appState.selectedUniType;

  const filtered = appState.universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(query) || uni.location.toLowerCase().includes(query);
    const matchesType = typeFilter === 'All' || uni.type === typeFilter;
    return matchesSearch && matchesType;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: var(--text-muted); padding: 40px 0; grid-column: 1 / -1; font-weight: 600;">
        No universities match your search criteria. Try a different query!
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  filtered.forEach(uni => {
    // Generate programs list html
    let programsHtml = '';
    uni.programsOffered.slice(0, 3).forEach(prog => {
      programsHtml += `<span class="badge" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); font-size: 0.7rem; color: var(--text-muted); padding: 4px 6px; border-radius: 4px;">${prog}</span>`;
    });

    const ratingSeed = 5.0 - (uni.ranking * 0.01) - (uni.type === 'Private' ? 0.05 : 0);
    const mappedRecs = getMappedRecommendations(uni);
    const recsHtml = mappedRecs.map(rec => `<span class="badge" style="background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.15); color: #c084fc; font-size: 0.7rem; padding: 4px 6px; border-radius: 4px; display: inline-block;">${rec}</span>`).join(' ');

    container.innerHTML += `
      <div class="uni-preview-card glass" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
        <div>
          <div class="uni-img-wrapper" style="height: 180px; position: relative; overflow: hidden; background: #000;">
            <img src="${uni.image}" alt="${uni.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='picture/ug_campus.jpg'">
            <span class="badge badge-primary" style="position: absolute; top: 12px; right: 12px; font-size: 0.65rem; padding: 4px 8px; border-radius: 6px;">🏆 Rank #${uni.ranking}</span>
            <span class="badge" style="position: absolute; bottom: 12px; left: 12px; font-size: 0.65rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); color: var(--success); padding: 4px 8px; border-radius: 6px;">${uni.type}</span>
          </div>
          <div class="uni-preview-details" style="padding: 24px; text-align: left;">
            <h3 style="font-size: 1.15rem; margin: 0 0 6px; font-weight: 800; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${uni.name}">${uni.name}</h3>
            <p style="font-size: 0.75rem; color: var(--text-light); margin-bottom: 8px;">
              <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uni.name + ' ' + uni.location)}" target="_blank" style="color: inherit; text-decoration: none;" onclick="event.stopPropagation();" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-light)'">
                📍 ${uni.location} • Established ${uni.established} 🗺️
              </a>
            </p>
            <div style="margin-bottom: 12px;">${generateStarRatingHTML(ratingSeed)}</div>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${uni.academicsInfo}</p>
            
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border); padding-top: 14px; margin-bottom: 0;">
              <li style="display: flex; justify-content: space-between;">
                <span>💰 School Fees:</span>
                <strong style="color: var(--text-main);">${uni.feesRange}</strong>
              </li>
              <li style="display: flex; flex-direction: column; gap: 4px;">
                <span>🎓 Scholarships:</span>
                <strong style="color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${uni.scholarshipsInfo}</strong>
              </li>
              <li style="display: flex; flex-direction: column; gap: 4px;">
                <span>🎯 AI Mapped Recommendations:</span>
                <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px;">
                  ${recsHtml}
                </div>
              </li>
              <li style="display: flex; flex-direction: column; gap: 4px;">
                <span>💬 Campus Review:</span>
                <span style="color: var(--text-main); font-style: italic; line-height: 1.4;">"${uni.performanceReview}"</span>
              </li>
              <li style="display: flex; flex-direction: column; gap: 6px; margin-top: 2px;">
                <span>📚 Programs:</span>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${programsHtml}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div style="padding: 0 24px 24px 24px;">
          <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="openUniRequirementsModal('${uni.id}')">View Admission Terms</button>
        </div>
      </div>
    `;
  });
}

function filterUniversitiesList() {
  const searchInput = document.getElementById('uni-search-input');
  if (searchInput) {
    appState.uniSearchQuery = searchInput.value;
  }
  renderStudentUniversities();
}

function filterUniversitiesType(type) {
  appState.selectedUniType = type;
  
  // Update button active states
  document.querySelectorAll('.uni-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (type === 'All') document.getElementById('filter-uni-all').classList.add('active');
  if (type === 'Public') document.getElementById('filter-uni-public').classList.add('active');
  if (type === 'Private') document.getElementById('filter-uni-private').classList.add('active');

  renderStudentUniversities();
}

function openUniRequirementsModal(uniId) {
  const uni = appState.universities.find(u => u.id === uniId);
  if (!uni) return;

  // Set values
  document.getElementById('uni-modal-badge').textContent = uni.type;
  document.getElementById('uni-modal-badge').className = uni.type === 'Public' ? 'badge badge-success' : 'badge badge-primary';
  document.getElementById('uni-modal-name').textContent = uni.name;
  
  // Set location search query map link
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uni.name + ' ' + uni.location)}`;
  document.getElementById('uni-modal-meta').innerHTML = `Ranked #${uni.ranking} in Ghana • Established ${uni.established} • <a href="${mapLink}" target="_blank" style="color: var(--primary); text-decoration: underline; font-weight: bold;">📍 ${uni.location} 🗺️</a>`;
  
  document.getElementById('uni-modal-requirements').textContent = uni.admissionRequirements;
  document.getElementById('uni-modal-performance').textContent = uni.performanceReview;
  document.getElementById('uni-modal-fees').textContent = uni.feesRange;
  document.getElementById('uni-modal-scholarships').textContent = uni.scholarshipsInfo;

  // AI Mapped Recommendations
  const recsBox = document.getElementById('uni-modal-mapped-recs');
  if (recsBox) {
    recsBox.innerHTML = '';
    const mappedRecs = getMappedRecommendations(uni);
    mappedRecs.forEach(rec => {
      recsBox.innerHTML += `<span class="badge" style="background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.15); color: #c084fc; font-size: 0.7rem; padding: 4px 8px; border-radius: 6px; display: inline-block;">${rec}</span>`;
    });
  }

  // Programs
  const programsBox = document.getElementById('uni-modal-programs');
  programsBox.innerHTML = '';
  uni.programsOffered.forEach(prog => {
    programsBox.innerHTML += `<span class="badge" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); font-size: 0.7rem; color: var(--text-color); padding: 4px 8px; border-radius: 6px;">${prog}</span>`;
  });

  // Display
  document.getElementById('uni-requirements-modal').style.display = 'flex';
}

function closeUniRequirementsModal() {
  document.getElementById('uni-requirements-modal').style.display = 'none';
}

/* ==========================================================================
   AI API KEY MANAGEMENT & INTEGRATION
   ========================================================================== */

function saveGeminiKey() {
  const input = document.getElementById('gemini-key-input');
  if (!input) return;
  const key = input.value.trim();
  if (key) {
    localStorage.setItem('smartlearn_gemini_key', key);
    updateApiStatusBadge('gemini');
  } else {
    localStorage.removeItem('smartlearn_gemini_key');
    updateApiStatusBadge('keyless');
  }
}

function toggleKeyVisibility() {
  const input = document.getElementById('gemini-key-input');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

function loadGeminiKey() {
  const key = localStorage.getItem('smartlearn_gemini_key');
  const input = document.getElementById('gemini-key-input');
  if (input) {
    input.value = key || '';
  }
  if (key) {
    updateApiStatusBadge('gemini');
  } else {
    updateApiStatusBadge('keyless');
  }
}

function updateApiStatusBadge(status) {
  const badge = document.getElementById('api-status-badge');
  if (!badge) return;
  
  if (status === 'gemini') {
    badge.innerHTML = `<span style="width: 6px; height: 6px; border-radius: var(--radius-full); background: var(--success); display: inline-block;"></span> Active: Gemini 1.5`;
    badge.style.background = 'rgba(16,185,129,0.1)';
    badge.style.color = 'var(--success)';
  } else if (status === 'keyless') {
    badge.innerHTML = `<span style="width: 6px; height: 6px; border-radius: var(--radius-full); background: var(--primary); display: inline-block;"></span> Active: Keyless Model`;
    badge.style.background = 'rgba(37,99,235,0.1)';
    badge.style.color = 'var(--primary)';
  } else if (status === 'fallback') {
    badge.innerHTML = `<span style="width: 6px; height: 6px; border-radius: var(--radius-full); background: var(--warning); display: inline-block;"></span> Active: Offline Simulation`;
    badge.style.background = 'rgba(245,158,11,0.1)';
    badge.style.color = 'var(--warning)';
  }
}

/* ==========================================================================
   THEMING & UTILITIES
   ========================================================================== */

function toggleTheme() {
  const activeTheme = document.body.getAttribute('data-theme');
  if (activeTheme === 'dark') {
    document.body.removeAttribute('data-theme');
    appState.theme = 'light';
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = '🌙');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    appState.theme = 'dark';
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = '☀️');
  }
}

function showToastNotification(message) {
  const toast = document.createElement('div');
  toast.className = 'glass';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 16px 24px;
    border-left: 4px solid var(--success);
    color: var(--text-main);
    z-index: 1000;
    box-shadow: var(--glass-shadow);
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = '✅ ' + message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

async function fetchPublicUniversities() {
  // Render static fallback universities immediately
  renderLandingUniversities();
  
  try {
    const res = await fetch(`${API_BASE}/api/universities`);
    if (res.ok) {
      appState.universities = await res.json();
      renderLandingUniversities();
    }
  } catch (err) {
    console.error('Error fetching public universities:', err);
  }
}

function generateStarRatingHTML(rating) {
  let html = '<div class="star-rating" title="Rating: ' + rating.toFixed(1) + ' / 5">';
  for (let i = 0; i < 5; i++) {
    const fillPercentage = Math.min(Math.max((rating - i) * 100, 0), 100);
    html += `<span class="star-outer">★<span class="star-inner" style="width: ${fillPercentage.toFixed(0)}%">★</span></span>`;
  }
  html += ` <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: bold; margin-left: 4px;">(${rating.toFixed(1)})</span>`;
  html += '</div>';
  return html;
}

let landingUnisExpanded = false;

function renderLandingUniversities() {
  const container = document.getElementById('landing-uni-grid');
  if (!container) return;

  container.innerHTML = '';
  appState.universities.forEach((uni, idx) => {
    // Determine rating based on ranking/type for stability
    const ratingSeed = 5.0 - (uni.ranking * 0.01) - (uni.type === 'Private' ? 0.05 : 0);
    const mappedRecs = getMappedRecommendations(uni);
    const recsHtml = mappedRecs.map(rec => `<span class="badge" style="background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.15); color: #c084fc; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; display: inline-block;">${rec}</span>`).join(' ');

    // Hide cards past the top 4 initially
    const displayStyle = idx >= 4 && !landingUnisExpanded ? 'display: none;' : '';

    container.innerHTML += `
      <div class="uni-preview-card glass" onclick="openUniRequirementsModalByName('${uni.name}')" style="${displayStyle}">
        <div class="uni-img-wrapper" style="height: 160px; overflow: hidden; position: relative;">
          <img src="${uni.image}" alt="${uni.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='picture/ug_campus.jpg'">
          <span class="badge badge-primary" style="position: absolute; top: 12px; right: 12px; font-size: 0.65rem; padding: 4px 8px; border-radius: 6px; z-index: 2;">🏆 Rank #${uni.ranking}</span>
          <span class="badge" style="position: absolute; bottom: 12px; left: 12px; font-size: 0.65rem; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); color: var(--success); padding: 4px 8px; border-radius: 6px; z-index: 2;">${uni.type}</span>
        </div>
        <div class="uni-preview-details" style="padding: 20px; text-align: left; display: flex; flex-direction: column; gap: 8px;">
          <h4 style="font-size: 1.05rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-main);" title="${uni.name}">${uni.name}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uni.name + ' ' + uni.location)}" target="_blank" style="color: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;" onclick="event.stopPropagation();" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">
              📍 ${uni.location} 🗺️
            </a>
          </p>
          <div style="margin: 2px 0;">${generateStarRatingHTML(ratingSeed)}</div>
          
          <div style="font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;">
            <span style="color: var(--text-light); font-weight: bold;">💰 Admission Fee Estimate:</span> ${uni.feesRange}
          </div>
          
          <div style="font-size: 0.75rem; display: flex; flex-direction: column; gap: 4px;">
            <span style="color: var(--text-light); font-weight: bold;">🎯 AI Mapped Recommendations:</span>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 2px;">
              ${recsHtml}
            </div>
          </div>
          
          <div style="font-size: 0.75rem; display: flex; flex-direction: column; gap: 4px;">
            <span style="color: var(--text-light); font-weight: bold;">💬 Campus Review:</span>
            <div style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; font-style: italic; background: rgba(255,255,255,0.02); padding: 6px 10px; border-radius: 6px; border-left: 2px solid var(--primary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              "${uni.performanceReview}"
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

function toggleLandingUniversities() {
  landingUnisExpanded = !landingUnisExpanded;
  const btn = document.getElementById('toggle-unis-btn');
  const cards = document.querySelectorAll('#landing-uni-grid .uni-preview-card');

  cards.forEach((card, idx) => {
    if (idx >= 4) {
      if (landingUnisExpanded) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.5s ease';
      } else {
        card.style.display = 'none';
      }
    }
  });

  if (landingUnisExpanded) {
    btn.innerHTML = 'Show Less Universities ⬆️';
  } else {
    btn.innerHTML = 'Show More Universities ⬇️';
    const sectionHeader = document.getElementById('universities');
    if (sectionHeader) {
      sectionHeader.scrollIntoView({ behavior: 'smooth' });
    }
  }
}



function openUniRequirementsModalByName(uniName) {
  if (!appState.universities || appState.universities.length === 0) {
    fetchPublicUniversities().then(() => {
      const uni = appState.universities.find(u => u.name.toLowerCase().includes(uniName.toLowerCase()));
      if (uni) {
        openUniRequirementsModal(uni.id);
      } else {
        showToastNotification(`Guidelines for ${uniName} are still loading. Please try again.`);
      }
    });
    return;
  }
  
  const uni = appState.universities.find(u => u.name.toLowerCase().includes(uniName.toLowerCase()));
  if (uni) {
    openUniRequirementsModal(uni.id);
  } else {
    showToastNotification(`Guidelines for ${uniName} not found.`);
  }
}

function handleCheckCareerMatchClick() {
  closeUniRequirementsModal();
  if (!appState.user) {
    showToastNotification('Please sign in or register to access the Career Advisor Tool!');
    openAuthModal();
  } else {
    navigateTo('portal-shell');
    switchTab('student', 'student-career-guidance');
  }
}

// Initialise Application Function
function initApplication() {
  // Setup default theme
  document.body.setAttribute('data-theme', 'dark');
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = '☀️');
  
  // Fetch public universities list for landing page click details
  fetchPublicUniversities();
  
  // Load API Key configuration
  loadGeminiKey();
  
  // Set up AI Mode
  setAiMode('study');
  
  // Render
  renderStateData();
  
  // Setup default Career test slide
  resetCareerQuiz();
}

// Initialise application robustly based on document loading state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApplication);
} else {
  initApplication();
}

