import { motion } from "framer-motion";

const instructors = [
  {
    name: "Rafy Hossain",
    role: "Full Stack Developer",
    img: "https://i.ibb.co/QjmVWdfG/550736493-1323221652838270-6778918439890169432-n-1.jpg",
  },
  {
    name: "Sarah Ahmed",
    role: "UI/UX Designer",
    img: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Michael Lee",
    role: "Backend Engineer",
    img: "https://i.pravatar.cc/150?img=33",
  },
  {
    name: "Emily Watson",
    role: "Data Analyst",
    img: "https://i.pravatar.cc/150?img=28",
  },
];

const TopInstructors = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
       

         <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center mb-12
        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
         Top Instructors
      </motion.h1>
         

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((inst, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
              className="
                bg-base-200/50 backdrop-blur
                rounded-2xl p-6 text-center
                hover:shadow-xl transition-all
              "
            >
              <img
                src={inst.img}
                alt={inst.name}
                className="
                  w-24 h-24 mx-auto mb-4
                  rounded-full object-cover
                  border-4 border-primary/30
                "
              />

              <h3 className="font-semibold text-lg">
                {inst.name}
              </h3>

              <p className="text-sm text-base-content/70">
                {inst.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopInstructors;
