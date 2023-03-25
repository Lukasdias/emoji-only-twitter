import clsx from "clsx";
import { motion, type MotionProps } from "framer-motion";
import { Loading } from "./Loading";
interface ButtonProps extends MotionProps {
  children: React.ReactNode;
  variant?: "success" | "disabled" | "danger";
  loading?: boolean;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, variant, loading, ...rest } = props;
  return (
    <motion.button
      animate={
        loading
          ? {
              opacity: [1, 0.5, 1],
              transition: {
                duration: 1,
                repeat: Infinity,
              },
            }
          : {}
      }
      type={variant === "disabled" || loading ? "button" : "submit"}
      whileHover={{ opacity: 0.8 }}
      className={clsx(
        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 font-bold text-white",
        variant === "success" && "bg-purple-500 hover:bg-purple-600",
        variant === "disabled" && "cursor-not-allowed bg-gray-500",
        variant === "danger" && "bg-red-500 hover:bg-red-600"
      )}
      {...rest}
    >
      {loading ? <Loading size={"small"} isLoading /> : children}
    </motion.button>
  );
};
