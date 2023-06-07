<script setup lang="ts">
const input = ref("This is the way.");
const { data, error, pending, query } = await useFetchEmbeddings(input.value);
</script>

<template>
  <div
    class="w-screen min-h-screen dark:bg-neutral-800 dark:text-white p-5 flex flex-col justify-center"
  >
    <form
      class="text-bold mb-10 w-full text-center mx-auto gap-2 flex flex-col"
      @submit.prevent
    >
      <textarea
        class="bg-neutral-100 dark:text-black p-5 block rounded-sm h-[5rem] disabled:text-neutral-400 disabled:bg-neutral-200"
        placeholder="Submit a string to get embeddings..."
        v-model="input"
        disabled
      />
      <button class="rounded-sm py-3 px-5 bg-green-600" disabled>
        Submit (coming soon)
      </button>
      <button class="rounded-sm py-3 px-5 bg-neutral-400" disabled>
        Reset
      </button>
    </form>
    <div>string: {{ input || "null" }}</div>
    <div>submitted: {{ input === query }}</div>
    <div>current: {{ query }}</div>
    <div v-if="pending">pending</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
    <div v-if="!pending && !error">
      embeddings returned: {{ data?.data[0].embedding.length }}
    </div>
    <TheChart
      v-if="!pending && !error"
      class="w-full mx-auto"
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
