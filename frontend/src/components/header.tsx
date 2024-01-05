import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { HEADER_HEIGHT } from "../constants";
import { cn } from "../lib/utils";
import UserMenu from "./user-menu";

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Header(props: HeaderProps) {
  const { children, className = "" } = props;
  return (
    <header
      className="sticky top-0 z-40 flex w-full items-center justify-between border-0 border-b border-solid border-slate-200 bg-white px-10 py-2"
      style={{
        height: `${HEADER_HEIGHT}px`,
      }}
    >
      <Link to="/">
        <div className="mr-4 flex items-center justify-center px-1.5 py-1 hover:cursor-pointer hover:bg-slate-50 rounded-full">
          <img
            src={Logo}
            alt="Open pulse logo"
            loading="eager"
            className="h-[40px] w-[40px]"
          />
        </div>
      </Link>
      <div className={cn(className, "w-full")}>{children}</div>
      <UserMenu />
    </header>
  );
}
