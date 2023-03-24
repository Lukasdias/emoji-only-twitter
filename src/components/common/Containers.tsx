import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = memo(({ ...props }) => {
  return <div className="flex h-screen justify-center">{props.children}</div>;
});

export const ContentContainer: React.FC<Props> = memo(({ ...props }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={"h-full w-full  border-x border-slate-400  md:max-w-2xl"}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
});

Container.displayName = "Container";
ContentContainer.displayName = "ContentContainer";
