import * as React from "react";
import _omit from "lodash/omit";
import { Settings, Eye, EyeOff, Copy } from "lucide-react";
import { Button } from "../../components/ui/button";
import { cn, toast } from "../../lib/utils";
import { useFetchTokens } from "../queries";
import CreateTokenDialog from "./create-token-dialog";

export default function TokenManagement() {
  const fetchTokensQuery = useFetchTokens();

  const [visibleKeyIds, setVisibleKeyIds] = React.useState<{
    [k: string]: "0";
  }>({});

  const toggleVisibility = (keyId: string) => {
    if (visibleKeyIds[keyId]) {
      setVisibleKeyIds((prev) => _omit(prev, keyId));
    } else {
      setVisibleKeyIds((prev) => ({ ...prev, [keyId]: "0" }));
    }
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast("Token copied to clipboard");
  };

  return (
    <section className="p-6 border border-zinc-200 rounded-[8px] w-full animate-in slide-in-from-bottom-2 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1 mb-5">
          <h2 className="font-semibold">My tokens</h2>
          <p className="text-sm text-zinc-400">
            Tokens are required for publishing your events to Open pulse
          </p>
        </div>
        <CreateTokenDialog />
      </div>
      <div className="flex flex-col gap-4">
        {fetchTokensQuery.data
          ? fetchTokensQuery.data.map((token) => (
              <div className="flex flex-col gap-[6px]" key={token.id}>
                <span className="text-sm text-zinc-500">{token.name}</span>

                <div className="py-2 px-4 flex items-center justify-between rounded-lg border border-zinc-200">
                  <span
                    className={cn(
                      "text-sm text-zinc-600",
                      visibleKeyIds[token.id] ? "" : "blur-sm",
                    )}
                  >
                    {token.value}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-zinc-400 hover:text-zinc-500"
                    >
                      <Settings className="w-4 h-4 " />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-zinc-400 hover:text-zinc-500"
                      onClick={() => toggleVisibility(token.id)}
                    >
                      {visibleKeyIds[token.id] ? (
                        <Eye className="w-4 h-4 " />
                      ) : (
                        <EyeOff className="w-4 h-4 " />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-zinc-400 hover:text-zinc-500"
                      onClick={() => handleCopy(token.value)}
                    >
                      <Copy className="w-4 h-4 " />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </section>
  );
}
