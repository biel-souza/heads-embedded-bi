import { MdSaveAlt } from "react-icons/md";
import { ActionButton } from "../ActionButton";

interface Props {
  action: () => void;
}

export const SaveButton = ({ action }: Props) => {
  return <ActionButton Icon={MdSaveAlt} action={action} title="SALVAR" background="black" color="white" />;
};
