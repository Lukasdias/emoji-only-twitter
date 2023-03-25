import { Spinner } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { type FC } from "react";
import { purple } from "tailwindcss/colors";

const AnimatedSpinner = motion(Spinner);

interface Props {
  isLoading: boolean;
  size?: "small" | "medium" | "large";
}

export const Loading: FC<Props> = ({ isLoading, size = "small" }) => {
  if (!isLoading) return null;

  return (
    <AnimatedSpinner
      animate={{
        color: [purple[500], purple[700], purple[500]],
        rotate: [0, 180, 360],
        opacity: [1, 0.5, 1],
        transition: {
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        },
      }}
      className={clsx(``, {
        "h-5 w-5": size === "small",
        "h-8 w-8": size === "medium",
        "h-12 w-12": size === "large",
      })}
    />
  );
};
