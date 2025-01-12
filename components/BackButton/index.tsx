import { MdArrowBackIos } from "react-icons/md";
import { ActionButton } from "../ActionButton";
import { useRouter } from "next/navigation";

interface Props {
  route: string;
}

export const BackButton = ({ route }: Props) => {
  const router = useRouter();

  return (
    <ActionButton
      Icon={MdArrowBackIos}
      action={() => router.push(route)}
      title="VOLTAR"
      background="gray"
      color="white"
    />
  );
};
