import LogoImg from "../assets/logo.png";

export default function Logo() {
  return (
    <img
      src={LogoImg}
      alt="Open pulse logo"
      loading="eager"
      className="h-[40px] w-[40px]"
    />
  );
}
