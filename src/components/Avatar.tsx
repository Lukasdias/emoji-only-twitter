import * as Avatar from "@radix-ui/react-avatar";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "./common/Loading";
interface AvatarProps {
  fallbackText: string;
  src: string;
  alt: string;
  borderVariant: "circle" | "rounded" | "square";
  size: "small" | "medium" | "large";
}

const AvatarRoot = motion(Avatar.Root);
const AvatarImage = motion(Avatar.Image);
const AvatarFallback = motion(Avatar.Fallback);

export const NativeAvatar = ({ ...props }: AvatarProps) => {
  const rootClass = clsx(
    "bg-slate-700 inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle",
    {
      "h-[45px] w-[45px]": props.size === "small",
      "h-[60px] w-[60px]": props.size === "medium",
      "h-[75px] w-[75px]": props.size === "large",
    },
    {
      "rounded-full": props.borderVariant === "circle",
      "rounded-[10px]": props.borderVariant === "rounded",
      "rounded-sm": props.borderVariant === "square",
    }
  );

  return (
    <AvatarRoot className={rootClass}>
      <AnimatePresence>
        <AvatarImage
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="h-full w-full rounded-[inherit] object-cover"
          src={props.src}
          alt={props.alt}
        />
      </AnimatePresence>
      <AnimatePresence>
        <AvatarFallback
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex h-full w-full items-center justify-center bg-violet-600 "
        >
          <Loading isLoading />
        </AvatarFallback>
      </AnimatePresence>
    </AvatarRoot>
  );
};
