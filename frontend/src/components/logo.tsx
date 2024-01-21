import { Link } from "react-router-dom";
import LogoImg from "../assets/logo.png";

export default function Logo() {
  return (
    <Link to="/">
      <img
        src={LogoImg}
        alt="Open pulse logo"
        loading="eager"
        className="h-[40px] w-[40px]"
      />
    </Link>
  );
}
