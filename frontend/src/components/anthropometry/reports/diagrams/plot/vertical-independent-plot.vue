<template>
  <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" viewBox="0 0 900 500" :aria-label="chartLabel" role="img">
    <g v-if="title">
      <text text-anchor="start" x="161" :y="titleYPos" stroke="none" stroke-width="0" fill="#000000">{{title}}</text>
    </g>
    <g>
      <g v-for="label in labels" :key="label.label" :column-id="label.label">
        <g>
          <text text-anchor="start" :x="labelTextXPos" :y="label.textY" stroke="none" stroke-width="0" fill="#222222">{{label.label}}</text>
        </g>
        <circle :cx="labelXPos" :cy="label.y" r="7" stroke="none" stroke-width="0" :fill="label.color"></circle>
      </g>
    </g>
    <g class="grid y-grid">
      <template v-for="(label, index) in xLabels">
        <line :key="`origin_${index}`" v-if="label.value === 0" :x1="label.position" :x2="label.position"  y1="10" y2="365" :class="{'origin': label.value === 0}"></line>
        <line :key="`number_${index}`" v-if="label.value !== 0" :x1="label.position" :x2="label.position"  y1="10" y2="365" stroke-dasharray="10"></line>
        <line :key="`number_bottom_${index}`" :x1="label.position" :x2="label.position" y1="365" y2="375" :class="{'origin': label.value === 0}"></line>
      </template>
    </g>
    <g class="grid y-grid">
      <line v-for="(y, index) in yDashedLines" :key="index" :x1="plotStartX" :x2="plotEndX" :y1="y" :y2="y" stroke-dasharray="10"></line>
      <line :x1="plotStartX" :x2="plotEndX" y1="370" y2="370"></line>
    </g>
    <g class="labels x-labels">
      <text v-for="(label, index) in xLabels" :key="index" :x="label.position" y="400">{{ label.value }}</text>
    </g>
    <g class="data">
      <circle v-for="(dot, index) in dots" :key="index" :cx="dot.position" :cy="dot.y" :fill="dot.color" class="davinci-clickable" :data-value="dot.value" r="7" v-b-tooltip.hover :title="dot.title"></circle>
    </g>
  </svg>
</template>

<style lang="scss" scoped src="./vertical-independent-plot.scss"></style>

<script src="./vertical-independent-plot.js"></script>
