<script lang="js">
import { h, defineComponent } from "vue";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "vue-chartjs";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default defineComponent({
  name: "TheChart",
  components: { Line },
  props: { data: { type: Object, default: () => {} }, class: { type: String } },
  setup(props) {
    return () =>
      h("div", { class: props.class }, h(Line, {
        data: props.data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } }
          },
          plugins: {
            legend: { display: false },
            title: { display: true, text: "Embeddings" }
          }
        },
      }));
  },
});
</script>
