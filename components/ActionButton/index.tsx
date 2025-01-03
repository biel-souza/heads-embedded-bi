import { IconType } from "react-icons";
import { Button, Text } from "./style";

interface Props {
  title: string;
  Icon: IconType;
  action: () => void;
  color: string;
  background: string;
  className?: string;
}

export const ActionButton = ({ title, Icon, action, className, ...style }: Props) => {
  return (
    <Button {...style} onClick={action} className={className}>
      <Icon size={20} />
      <Text {...style}>{title}</Text>
    </Button>
  );
};
