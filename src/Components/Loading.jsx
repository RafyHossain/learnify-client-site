import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-200/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-base-100/80 border border-base-300 shadow-2xl rounded-3xl px-12 py-10
                   flex flex-col items-center gap-6 backdrop-blur-xl"
      >
        {/* Animated Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 rounded-full border-[4px]
                     border-primary/30 border-t-primary"
        />

        {/* Loading Text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-sm font-medium tracking-wide text-base-content/60"
        >
          Loading, please wait...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
