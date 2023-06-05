export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    openAiApiKey: process.env.OPENAI_API_KEY,
  },
});
