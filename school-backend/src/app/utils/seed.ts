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

    console.log("Seeding database with Bangladeshi School initial data...");

    const hashedPassword = await bcrypt.hash("admin123", Number(config.saltRound) || 10);
    const studentHashedPassword = await bcrypt.hash("student123", Number(config.saltRound) || 10);

    // 1. Admin & Demo Student User
    let adminUser = await User.findOne({ email: "admin@school.com" });
    if (!adminUser) {
      adminUser = await User.create({
        name: "প্রধান শিক্ষক (অ্যাডমিন)",
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
        name: "তানভীর আহমেদ",
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
        name: "ড. মোহাম্মাদ রফিকুল ইসলাম",
        teacherId: "TCH-001",
        email: "rafiqul.principal@school.edu.bd",
        number: "01711223344",
        designation: "প্রধান শিক্ষক",
        department: "পদার্থবিজ্ঞান",
        education: "এম.এসসি, পিএইচডি (পদার্থবিজ্ঞান, ঢাবি)",
        experience: "১৮ বছর",
        subject: ["পদার্থবিজ্ঞান", "সাধারণ বিজ্ঞান"],
        classes: ["Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
        joiningDate: "2010-01-15",
        bio: "শিক্ষা ক্ষেত্রে দীর্ঘ ১৮ বছরের অভিজ্ঞতা সম্পন্ন এবং জাতীয় শিক্ষা পদকপ্রাপ্ত শিক্ষক।",
        isDeleted: false,
      },
      {
        name: "বেগম শামসুন্নাহার সুলতানা",
        teacherId: "TCH-002",
        email: "shamsunnahar@school.edu.bd",
        number: "01711334455",
        designation: "সহকারী প্রধান শিক্ষক",
        department: "বাংলা",
        education: "এম.এ (বাংলা সাহিত্য, জাবি)",
        experience: "১৫ বছর",
        subject: ["বাংলা ১ম পত্র", "বাংলা ২য় পত্র"],
        classes: ["Class 8", "Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        joiningDate: "2012-03-01",
        bio: "বাংলা ব্যাকরণ ও সাহিত্য পাঠদানে অত্যন্ত নিবেদিতপ্রাণ ও অভিজ্ঞ শিক্ষিকা।",
        isDeleted: false,
      },
      {
        name: "মুহাম্মদ মিজানুর রহমান",
        teacherId: "TCH-003",
        email: "mizanur.math@school.edu.bd",
        number: "01811445566",
        designation: "সিনিয়র শিক্ষক",
        department: "গণিত",
        education: "এম.এসসি (গণিত, রাবি)",
        experience: "১২ বছর",
        subject: ["সাধারণ গণিত", "উচ্চতর গণিত"],
        classes: ["Class 8", "Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        joiningDate: "2015-05-10",
        bio: "সহজ ও আনন্দদায়ক পদ্ধতিতে গণিত শিক্ষাদানে বিশেষভাবে প্রশংসিত।",
        isDeleted: false,
      },
      {
        name: "ফারহানা আফরোজ",
        teacherId: "TCH-004",
        email: "farhana.english@school.edu.bd",
        number: "01911556677",
        designation: "সিনিয়র শিক্ষক",
        department: "ইংরেজি",
        education: "এম.এ (ইংরেজি ভাষা ও সাহিত্য, ঢাবি)",
        experience: "১০ বছর",
        subject: ["English 1st Paper", "English 2nd Paper"],
        classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
        joiningDate: "2016-08-01",
        bio: "কমিউনিকেটিভ ইংলিশ ও গ্রামারে শিক্ষার্থীদের দক্ষতা বাড়াতে বিশেষজ্ঞ।",
        isDeleted: false,
      },
      {
        name: "আব্দুল হান্নান মজুমদার",
        teacherId: "TCH-005",
        email: "hannan.chem@school.edu.bd",
        number: "01611667788",
        designation: "সহকারী শিক্ষক",
        department: "রসায়ন",
        education: "বি.এসসি (অনার্স), এম.এসসি (রসায়ন)",
        experience: "৮ বছর",
        subject: ["রসায়ন", "বিজ্ঞান"],
        classes: ["Class 7", "Class 8", "Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        joiningDate: "2018-02-15",
        bio: "ব্যবহারিক ল্যাব কার্যক্রম ও আকর্ষণীয় প্র্যাকটিক্যাল ক্লাসে অগ্রগামী।",
        isDeleted: false,
      },
      {
        name: "নুসরাত জাহান তানিয়া",
        teacherId: "TCH-006",
        email: "nusrat.biology@school.edu.bd",
        number: "01511778899",
        designation: "সহকারী শিক্ষক",
        department: "জীববিজ্ঞান",
        education: "এম.এসসি (উদ্ভিদবিজ্ঞান)",
        experience: "৭ বছর",
        subject: ["জীববিজ্ঞান", "বিজ্ঞান"],
        classes: ["Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
        joiningDate: "2019-01-10",
        bio: "চিত্রাঙ্কন এবং চার্টের মাধ্যমে সহজভাবে বায়োলজির বিষয়বস্তু উপস্থাপন করেন।",
        isDeleted: false,
      },
      {
        name: "মাহমুদুল হাসান চৌধুরী",
        teacherId: "TCH-007",
        email: "mahmudul.commerce@school.edu.bd",
        number: "01711889900",
        designation: "সহকারী শিক্ষক",
        department: "ব্যবসায় শিক্ষা",
        education: "এম.বি.এ (হিসাববিজ্ঞান)",
        experience: "৬ বছর",
        subject: ["হিসাববিজ্ঞান", "ব্যবসায় উদ্যোগ", "ফিন্যান্স ও ব্যাংকিং"],
        classes: ["Class 9", "Class 10"],
        gender: "male",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        joiningDate: "2020-03-01",
        bio: "ব্যবসায় শিক্ষার আধুনিক হিসাবরক্ষণ ও আর্থিক বিষয়াবলী পাঠদান করেন।",
        isDeleted: false,
      },
      {
        name: "কাজী তানজিলা আক্তার",
        teacherId: "TCH-008",
        email: "tanjila.ict@school.edu.bd",
        number: "01811990011",
        designation: "আইসিটি শিক্ষক",
        department: "তথ্য ও যোগাযোগ প্রযুক্তি",
        education: "বি.এসসি ইন সিএসই",
        experience: "৫ বছর",
        subject: ["তথ্য ও যোগাযোগ প্রযুক্তি"],
        classes: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"],
        gender: "female",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
        joiningDate: "2021-07-01",
        bio: "কম্পিউটার ল্যাব এবং প্রোগ্রামিং শিক্ষায় শিক্ষার্থীদের অনুপ্রাণিত করেন।",
        isDeleted: false,
      },
    ];

    await Teacher.deleteMany({});
    await Teacher.insertMany(teachersData);

    // 3. Students (Classes 6 to 10)
    const studentsSeed = [
      // Class 10
      {
        name: "আসিফ ইকবাল",
        studentId: "STU-2025-1001",
        roll: 1,
        class: "Class 10",
        section: "A",
        group: "Science",
        contact: "01722334455",
        fatherName: "ইকবাল হোসেন",
        motherName: "রোকেয়া বেগম",
        address: "মিরপুর-১০, ঢাকা",
        dob: "2009-03-12",
        gender: "male",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80",
        isOnline: true,
      },
      {
        name: "ফারজানা সুলতানা রিয়া",
        studentId: "STU-2025-1002",
        roll: 2,
        class: "Class 10",
        section: "A",
        group: "Science",
        contact: "01722334456",
        fatherName: "রফিকুল ইসলাম",
        motherName: "সুলতানা রাজিয়া",
        address: "ধানমন্ডি, ঢাকা",
        dob: "2009-05-18",
        gender: "female",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
        isOnline: true,
      },
      {
        name: "সাকিব আল হাসান",
        studentId: "STU-2025-1003",
        roll: 3,
        class: "Class 10",
        section: "A",
        group: "Science",
        contact: "01722334457",
        fatherName: "খন্দকার হাসান",
        motherName: "নাজমা বেগম",
        address: "উত্তরা, ঢাকা",
        dob: "2009-08-22",
        gender: "male",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
        isOnline: true,
      },
      {
        name: "নুসরাত জাহান সেতু",
        studentId: "STU-2025-1004",
        roll: 4,
        class: "Class 10",
        section: "B",
        group: "Business Studies",
        contact: "01822334458",
        fatherName: "জাহাঙ্গীর আলম",
        motherName: "শিরিন আক্তার",
        address: "মতিঝিল, ঢাকা",
        dob: "2009-01-15",
        gender: "female",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80",
        isOnline: true,
      },
      {
        name: "মাহমুদ হাসান শুভ",
        studentId: "STU-2025-1005",
        roll: 5,
        class: "Class 10",
        section: "B",
        group: "Humanities",
        contact: "01922334459",
        fatherName: "হাসান আলী",
        motherName: "ফাতেমা খাতুন",
        address: "যাত্রাবাড়ী, ঢাকা",
        dob: "2009-11-05",
        gender: "male",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
        isOnline: false,
      },
      // Class 9
      {
        name: "তাহসিন আহমেদ",
        studentId: "STU-2025-0901",
        roll: 1,
        class: "Class 9",
        section: "A",
        group: "Science",
        contact: "01733445566",
        fatherName: "আহমেদ কবির",
        motherName: "নাছিমা আক্তার",
        address: "মোহাম্মদপুর, ঢাকা",
        dob: "2010-04-10",
        gender: "male",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80",
        isOnline: true,
      },
      {
        name: "সামিয়া আক্তার ইতি",
        studentId: "STU-2025-0902",
        roll: 2,
        class: "Class 9",
        section: "A",
        group: "Science",
        contact: "01733445567",
        fatherName: "মনিরুজ্জামান",
        motherName: "পারভীন আক্তার",
        address: "বনশ্রী, ঢাকা",
        dob: "2010-06-25",
        gender: "female",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
        isOnline: true,
      },
      {
        name: "জাহিদুল ইসলাম",
        studentId: "STU-2025-0903",
        roll: 3,
        class: "Class 9",
        section: "B",
        group: "Business Studies",
        contact: "01833445568",
        fatherName: "নুরুল ইসলাম",
        motherName: "শাহেদা বেগম",
        address: "খিলগাঁও, ঢাকা",
        dob: "2010-09-14",
        gender: "male",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
        isOnline: false,
      },
      {
        name: "মেহেরুন্নেসা মারিয়া",
        studentId: "STU-2025-0904",
        roll: 4,
        class: "Class 9",
        section: "B",
        group: "Humanities",
        contact: "01933445569",
        fatherName: "আনোয়ার হোসেন",
        motherName: "মমতাজ বেগম",
        address: "লালবাগ, ঢাকা",
        dob: "2010-02-28",
        gender: "female",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
        isOnline: true,
      },
      // Class 8
      {
        name: "সায়মন ইসলাম শান্ত",
        studentId: "STU-2025-0801",
        roll: 1,
        class: "Class 8",
        section: "A",
        group: "",
        contact: "01744556677",
        fatherName: "শফিকুল ইসলাম",
        motherName: "সালমা চৌধুরী",
        address: "গুলশান-১, ঢাকা",
        dob: "2011-07-19",
        gender: "male",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        isOnline: true,
      },
      {
        name: "জান্নাতুল ফেরদৌস প্রাপ্তি",
        studentId: "STU-2025-0802",
        roll: 2,
        class: "Class 8",
        section: "A",
        group: "",
        contact: "01744556678",
        fatherName: "ফারুক আহমেদ",
        motherName: "আমেনা খাতুন",
        address: "বাড্ডা, ঢাকা",
        dob: "2011-10-12",
        gender: "female",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
        isOnline: true,
      },
      {
        name: "আরিয়ান চৌধুরী",
        studentId: "STU-2025-0803",
        roll: 3,
        class: "Class 8",
        section: "B",
        group: "",
        contact: "01844556679",
        fatherName: "মতিউর রহমান চৌধুরী",
        motherName: "তাসলিমা নাসরিন",
        address: "মগবাজার, ঢাকা",
        dob: "2011-03-03",
        gender: "male",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80",
        isOnline: false,
      },
      // Class 7
      {
        name: "মারুফ হাসান",
        studentId: "STU-2025-0701",
        roll: 1,
        class: "Class 7",
        section: "A",
        group: "",
        contact: "01755667788",
        fatherName: "আনোয়ারুল কবির",
        motherName: "রওশন আরা",
        address: "বাসাবো, ঢাকা",
        dob: "2012-08-15",
        gender: "male",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80",
        isOnline: true,
      },
      {
        name: "সাদিয়া নওশীন অর্পা",
        studentId: "STU-2025-0702",
        roll: 2,
        class: "Class 7",
        section: "A",
        group: "",
        contact: "01755667789",
        fatherName: "নুরুল হক",
        motherName: "সাহিদা হক",
        address: "শান্তিনগর, ঢাকা",
        dob: "2012-12-01",
        gender: "female",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
        isOnline: true,
      },
      {
        name: "রাকিবুল হাসান",
        studentId: "STU-2025-0703",
        roll: 3,
        class: "Class 7",
        section: "B",
        group: "",
        contact: "01855667790",
        fatherName: "কামাল উদ্দিন",
        motherName: "হোসনে আরা",
        address: "টঙ্গী, গাজীপুর",
        dob: "2012-05-20",
        gender: "male",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&q=80",
        isOnline: false,
      },
      // Class 6
      {
        name: "রেদওয়ানুল করিম",
        studentId: "STU-2025-0601",
        roll: 1,
        class: "Class 6",
        section: "A",
        group: "",
        contact: "01766778899",
        fatherName: "রেজাউল করিম",
        motherName: "শামীমা নাসরিন",
        address: "উত্তরা সেক্টর-৪, ঢাকা",
        dob: "2013-02-11",
        gender: "male",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
        isOnline: true,
      },
      {
        name: "আফিফা তানজিম মেঘলা",
        studentId: "STU-2025-0602",
        roll: 2,
        class: "Class 6",
        section: "A",
        group: "",
        contact: "01766778800",
        fatherName: "তাজুল ইসলাম",
        motherName: "আফরোজা বেগম",
        address: "মিরপুর-২, ঢাকা",
        dob: "2013-09-09",
        gender: "female",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=80",
        isOnline: true,
      },
      {
        name: "নাফিস ফুয়াদ",
        studentId: "STU-2025-0603",
        roll: 3,
        class: "Class 6",
        section: "B",
        group: "",
        contact: "01866778811",
        fatherName: "ফুয়াদ চৌধুরী",
        motherName: "নাসরিন সুলতানা",
        address: "ফার্মগেট, ঢাকা",
        dob: "2013-11-23",
        gender: "male",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80",
        isOnline: false,
      },
    ];

    await Student.deleteMany({});
    const createdStudents = await Student.insertMany(studentsSeed);

    // 4. Notices with PDF links
    const noticesData = [
      {
        heading: "বার্ষিক পরীক্ষা ২০২৬ এর রুটিন ও নির্দেশনাবলী সংক্রান্ত বিজ্ঞপ্তি",
        body: "সকল শ্রেণির শিক্ষার্থীদের অবগতির জন্য জানানো যাচ্ছে যে, আগামী ১৫ নভেম্বর ২০২৬ তারিখ থেকে বার্ষিক পরীক্ষা শুরু হবে। বিস্তারিত সময়সূচী ও পরীক্ষার যাবতীয় নির্দেশনাবলী সংযুক্ত পিডিএফ ফাইলে দেওয়া হলো। সকল শিক্ষার্থীকে প্রবেশপত্র সংগ্রহ করে নির্ধারিত সময়ে পরীক্ষায় উপস্থিত থাকার অনুরোধ করা হলো।",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-08-15",
        isPinned: true,
        isDeleted: false,
      },
      {
        heading: "৬ষ্ঠ থেকে ১০ম শ্রেণিতে নতুন ভর্তি বিজ্ঞপ্তি ও অনলাইন আবেদন",
        body: "২০২৬ শিক্ষাবর্ষে ৬ষ্ঠ, ৭ম, ৮ম, ৯ম ও ১০ম শ্রেণির বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখায় সীমিত আসনে ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী অভিভাবক ও শিক্ষার্থীদের নির্ধারিত সময়ের মধ্যে বিদ্যালয় অফিস অথবা ওয়েবসাইটের মাধ্যমে আবেদনপত্র পূরণ করার অনুরোধ করা যাচ্ছে।",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-08-10",
        isPinned: true,
        isDeleted: false,
      },
      {
        heading: "আন্তঃস্কুল বিজ্ঞান মেলা ও উদ্ভাবনী প্রজেক্ট প্রতিযোগিতা ২০২৬",
        body: "আগামী ২৫ সেপ্টেম্বর আমাদের বিদ্যালয়ের বিজ্ঞান ক্লাব কর্তৃক আয়োজিত হতে যাচ্ছে বিজ্ঞান মেলা ও বিতর্ক প্রতিযোগিতা। বিজ্ঞান বিভাগের ৬ষ্ঠ থেকে ১০ম শ্রেণির আগ্রহী শিক্ষার্থীদের তাদের প্রজেক্টের নাম ও দলগত তথ্য সংশ্লিষ্ট বিষয় শিক্ষকের কাছে জমা দিতে বলা হচ্ছে।",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-08-05",
        isPinned: false,
        isDeleted: false,
      },
      {
        heading: "গ্রীষ্মকালীন ছুটি ও বিশেষ অনলাইন ক্লাসের সময়সূচী",
        body: "গ্রীষ্মকালীন ছুটি উপলক্ষে আগামী ২০ মে থেকে ৫ জুন পর্যন্ত বিদ্যালয়ের নিয়মিত ক্লাস বন্ধ থাকবে। তবে শিক্ষার্থীদের পড়াশোনার ধারাবাহিকতা বজায় রাখতে নিয়মিত সাপ্তাহিক অ্যাসাইনমেন্ট প্রদান করা হবে।",
        pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        publishDate: "2026-07-20",
        isPinned: false,
        isDeleted: false,
      },
      {
        heading: "বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতা ২০২৬ এর পুরস্কার বিতরণী",
        body: "বার্ষিক ক্রীড়া ও সাংস্কৃতিক প্রতিযোগিতায় বিজয়ীদের মাঝে প্রধান অতিথি হিসেবে জেলা শিক্ষা কর্মকর্তা মহোদয়ের উপস্থিতিতে আগামী ২৮ আগস্ট পুরস্কার বিতরণ করা হবে। সকল অভিভাবক ও শিক্ষার্থীকে অনুষ্ঠানে সাদর আমন্ত্রণ।",
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
        title: "আধুনিক বিজ্ঞান গবেষণাগারে ব্যবহারিক ক্লাস",
        caption: "শিক্ষার্থীরা পদার্থ ও রসায়ন ল্যাবে হাতে-কলমে বৈজ্ঞানিক পরীক্ষণ সম্পন্ন করছে।",
        category: "বিজ্ঞান মেলা",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "বিদ্যালয়ের কেন্দ্রীয় মনোরম সবুজ ক্যাম্পাস ও খেলার মাঠ",
        caption: "মনোরম ও কোলাহলমুক্ত পরিবেশে অবস্থিত আমাদের বিদ্যালয়ের প্রধান ভবন ও প্রাঙ্গণ।",
        category: "ক্যাম্পাস",
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "বার্ষিক ক্রীড়া প্রতিযোগিতা ও দৌড় ইভেন্ট",
        caption: "শিক্ষার্থীদের শারীরিক ও মানসিক বিকাশে বার্ষিক ক্রীড়া উৎসবের আনন্দঘন মুহূর্ত।",
        category: "ক্রীড়া",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "ডিজিটাল কম্পিউটার ল্যাব ও আইসিটি প্রশিক্ষণ",
        caption: "উচ্চগতির ইন্টারনেট ও আধুনিক কম্পিউটার সমৃদ্ধ ল্যাবে কোডিং ও প্রযুক্তি শিক্ষা।",
        category: "ক্যাম্পাস",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "সাংস্কৃতিক অনুষ্ঠান ও রবীন্দ্র-নজরুল জন্মজয়ন্তী",
        caption: "জাতীয় দিবসে ও সাংস্কৃতিক উৎসবে শিক্ষার্থীদের নৃত্য, গান ও আবৃত্তি পরিবেশনা।",
        category: "সাংস্কৃতিক",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "মেধা ও কৃতিত্বপূর্ণ ফলাফলের জন্য পুরস্কার বিতরণী",
        caption: "বার্ষিক পরীক্ষায় শীর্ষস্থান অর্জনকারী কৃতী শিক্ষার্থীদের মেডেল ও সনদ প্রদান।",
        category: "পুরস্কার বিতরণী",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "সমৃদ্ধ কেন্দ্রীয় লাইব্রেরি ও পাঠাগার",
        caption: "সহস্রাধিক দেশি-বিদেশি বই, এনসাইক্লোপিডিয়া ও জার্নাল সমৃদ্ধ আধুনিক লাইব্রেরি।",
        category: "ক্যাম্পাস",
        imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
        isDeleted: false,
      },
      {
        title: "জাতীয় বিজ্ঞান মেলায় ক্ষুদে বিজ্ঞানীদের প্রজেক্ট প্রদর্শনী",
        caption: "রোবোটিক্স, পরিবেশ সংরক্ষণ ও সৌরশক্তি প্রযুক্তির উদ্ভাবনী প্রজেক্ট উপস্থাপন।",
        category: "বিজ্ঞান মেলা",
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
        "আসিফ ইকবাল", "ফারজানা সুলতানা রিয়া", "সাকিব আল হাসান", "নুসরাত জাহান সেতু",
        "মাহমুদ হাসান শুভ", "তারেক জামান", "আনিকা তাসনিম", "রাকিব উদ্দিন",
        "সাবরিনা আহমেদ", "জুবায়ের হোসেন"
      ],
      "Class 9": [
        "তাহসিন আহমেদ", "সামিয়া আক্তার ইতি", "জাহিদুল ইসলাম", "মেহেরুন্নেসা মারিয়া",
        "তানভীর রহমান", "মারিয়া জান্নাত", "শাহরিয়ার নাফিস", "রুমানা আক্তার",
        "ফাহিম ফয়সাল", "তাসফিয়া হক"
      ],
      "Class 8": [
        "সায়মন ইসলাম শান্ত", "জান্নাতুল ফেরদৌস প্রাপ্তি", "আরিয়ান চৌধুরী", "নিশাত তাসনিম",
        "তাহমিদ হাসান", "লামিয়া আক্তার", "রিফাত বিন আলম", "মুশফিকুর রহিম",
        "সুমাইয়া জাহান", "ইমরান হোসেন"
      ],
      "Class 7": [
        "মারুফ হাসান", "সাদিয়া নওশীন অর্পা", "রাকিবুল হাসান", "মাইশা তাবাসসুম",
        "সৌরভ সরকার", "তানিশা রহমান", "মুহতাসিম বিল্লাহ", "মুনতাহা চৌধুরী",
        "আদনান হাবিব", "নাফিসা আনজুম"
      ],
      "Class 6": [
        "রেদওয়ানুল করিম", "আফিফা তানজিম মেঘলা", "নাফিস ফুয়াদ", "জারিন তাসনিম",
        "তাসিন আহমেদ", "মেহজাবিন আলম", "তানভীর শিকদার", "নুসরাত ইসলাম",
        "শাদমান সাকিব", "ফারিহা আফরোজ"
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
            { subject: "বাংলা", marks: Math.min(98, 85 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "ইংরেজি", marks: Math.min(95, 82 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "সাধারণ গণিত", marks: Math.min(100, 88 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "বিজ্ঞান / পদার্থবিজ্ঞান", marks: Math.min(96, 84 + (10 - idx)), grade: "A+", gpa: 5.0 },
            { subject: "তথ্য ও যোগাযোগ প্রযুক্তি", marks: Math.min(50, 45 + (idx < 5 ? 3 : 1)), grade: "A+", gpa: 5.0 },
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
        name: "ড. মোজাম্মেল হক",
        designation: "অভিভাবক (১০ম শ্রেণি)",
        title: "শিক্ষার মান ও শৃংখলা প্রশংসনীয়",
        comment: "আমার সন্তান এই বিদ্যালয়ে ভর্তি হওয়ার পর পড়াশোনায় এবং সহপাঠ্য কার্যক্রমে অভূতপূর্ব উন্নতি করেছে। শিক্ষকদের আন্তরিক যত্ন ও আধুনিক ল্যাব সুবিধা সত্যি অনন্য।",
        rating: 5,
        status: "approved",
      },
      {
        name: "সুলতানা কামাল",
        designation: "অভিভাবক (৮ম শ্রেণি)",
        title: "নিরাপদ পরিবেশ ও নৈতিক শিক্ষা",
        comment: "সুন্দর ক্যাম্পাস, সার্বক্ষণিক সিসিটিভি নিরাপত্তা এবং নিয়মানুবর্তিতা দেখে আমি অত্যন্ত সন্তুষ্ট। ডিজিটাল উপস্থিতি এবং নিয়মিত এসএমএস নোটিফিকেশন অভিভাবক হিসেবে আমাদের নিশ্চিন্ত রাখে।",
        rating: 5,
        status: "approved",
      },
      {
        name: "প্রকৌশলী মাহমুদুল হাসান",
        designation: "প্রাক্তন শিক্ষার্থী (এসএসসি ব্যাচ ২০১৯)",
        title: "আমার জীবনের সেরা ভিত্তি",
        comment: "এই স্কুল থেকে পাওয়া সঠিক দিকনির্দেশনা ও বিজ্ঞান শিক্ষার ভিত্তির ওপর দাঁড়িয়েই আজ আমি বুয়েটে পড়াশোনা শেষ করেছি। স্কুলটির উত্তরোত্তর সাফল্য কামনা করি।",
        rating: 5,
        status: "approved",
      },
      {
        name: "নাসরিন জাহান",
        designation: "অভিভাবক (৬ষ্ঠ শ্রেণি)",
        title: "শিশুশিক্ষার্থীদের চমৎকার যত্ন",
        comment: "আমার মেয়ে ৬ষ্ঠ শ্রেণিতে ভর্তি হয়েছে। শিক্ষকরা নতুন ক্লাসে বিষয়গুলো এত সুন্দর ও সহজভাবে বুঝিয়ে দেন যে সে প্রতিদিন সানন্দে স্কুলে যায়।",
        rating: 5,
        status: "approved",
      },
    ];

    await Review.deleteMany({});
    await Review.insertMany(reviewsData);

    console.log("✅ Bangladeshi School database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
