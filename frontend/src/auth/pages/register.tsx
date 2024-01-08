import BgPattern from "../../assets/bg-pattern.svg";
import Logo from "../../assets/logo.png";
import RegisterForm from "../components/register-form";

export default function RegisterPage() {
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

      <RegisterForm />
    </main>
  );
}
