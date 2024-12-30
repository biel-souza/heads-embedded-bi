import { IconType } from "react-icons";
import { Button, Text } from "./style";

interface Props {
  title: string;
  Icon: IconType;
  action: () => void;
  color: string;
  background: string;
}

export const ActionButton = ({ title, Icon, action, ...style }: Props) => {
  return (
    <Button {...style} onClick={action}>
      <Icon size={20} />
      <Text {...style}>{title}</Text>
    </Button>
  );
};
