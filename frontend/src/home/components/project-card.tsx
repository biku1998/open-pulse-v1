import { Link } from "react-router-dom";
import { Hash, Lightbulb, ChevronRight } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";

export default function ProjectCard() {
  return (
    <Link to="/">
      <Card className="relative w-[320px] shadow-none hover:border-primary transition-colors duration-200 group">
        <CardHeader className="p-4">
          <Avatar className="w-[58px] h-[58px] rounded-[16px]">
            <AvatarImage
              src="https://github.com/biku1998_.png"
              alt="@biku"
              className="rounded-[16px]"
            />
            <AvatarFallback className="rounded-[16px]">OP</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="px-4">
          <h2 className="font-bold">Enqurious</h2>
        </CardContent>
        <CardFooter className="flex items-start flex-col gap-4 px-4 pb-4">
          <div className="border border-dashed border-zinc-100 w-full" />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-1">
              <Hash className="mr-2 h-5 w-5 text-zinc-400" />
              <span className="text-zinc-700 text-sm">5 Channels</span>
            </div>

            <div className="flex items-center gap-1">
              <Lightbulb className="mr-2 h-5 w-5 text-zinc-400" />
              <span className="text-zinc-700 text-sm">15 Insights</span>
            </div>
          </div>
        </CardFooter>
        <div className="absolute bottom-4 right-4 transition-all duration-200 group-hover:right-3">
          <ChevronRight className="mr-2 h-5 w-5 text-zinc-400 group-hover:text-primary" />
        </div>
      </Card>
    </Link>
  );
}