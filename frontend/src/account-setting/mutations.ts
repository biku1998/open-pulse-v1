import { useMutation } from "@tanstack/react-query";
import { supabase } from "../api/supabase";
import { convertToCamelCase } from "../lib/utils";
import { Token } from "../types";

const createToken = async (
  payload: Pick<Token, "name" | "value" | "createdBy">,
): Promise<Token> => {
  const { data, error } = await supabase
    .from("tokens")
    .insert({
      name: payload.name,
      value: payload.value,
      created_by: payload.createdBy,
    })
    .select("*")
    .single();

  if (error) throw new Error("Failed to create token");

  return convertToCamelCase<Token>(data);
};

export const useCreateToken = ({
  onSuccess,
}: {
  onSuccess?: (token: Token) => void;
} = {}) =>
  useMutation({
    mutationFn: createToken,
    onSuccess: (token) => {
      if (onSuccess) onSuccess(token);
    },
  });
