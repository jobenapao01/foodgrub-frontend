import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const LoadingButton = ({ children, className }: Props) => {
  return (
    <Button disabled className={className}>
      <Loader2 className="mr-2 size-4 animate-ping" />
      {children}
    </Button>
  );
};

export default LoadingButton;
