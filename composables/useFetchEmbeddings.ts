import { AsyncData } from "nuxt/dist/app/composables/asyncData";

interface EmbeddingsResponse {
  data: [{ object: string; index: number; embedding: number[] }];
  model: string;
  usage: { prompt_tokens: number; total_tokens: number };
  string: string;
}

export const useFetchEmbeddings = async (query: string) => {
  const config = useRuntimeConfig();
  const { data, pending, error, refresh } = await useFetch<EmbeddingsResponse>(
    "https://api.openai.com/v1/embeddings",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.openAiApiKey}`,
      },
      method: "POST",
      body: {
        input: query,
        model: "text-embedding-ada-002",
      },
      pick: ["data", "model", "usage"],
    }
  );
  return { data, pending, error, refresh, query };
};
