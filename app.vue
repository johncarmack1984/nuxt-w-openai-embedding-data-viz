<script setup lang="ts">
const config = useRuntimeConfig();
const string = "This string has embeddings.";

const { data, pending, error, refresh } = await useFetch<{
  data: [{ object: string; index: number; embedding: number[] }];
  model: string;
  usage: { prompt_tokens: number; total_tokens: number };
}>("https://api.openai.com/v1/embeddings", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.openAiApiKey}`,
  },
  method: "POST",
  body: {
    input: string,
    model: "text-embedding-ada-002",
  },
  pick: ["data", "model", "usage"],
});
</script>

<template>
  <div
    class="w-screen h-screen bg-neutral-800 text-white flex flex-col justify-center"
  >
    <input
      class="text-center text-3xl text-bold mb-10 w-[80vw] bg-neutral-800 p-5 mx-auto"
      :value="string"
      disabled
    />
    <TheChart
      v-if="!pending && !error"
      class="w-[80vw] h-[80vh] mx-auto"
      :data="{
        labels: data?.data[0].embedding,
        datasets: [
          {
            data: data?.data[0].embedding,
            borderColor: '#d4d4d4',
            fill: false,
            tension: 0.1,
            label: 'Embeddings',
          },
        ],
      }"
    />
  </div>
</template>
