import { IconType } from "react-icons";
import { Button, Text } from "./style";

interface Props {
  href: string;
  title: string;
  Icon: IconType;
}

export const RouteButton = ({ href, title, Icon }: Props) => {
  return (
    <Button href={href}>
      <Icon size={18} />
      <Text>{title}</Text>
    </Button>
  );
};
