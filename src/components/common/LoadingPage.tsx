import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "./Loading";

export const LoadingPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={
          "absolute top-0 left-0 flex h-full w-full items-center justify-center align-middle"
        }
      >
        <Loading isLoading size={"large"} />
      </motion.div>
    </AnimatePresence>
  );
};
