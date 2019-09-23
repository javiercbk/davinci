<template>
    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 900 500" :aria-label="chartLabel" role="img">
        <g v-if="title">
            <text text-anchor="start" x="161" :y="titleYPos" stroke="none" stroke-width="0" fill="#000000">{{title}}</text>
        </g>
        <!-- labels -->
        <g>
            <g v-for="label in labels" :key="label.label" :column-id="label.label">
                <g>
                    <text text-anchor="start" :x="labelTextXPos" :y="label.textPosition" stroke="none" stroke-width="0" fill="#222222">{{label.label}}</text>
                </g>
                <circle :cx="labelXPos" :cy="label.circlePosition" r="7" stroke="none" stroke-width="0" :fill="label.color"></circle>
            </g>
        </g>
        <!-- Pie -->
        <g v-for="p in paths" :key="p.key">
            <path :d="p.path" stroke="#ffffff" stroke-width="1" :fill="p.color" v-b-tooltip.hover :title="p.title" class="davinci-clickable"></path>
            <text text-anchor="start" :x="p.text.x" :y="p.text.y" font-family="Arial" font-size="14" stroke="none" stroke-width="0" fill="#ffffff">{{p.percentage | decimal(2)}}%</text>
        </g>
        <!-- details -->
        <g v-if="selected">
          <g>
            <path d="M465.5,217.5A1,1,0,0,1,464.5,216.5L464.5,168.5A1,1,0,0,1,465.5,167.5L548.5,167.5A1,1,0,0,1,549.5,168.5L549.5,216.5A1,1,0,0,1,548.5,217.5L521.5,217.5L493.18250865156676,231.39896639811204L507.5,217.5Z" stroke="#cccccc" stroke-width="1" fill="#ffffff" filter="url(https://google-developers.appspot.com/chart/interactive/docs/gallery/piechart_f9569977a9f4053d6622e420beb3cf93.frame?hl=en#_ABSTRACT_RENDERER_ID_0)"></path>
            <g>
              <text text-anchor="start" x="473" y="187.9" font-family="Arial" font-size="14" stroke="none" stroke-width="0" fill="#000000">{{selected.label}}</text>
            </g>
            <g>
              <text text-anchor="start" x="473" y="205.9" font-family="Arial" font-size="14" font-weight="bold" stroke="none" stroke-width="0" fill="#000000">11 (45.8%)</text>
            </g>
          </g>
        </g>
    </svg>
</template>

<style lang="scss" scoped src="./pie-chart.scss"></style>
<script src="./pie-chart.js"></script>
