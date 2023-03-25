import { Siren } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { red } from "tailwindcss/colors";

const AnimatedSiren = motion(Siren);

export const ErrorPage = () => {
  return (
    <div className="top-0 left-0 flex h-screen w-screen items-center justify-center  gap-3 align-middle">
      <AnimatedSiren
        animate={{
          color: [red[500], red[300], red[500]],
          y: [0, -10, 0],
          transition: {
            duration: 1,
            repeat: Infinity,
          },
        }}
        className="h-12 w-12 "
      />
      <motion.div
        animate={{
          opacity: [1, 0.5, 1],
        }}
        className="text-4xl"
      >
        Something went wrong...
      </motion.div>
    </div>
  );
};
