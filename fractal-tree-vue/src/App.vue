<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
    <aside class="md:w-64 w-full bg-neutral-900  text-white  bg-opacity-90 p-6 shadow-lg">
      <h2 class="text-lg font-semibold mb-4">Fractal Tree Controls</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Depth: {{ depth }}</label>
          <input type="range" v-model.number="depth" min="1" max="12" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium">Angle Δ: {{ angle }}°</label>
          <input type="range" v-model.number="angle" min="0" max="90" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium">Ratio: {{ ratio.toFixed(2) }}</label>
          <input type="range" v-model.number="ratio" step="0.01" min="0.5" max="0.9" class="w-full" />
        </div>
        <div class="flex items-center">
          <input type="checkbox" v-model="jitter" id="jitter" class="mr-2" />
          <label for="jitter" class="text-sm">Jitter</label>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex bg-lime-400  items-center justify-center p-4">
      <canvas ref="canvas" :width="width" :height="height" class="w-full h-auto max-h-[90vh] rounded-lg"></canvas>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const depth  = ref(8);
const angle  = ref(30);
const ratio  = ref(0.75);
const jitter = ref(false);

// Full viewport size canvas
const width  = window.innerWidth * 0.8;
const height = window.innerHeight * 0.9;
let ctx;
const canvas = ref(null);

function rotate(x, y, θ) {
  const rad = θ * Math.PI / 180;
  return [
    x * Math.cos(rad) - y * Math.sin(rad),
    x * Math.sin(rad) + y * Math.cos(rad)
  ];
}

function drawBranch(x1, y1, x2, y2, d) {
  ctx.lineWidth   = (depth.value - d) * 0.5 + 0.5;
  const hue       = 30 + 90 * (1 - d / depth.value);
  ctx.strokeStyle = `hsl(${hue},80%,40%)`;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  if (d >= depth.value) {
    ctx.beginPath();
    ctx.arc(x2, y2, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    return;
  }

  const a = angle.value + (jitter.value ? (Math.random() - 0.5) * 10 : 0);
  const r = ratio.value + (jitter.value ? (Math.random() - 0.5) * 0.1 : 0);

  const vx  = x2 - x1;
  const vy  = y2 - y1;
  const len = Math.hypot(vx, vy) * r;
  const mag = Math.hypot(vx, vy);
  const ux  = vx / mag, uy = vy / mag;

  let [lx, ly] = rotate(ux, uy, +a);
  drawBranch(x2, y2, x2 + lx * len, y2 + ly * len, d + 1);

  let [rx, ry] = rotate(ux, uy, -a);
  drawBranch(x2, y2, x2 + rx * len, y2 + ry * len, d + 1);
}

function redraw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.translate(width/2, height);
  ctx.scale(1, -1);
  drawBranch(0, 0, 0, height * 0.25, 0);
}

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  redraw();
});

watch([depth, angle, ratio, jitter], redraw);
</script>

<style>
</style>