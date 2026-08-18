import bcrypt from "bcrypt";
import { User } from "../modules/users/user.model";
import { Student } from "../modules/students/student.model";
import { Teacher } from "../modules/teachers/teachers.model";
import { Notice } from "../modules/notice/notice.model";
import { Gallery } from "../modules/gallery/gallery.model";
import { Result } from "../modules/results/results.model";
import { Review } from "../modules/reviews/reviews.model";
import { config } from "../config";

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      const studentCount = await Student.countDocuments();
      if (studentCount >= 10) {
        console.log("Database already has records. Skipping initial seeding.");
        return;
      }
    }

    console.log("Seeding database with School Management initial data...");

    const hashedPassword = await bcrypt.hash("admin123", Number(config.saltRound) || 10);
    const studentHashedPassword = await bcrypt.hash("student123", Number(config.saltRound) || 10);

    // 1. Admin & Demo Student User
    let adminUser = await User.findOne({ email: "admin@school.com" });
    if (!adminUser) {
      adminUser = await User.create({
        name: "Headmaster (Admin)",
        email: "admin@school.com",
        password: hashedPassword,
        role: "admin",
        status: "approved",
        isDeleted: false,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
      });
    }

    let demoStudentUser = await User.findOne({ email: "student@school.com" });
    if (!demoStudentUser) {
      demoStudentUser = await User.create({
        name: "Tanvir Ahmed",
        email: "student@school.com",
        password: studentHashedPassword,
        role: "student",
        status: "approved",
        isDeleted: false,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80",
      });
    }

    const teachersData = [
      {
        name: "Dr. Mohammad Rafiqul Islam",
        teacherId: "TCH-001",
        email: "rafiqul.principal@school.edu.bd",
        number: "01711223344",
        designation: "Headmaster",
        department: "Physics",
        education: "M.Sc, Ph.D (Physics, DU)",
        experience: "18 Years",
        subject: ["Physics", "General Science"],
        classes: ["Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
        joiningDate: "2010-01-15",
        bio: "Veteran educator with 18 years of experience and recipient of the National Education Award.",
        isDeleted: false,
      },
      {
        name: "Begum Shamsunnahar Sultana",
        teacherId: "TCH-002",
        email: "shamsunnahar@school.edu.bd",
        number: "01711334455",
        designation: "Assistant Headmaster",
        department: "Language & Literature",
        education: "M.A (Literature, JU)",
        experience: "15 Years",
        subject: ["Bangla 1st Paper", "Bangla 2nd Paper"],
        classes: ["Class 8", "Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        joiningDate: "2012-03-01",
        bio: "Dedicated and experienced instructor specializing in language skills, grammar, and literature.",
        isDeleted: false,
      },
      {
        name: "Muhammad Mizanur Rahman",
        teacherId: "TCH-003",
        email: "mizanur.math@school.edu.bd",
        number: "01811445566",
        designation: "Senior Teacher",
        department: "Mathematics",
        education: "M.Sc (Mathematics, RU)",
        experience: "12 Years",
        subject: ["General Mathematics", "Higher Mathematics"],
        classes: ["Class 8", "Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        joiningDate: "2015-05-10",
        bio: "Acclaimed for innovative, joyful, and concept-driven mathematics teaching methodologies.",
        isDeleted: false,
      },
      {
        name: "Farhana Afroz",
        teacherId: "TCH-004",
        email: "farhana.english@school.edu.bd",
        number: "01911556677",
        designation: "Senior Teacher",
        department: "English",
        education: "M.A (English Language & Literature, DU)",
        experience: "10 Years",
        subject: ["English 1st Paper", "English 2nd Paper"],
        classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
        joiningDate: "2016-08-01",
        bio: "Specialist in communicative English language skills, phonetics, and academic writing.",
        isDeleted: false,
      },
      {
        name: "Abdul Hannan Mazumder",
        teacherId: "TCH-005",
        email: "hannan.chem@school.edu.bd",
        number: "01611667788",
        designation: "Assistant Teacher",
        department: "Chemistry",
        education: "B.Sc (Hons), M.Sc (Chemistry)",
        experience: "8 Years",
        subject: ["Chemistry", "Science"],
        classes: ["Class 7", "Class 8", "Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        joiningDate: "2018-02-15",
        bio: "Pioneer in interactive laboratory experiments and practical science demonstrations.",
        isDeleted: false,
      },
      {
        name: "Nusrat Jahan Tania",
        teacherId: "TCH-006",
        email: "nusrat.biology@school.edu.bd",
        number: "01511778899",
        designation: "Assistant Teacher",
        department: "Biology",
        education: "M.Sc (Botany)",
        experience: "7 Years",
        subject: ["Biology", "Science"],
        classes: ["Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
        joiningDate: "2019-01-10",
        bio: "Excels in presenting complex biological systems through clear visual illustrations and models.",
        isDeleted: false,
      },
      {
        name: "Mahmudul Hasan Chowdhury",
        teacherId: "TCH-007",
        email: "mahmudul.commerce@school.edu.bd",
        number: "01711889900",
        designation: "Assistant Teacher",
        department: "Business Studies",
        education: "M.B.A (Accounting)",
        experience: "6 Years",
        subject: ["Accounting", "Business Entrepreneurship", "Finance & Banking"],
        classes: ["Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        joiningDate: "2020-03-01",
        bio: "Instructs modern bookkeeping principles, entrepreneurship, and financial management.",
        isDeleted: false,
      },
      {
        name: "Kazi Tanjila Akter",
        teacherId: "TCH-008",
        email: "tanjila.ict@school.edu.bd",
        number: "01811990011",
        designation: "ICT Teacher",
        department: "Information & Communication Technology",
        education: "B.Sc in Computer Science & Engineering",
        experience: "5 Years",
        subject: ["Information & Communication Technology"],
        classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        joiningDate: "2021-07-01",
        bio: "Inspires students with hands-on coding, computer lab skills, and digital literacy.",
        isDeleted: false,
      },
    ];

    await Teacher.deleteMany({});
    await Teacher.insertMany(teachersData);

    // 3. Students (Classes 6 to 10)
    const studentsSeed = [
      // Class 10
      {
        name: "Asif Iqbal",
        studentId: "STU-2025-1001",
        roll: 1,
        class: "Class 10",
        section: "A",
        group: "Science",
        contact: "01722334455",
        fatherName: "Iqbal Hossain",
        motherName: "Rokeya Begum",
        address: "Mirpur-10, Dhaka",
        dob: "2009-03-12",
        gender: "male",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Farzana Sultana Riya",
        studentId: "STU-2025-1002",
        roll: 2,
        class: "Class 10",
        section: "A",
        group: "Science",
        contact: "01722334456",
        fatherName: "Rafiqul Islam",
        motherName: "Sultana Razia",
        address: "Dhanmondi, Dhaka",
        dob: "2009-05-18",
        gender: "female",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Sakib Al Hasan",
        studentId: "STU-2025-1003",
        roll: 3,
        class: "Class 10",
        section: "A",
        group: "Science",
        contact: "01722334457",
        fatherName: "Khondokar Hasan",
        motherName: "Nazma Begum",
        address: "Uttara, Dhaka",
        dob: "2009-08-22",
        gender: "male",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Nusrat Jahan Setu",
        studentId: "STU-2025-1004",
        roll: 4,
        class: "Class 10",
        section: "B",
        group: "Business Studies",
        contact: "01822334458",
        fatherName: "Jahangir Alam",
        motherName: "Shirin Akter",
        address: "Motijheel, Dhaka",
        dob: "2009-01-15",
        gender: "female",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Mahmud Hasan Shuvo",
        studentId: "STU-2025-1005",
        roll: 5,
        class: "Class 10",
        section: "B",
        group: "Humanities",
        contact: "01922334459",
        fatherName: "Hasan Ali",
        motherName: "Fatema Khatun",
        address: "Jatrabari, Dhaka",
        dob: "2009-11-05",
        gender: "male",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
        isOnline: false,
      },
      // Class 9
      {
        name: "Tahsin Ahmed",
        studentId: "STU-2025-0901",
        roll: 1,
        class: "Class 9",
        section: "A",
        group: "Science",
        contact: "01733445566",
        fatherName: "Ahmed Kabir",
        motherName: "Nasima Akter",
        address: "Mohammadpur, Dhaka",
        dob: "2010-04-10",
        gender: "male",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Samia Akter Iti",
        studentId: "STU-2025-0902",
        roll: 2,
        class: "Class 9",
        section: "A",
        group: "Science",
        contact: "01733445567",
        fatherName: "Moniruzzaman",
        motherName: "Parvin Akter",
        address: "Banasree, Dhaka",
        dob: "2010-06-25",
        gender: "female",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Zahidul Islam",
        studentId: "STU-2025-0903",
        roll: 3,
        class: "Class 9",
        section: "B",
        group: "Business Studies",
        contact: "01833445568",
        fatherName: "Nurul Islam",
        motherName: "Shaheda Begum",
        address: "Khilgaon, Dhaka",
        dob: "2010-09-14",
        gender: "male",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
        isOnline: false,
      },
      {
        name: "Meherunnesa Maria",
        studentId: "STU-2025-0904",
        roll: 4,
        class: "Class 9",
        section: "B",
        group: "Humanities",
        contact: "01933445569",
        fatherName: "Anwar Hossain",
        motherName: "Momtaz Begum",
        address: "Lalbagh, Dhaka",
        dob: "2010-02-28",
        gender: "female",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
        isOnline: true,
      },
      // Class 8
      {
        name: "Saymon Islam Shanto",
        studentId: "STU-2025-0801",
        roll: 1,
        class: "Class 8",
        section: "A",
        group: "",
        contact: "01744556677",
        fatherName: "Shafiqul Islam",
        motherName: "Salma Chowdhury",
        address: "Gulshan-1, Dhaka",
        dob: "2011-07-19",
        gender: "male",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Jannatul Ferdous Prapti",
        studentId: "STU-2025-0802",
        roll: 2,
        class: "Class 8",
        section: "A",
        group: "",
        contact: "01744556678",
        fatherName: "Faruk Ahmed",
        motherName: "Amena Khatun",
        address: "Badda, Dhaka",
        dob: "2011-10-12",
        gender: "female",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Ariyan Chowdhury",
        studentId: "STU-2025-0803",
        roll: 3,
        class: "Class 8",
        section: "B",
        group: "",
        contact: "01844556679",
        fatherName: "Motiur Rahman Chowdhury",
        motherName: "Taslima Nasrin",
        address: "Moghbazar, Dhaka",
        dob: "2011-03-03",
        gender: "male",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80",
        isOnline: false,
      },
      // Class 7
      {
        name: "Maruf Hasan",
        studentId: "STU-2025-0701",
        roll: 1,
        class: "Class 7",
        section: "A",
        group: "",
        contact: "01755667788",
        fatherName: "Anwarul Kabir",
        motherName: "Rowshan Ara",
        address: "Basabo, Dhaka",
        dob: "2012-08-15",
        gender: "male",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Sadia Nawshin Orpa",
        studentId: "STU-2025-0702",
        roll: 2,
        class: "Class 7",
        section: "A",
        group: "",
        contact: "01755667789",
        fatherName: "Nurul Haque",
        motherName: "Sahida Haque",
        address: "Shantinagar, Dhaka",
        dob: "2012-12-01",
        gender: "female",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Rakibul Hasan",
        studentId: "STU-2025-0703",
        roll: 3,
        class: "Class 7",
        section: "B",
        group: "",
        contact: "01855667790",
        fatherName: "Kamal Uddin",
        motherName: "Hosne Ara",
        address: "Tongi, Gazipur",
        dob: "2012-05-20",
        gender: "male",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80",
        isOnline: false,
      },
      // Class 6
      {
        name: "Redwanul Karim",
        studentId: "STU-2025-0601",
        roll: 1,
        class: "Class 6",
        section: "A",
        group: "",
        contact: "01766778899",
        fatherName: "Rezaul Karim",
        motherName: "Shamima Nasrin",
        address: "Uttara Sector-4, Dhaka",
        dob: "2013-02-11",
        gender: "male",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Afifa Tanjim Meghla",
        studentId: "STU-2025-0602",
        roll: 2,
        class: "Class 6",
        section: "A",
        group: "",
        contact: "01766778800",
        fatherName: "Tajul Islam",
        motherName: "Afroza Begum",
        address: "Mirpur-2, Dhaka",
        dob: "2013-09-09",
        gender: "female",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80",
        isOnline: true,
      },
      {
        name: "Nafis Fuad",
        studentId: "STU-2025-0603",
        roll: 3,
        class: "Class 6",
        section: "B",
        group: "",
        contact: "01866778811",
        fatherName: "Fuad Chowdhury",
        motherName: "Nasrin Sultana",
        address: "Farmgate, Dhaka",
        dob: "2013-11-23",
        gender: "male",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
        isOnline: false,
      },
    ];

    await Student.deleteMany({});
    await Student.insertMany(studentsSeed);

    // 4. Notices with PDF links
    const noticesData = [
      {
        heading: "Annual Examination 2026 Routine and Guidelines Notice",
        body: "All students are hereby notified that the Annual Examination will commence from November 15, 2026. The detailed schedule and exam instructions are available in the attached PDF file. Students are advised to collect admit cards and attend on time.",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-08-15",
        isPinned: true,
        isDeleted: false,
      },
      {
        heading: "Admission Open for Classes 6 to 10 - Online Applications",
        body: "Admissions for the 2026 academic session are now open for limited seats in Science, Humanities, and Business Studies groups. Interested parents and students are requested to complete the application form via the school website or office.",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-08-10",
        isPinned: true,
        isDeleted: false,
      },
      {
        heading: "Inter-School Science Fair and Innovation Project Competition 2026",
        body: "The Science Club is organizing an Annual Science Exhibition and Debate Competition on September 25. Students from Classes 6 to 10 are invited to submit their project outlines to their respective science teachers.",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-08-05",
        isPinned: false,
        isDeleted: false,
      },
      {
        heading: "Summer Vacation Schedule and Special Online Practice Modules",
        body: "Regular classes will remain suspended for summer vacation from May 20 to June 5. Students will receive weekly practice assignments through the portal to maintain continuous learning progress.",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-07-20",
        isPinned: false,
        isDeleted: false,
      },
      {
        heading: "Annual Sports and Cultural Competition 2026 Award Ceremony",
        body: "The prize distribution ceremony for the Annual Sports and Cultural Meet will be held on August 28. All students and respected parents are cordially invited to celebrate our winners' achievements.",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-07-15",
        isPinned: false,
        isDeleted: false,
      },
    ];

    await Notice.deleteMany({});
    await Notice.insertMany(noticesData);

    // 5. Gallery Photos
    const galleryData = [
      {
        title: "Hands-on Experiments in Modern Science Lab",
        caption: "Students conducting scientific experiments and lab work in physics and chemistry labs.",
        category: "Science Fair",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "School Green Campus and Playground",
        caption: "A vibrant, serene, and modern campus setting fostering learning and wellness.",
        category: "Campus",
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "Annual Athletic Meet and Sprint Events",
        caption: "Highlights of students participating in sports tournaments, fostering teamwork and vitality.",
        category: "Sports",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "High-Tech Digital Computer Lab & ICT Training",
        caption: "State-of-the-art computer systems for coding, digital skills, and multimedia learning.",
        category: "Campus",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "Cultural Festival & Musical Performances",
        caption: "Students showcasing artistic talents in music, drama, and cultural celebrations.",
        category: "Cultural",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "Academic Excellence & Merit Award Ceremony",
        caption: "Honoring top achievers and outstanding performers with medals and certificates.",
        category: "Prize Giving",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "Central Library & Knowledge Hub",
        caption: "Well-equipped library with extensive reference books, periodicals, and digital resources.",
        category: "Campus",
        imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "Innovators at the National Science & Tech Fair",
        caption: "Young innovators presenting robotics, clean energy, and sustainability projects.",
        category: "Science Fair",
        imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80",
        isDeleted: false,
      },
    ];

    await Gallery.deleteMany({});
    await Gallery.insertMany(galleryData);

    // 6. Results for Classes 6 to 10 (Final Examination Top 10 Data)
    const resultsData: any[] = [];
    const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];

    const sampleNamesByClass: Record<string, string[]> = {
      "Class 10": [
        "Asif Iqbal", "Farzana Sultana Riya", "Sakib Al Hasan", "Nusrat Jahan Setu",
        "Mahmud Hasan Shuvo", "Tarek Zaman", "Anika Tasnim", "Rakib Uddin",
        "Sabrina Ahmed", "Zubayer Hossain"
      ],
      "Class 9": [
        "Tahsin Ahmed", "Samia Akter Iti", "Zahidul Islam", "Meherunnesa Maria",
        "Tanvir Rahman", "Maria Jannat", "Shahriar Nafis", "Rumana Akter",
        "Fahim Faisal", "Tasfia Haque"
      ],
      "Class 8": [
        "Saymon Islam Shanto", "Jannatul Ferdous Prapti", "Ariyan Chowdhury", "Nishat Tasnim",
        "Tahmid Hasan", "Lamia Akter", "Rifat Bin Alam", "Mushfiqur Rahim",
        "Sumaiya Jahan", "Imran Hossain"
      ],
      "Class 7": [
        "Maruf Hasan", "Sadia Nawshin Orpa", "Rakibul Hasan", "Maisha Tabassum",
        "Sourav Sarker", "Tanisha Rahman", "Muhtasim Billah", "Muntaha Chowdhury",
        "Adnan Habib", "Nafisa Anjum"
      ],
      "Class 6": [
        "Redwanul Karim", "Afifa Tanjim Meghla", "Nafis Fuad", "Zarin Tasnim",
        "Tasin Ahmed", "Mehzabin Alam", "Tanvir Shikder", "Nusrat Islam",
        "Shadman Sakib", "Fariha Afroz"
      ],
    };

    const avatarUrls = [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    ];

    classes.forEach((cls) => {
      const names = sampleNamesByClass[cls];
      const baseMark = cls === "Class 10" ? 885 : cls === "Class 9" ? 875 : cls === "Class 8" ? 865 : cls === "Class 7" ? 855 : 850;

      names.forEach((name, idx) => {
        const totalMarks = baseMark - idx * 12;
        const gpa = idx < 5 ? 5.0 : idx < 8 ? 4.85 : 4.65;
        const grade = idx < 8 ? "A+" : "A";
        const roll = idx + 1;
        const group = (cls === "Class 9" || cls === "Class 10") ? (idx % 3 === 0 ? "Science" : idx % 3 === 1 ? "Business Studies" : "Humanities") : "";

        resultsData.push({
          studentName: name,
          studentId: `STU-2025-${cls.replace("Class ", "")}${roll.toString().padStart(3, "0")}`,
          studentRoll: roll,
          studentImage: avatarUrls[idx % avatarUrls.length],
          class: cls,
          section: idx % 2 === 0 ? "A" : "B",
          group: group,
          examType: "Final Examination",
          examYear: "2025",
          subjectMarks: [
            { subject: "Bangla", marks: Math.min(98, 85 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "English", marks: Math.min(95, 82 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "General Mathematics", marks: Math.min(100, 88 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "Science / Physics", marks: Math.min(96, 84 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "Information & Communication Technology", marks: Math.min(50, 45 + (idx < 5 ? 3 : 1)), grade: "A+", gpa: 5.0 },
          ],
          totalMarks: totalMarks,
          gpa: gpa,
          grade: grade,
          position: idx + 1,
          isFinalExam: true,
          isTop10Eligible: true,
          isDeleted: false,
        });
      });
    });

    await Result.deleteMany({});
    await Result.insertMany(resultsData);

    // 7. Reviews / Testimonials
    const reviewsData = [
      {
        name: "Dr. Mozammel Haque",
        designation: "Guardian (Class 10)",
        title: "Commendable Academic Standards & Discipline",
        comment: "Ever since enrolling here, my child has shown remarkable improvement both academically and in co-curricular activities. The dedicated care of the teachers and modern lab facilities are truly world-class.",
        rating: 5,
        status: "approved",
      },
      {
        name: "Sultana Kamal",
        designation: "Guardian (Class 8)",
        title: "Safe Environment & Value-based Education",
        comment: "I am extremely pleased with the serene campus, round-the-clock CCTV surveillance, and strict discipline. The digital attendance and instant notifications keep us informed and reassured.",
        rating: 5,
        status: "approved",
      },
      {
        name: "Engr. Mahmudul Hasan",
        designation: "Alumni (SSC Batch 2019)",
        title: "The Strongest Foundation of My Career",
        comment: "The rigorous science foundation and guidance I received here enabled me to excel in my higher studies at university. I wish this institution continued success and greatness.",
        rating: 5,
        status: "approved",
      },
      {
        name: "Nasreen Jahan",
        designation: "Guardian (Class 6)",
        title: "Outstanding Care for Young Learners",
        comment: "My daughter joined Class 6 this session. The teachers explain every concept so warmly and intuitively that she looks forward to going to school every single day.",
        rating: 5,
        status: "approved",
      },
    ];

    await Review.deleteMany({});
    await Review.insertMany(reviewsData);

    console.log("✅ School Management database seeded successfully in English!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
