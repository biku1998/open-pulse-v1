import { useNavigate } from "react-router-dom";
import BgPattern from "../../assets/bg-pattern.svg";
import Logo from "../../assets/logo.png";
import { AuthSuccessResponse } from "../api";
import RegisterForm from "../components/register-form";
import { useUserStore } from "../user-store";

export default function RegisterPage() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const onRegister = (resp: AuthSuccessResponse) => {
    setUser({
      email: resp.user.email ?? "",
      id: resp.user.id,
    });
    navigate("/", { replace: true });
  };

  return (
    <main className="flex flex-col items-center relative pt-24">
      <img
        src={BgPattern}
        alt="background patter img"
        className="absolute top-0 -z-10"
        loading="eager"
      />

      <img
        src={Logo}
        alt="Open pulse logo"
        loading="eager"
        className="h-[42px] w-[40px] mb-6"
      />

      <RegisterForm onRegister={onRegister} />
    </main>
  );
}
