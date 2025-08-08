"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const Page = () => {
  const teamMembers = [
    {
      name: "Shubham Chamoli",
      role: "Technical Head",
      imgSrc: "/assets/team/techhead.JPG",
      alt: "Shubham Chamoli",
      linkedinUrl: "https://linkedin.com/in/shubham-chamoli", // Add actual LinkedIn URL
    },
    {
      name: "Anshika Bisht",
      role: "HR & Growth",
      imgSrc: "/assets/team/anshika.jpg",
      alt: "Joseph Avatar",
      linkedinUrl: "https://linkedin.com/in/vivek-profile", // Add actual LinkedIn URL
    },
     {
      name: "Shivam",
      role: " Sr. Manager",
      imgSrc: "/assets/team/newteam/Shivam.jpg",
      alt: "Sofia Avatar",
      linkedinUrl: "https://linkedin.com/in/rishab-profile", // Add actual LinkedIn URL
    },
    {
      name: "Siddharth Kumar Kothiyal",
      role: "Tech Lead",
      imgSrc: "/assets/team/sid.jpg",
      alt: "Sofia Avatar",
      linkedinUrl:
        "https://www.linkedin.com/in/siddharth-kumar-kothiyal-33257125a/", // Add actual LinkedIn URL
    },
    {
      name: "Rishab",
      role: "Tech Lead",
      imgSrc: "/assets/team/rishab.jpeg",
      alt: "Sofia Avatar",
      linkedinUrl: "https://linkedin.com/in/rishab-profile", // Add actual LinkedIn URL
    },
    {
      name: "Adarsh",
      role: "Sr. Marketing executive",
      imgSrc: "/assets/team/newteam/Adarsh.jpg",
      alt: "Joseph Avatar",
      linkedinUrl: "https://linkedin.com/in/vivek-profile", // Add actual LinkedIn URL
    },
    {
      name: "Sandeep",
      role: "Sr. Content creation",
      imgSrc: "/assets/team/newteam/SANDEEP.jpg",
      alt: "Sofia Avatar",
      linkedinUrl:
        "https://www.linkedin.com/in/siddharth-kumar-kothiyal-33257125a/", // Add actual LinkedIn URL
    },
    {
      name: "Prabhat",
      role: "Sr. Graphic designer",
      imgSrc: "/assets/team/newteam/prabhat.jpg",
      alt: "Sofia Avatar",
      linkedinUrl: "https://linkedin.com/in/rishab-profile", // Add actual LinkedIn URL
    },
   

    {
      name: "Neha Negi",
      role: "SMM Intern",
      imgSrc: "/assets/team/neha.JPG",
      alt: "Sofia Avatar",
      linkedinUrl: "https://linkedin.com/in/neha-negi-profile", // Add actual LinkedIn URL
    },
    {
      name: "Meena Negi",
      role: "SMM Intern",
      imgSrc: "/assets/team/meena.jpg",
      alt: "Sofia Avatar",
      linkedinUrl: "https://www.linkedin.com/in/meena-negi-282021263/", // Add actual LinkedIn URL
    },
    {
      name: "Pritam Mandal",
      role: "Full stack developer Intern",
      imgSrc: "/assets/team/pritam.jpg",
      alt: "Sofia Avatar",
      linkedinUrl: "https://www.linkedin.com/in/pritam-mandal-871510281/", // Add actual LinkedIn URL
    },
  ];

  const founder = [
    {
      name: "Kumar Anshuman",
      role: "Founder",
      imgSrc: "/assets/team/anshuman.png",
      alt: "Anshuman",
      linkedinUrl: "https://www.linkedin.com/in/kumar-anshuman-397388318/", // Add actual LinkedIn URL
    },
    {
      name: "Shriram Singh",
      role: "Founder",
      imgSrc: "/assets/team/ram.png",
      alt: "Shriram",
      linkedinUrl: "https://www.linkedin.com/in/shriram-singh-534a54276/", // Add actual LinkedIn URL
    },
  ];

  const uspItems = [
    "India's first room-finding portal based on real-time data.",
    "No brokerage or client charges.",
    "Free verification of fake profiles.",
    "Aiming to build a system that easily provides real-time details about PGs, hostels, and flats.",
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-screen h-full bg-gradient-to-b from-white to-gray-50 pt-32 pb-20">
      <motion.div
        className="flex flex-col justify-center items-center gap-5 p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our Company
        </motion.h1>
        <motion.p
          className="text-center lg:w-1/2 px-10 lg:px-0 text-gray-600 text-lg leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Your trusted platform for seamless room renting. Whether you&apos;re a
          tenant looking for the perfect place or a host wanting to connect with
          reliable renters, Gharpadharo simplifies journey..
        </motion.p>
      </motion.div>

      <section className="py-16">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <motion.div
            className="mx-auto mb-12 max-w-screen-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">
              Founders
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="font-light text-gray-600 sm:text-xl">
              Meet the two passionate individuals who founded Gharpadharo with a
              mission to make room renting seamless and enjoyable for everyone.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {founder.map((member, index) => (
              <motion.div
                key={index}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-xs lg:max-w-xs xl:max-w-xs"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-56 sm:h-64 lg:h-72 xl:h-80 w-full overflow-hidden group">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      className="w-full h-full object-cover object-top"
                      width={300}
                      height={400}
                      src={member.imgSrc || "/placeholder.svg"}
                      alt={member.alt}
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="p-6 border-t-4 border-blue-600">
                  <h3 className="mb-1 text-2xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>

                  <motion.div
                    className="mt-6 flex gap-4 justify-center"
                    initial={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white/80">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <motion.div
            className="mx-auto mb-12 max-w-screen-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">
              Our Team
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="font-light text-gray-600 sm:text-xl">
              Meet the passionate and dedicated team members who have worked
              tirelessly to bring this platform to life.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="relative mx-auto rounded-full overflow-hidden w-44 h-44 mb-6 shadow-lg border-4 border-white"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    className="w-full h-full object-cover"
                    width={200}
                    height={200}
                    src={member.imgSrc || "/placeholder.svg"}
                    alt={member.alt}
                  />
                  <motion.div
                    className="absolute inset-0 bg-blue-600/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>

                <motion.h3
                  className="mb-1 text-2xl font-bold text-gray-900"
                  whileHover={{ color: "#2563eb" }}
                >
                  {member.name}
                </motion.h3>
                <p className="text-blue-600 font-medium">{member.role}</p>

                <motion.div
                  className="mt-4 flex justify-center gap-3 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 0 }}
                  whileHover={{ y: 0 }}
                >
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* intern our  */}
      

      {/* Our USPs Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <motion.div
            className="mx-auto mb-12 max-w-screen-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-8 text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Our USPs
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-8"></div>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {uspItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <motion.div
                  className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <p className="text-left text-gray-700 text-base sm:text-lg leading-relaxed font-medium">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated Mission Statement */}
      <motion.section
        className="py-16 px-4 mx-auto max-w-screen-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 p-10 text-white"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-white/90 leading-relaxed">
                At Gharpadharo, we&apos;re dedicated to revolutionizing the room
                rental experience. We strive to create a transparent, efficient,
                and trustworthy platform that connects property owners with the
                perfect tenants, making the entire process seamless and
                enjoyable for everyone involved.
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2 p-10 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="relative w-64 h-64">
                <Image
                  src="/assets/illustraion/home-search.svg"
                  alt="Our Mission"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Page;
