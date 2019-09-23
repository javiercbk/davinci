<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 180">
   <g stroke="#000">
      <path d="M98.652 29.77s-12.093 4.142-27.447 18.592C64.838 54.354 57.91 62.118 51.05 72.094c-9.681 14.083-19.225 32.572-26.86 56.706 20.532 16.82 52.041 27.828 74.839 27.653 23.13.175 54.307-10.834 74.839-27.653-13.045-41.231-31.66-65.988-47.014-80.438-15.355-14.45-27.448-18.591-27.448-18.591l-.33-.097-.047-.014-.048.014-.33.097z" fill="none" stroke-width=".26458"/>
      <path d="M24.19 128.8l122.792-56.724M99.03 29.66v126.811M51.182 71.992L173.87 128.8M99.455 156.424z" fill="none" stroke-width=".265"/>
      <ellipse ry=".945" rx=".898" cy="36.811" cx="102.81" fill="#606060" stroke-width=".265" fill-opacity=".984"/>
      <path d="M100.986 37.882v.827l.623.36v1.289l1.206.907 1.207-.907v-1.29l.622-.359v-.827h-1.829z" fill="#606060" stroke-width=".26458"/>
      <ellipse ry=".945" rx=".898" cy="115.045" cx="166.004" fill="#606060" fill-opacity=".984" stroke-width=".265"/>
      <path fill="#606060" stroke-width=".265" d="M164.515 116.104h2.877v6.515h-2.877z"/>
      <ellipse ry=".945" rx=".898" cy="115.174" cx="32.011" fill="#606060" fill-opacity=".984" stroke-width=".265"/>
      <ellipse ry="2.409" rx="2.479" cy="118.658" cx="32.011" fill="#606060" stroke-width=".265"/>
      <path d="M17.462 161.004h168.805V19.452" fill="none" stroke-width=".565"/>
   </g>
   <g>
    <text x="190" y="40.2">+8</text>
    <text x="190" y="54.2">+6</text>
    <text x="190" y="68.2">+4</text>
    <text x="190" y="82.2">+2</text>
    <text x="194" y="96.2">0</text>
    <text x="192" y="110.2">-2</text>
    <text x="192" y="124.2">-4</text>
    <text x="192" y="138.2">-6</text>
    <text x="192" y="152.2">-8</text>
   </g>
   <g>
    <text x="21.2" y="169">-6</text>
    <text x="33.7" y="169">-5</text>
    <text x="46.2" y="169">-4</text>
    <text x="58.7" y="169">-3</text>
    <text x="71.2" y="169">-2</text>
    <text x="83.7" y="169">-1</text>
    <text x="97.2" y="169">0</text>
    <text x="107.7" y="169">+1</text>
    <text x="120.2" y="169">+2</text>
    <text x="132.7" y="169">+3</text>
    <text x="145.2" y="169">+4</text>
    <text x="157.7" y="169">+5</text>
    <text x="170.2" y="169">+6</text>
   </g>
   <g v-if="current">
    <circle :cx="current.x" :cy="current.y" fill="blue" class="davinci-clickable" r="1.3" v-b-tooltip.hover :title="current.label"></circle>
   </g>
   <!-- <g> -->
     <!-- +10 top -->
     <!-- <circle cx="99.04" cy="29.74" fill="blue" class="davinci-clickable" :data-value="0" r=".9" v-b-tooltip.hover title="top"></circle> -->
     <!-- center -->
     <!-- <circle cx="99.04" cy="94.2" fill="red" class="davinci-clickable" :data-value="0" r=".9" v-b-tooltip.hover title="center"></circle> -->
     <!-- -6 left -->
     <!-- <circle cx="24.25" cy="128.76" fill="orange" class="davinci-clickable" :data-value="0" r=".9" v-b-tooltip.hover title="-6 left"></circle> -->
     <!-- +6 right -->
     <!-- <circle cx="173.81" cy="128.76" fill="green" class="davinci-clickable" :data-value="0" r=".9" v-b-tooltip.hover title="=6 right"></circle> -->
     <!-- -10 bottom -->
     <!-- <circle cx="99.04" cy="156.4" fill="purple" class="davinci-clickable" :data-value="0" r=".9" v-b-tooltip.hover title="bottom"></circle> -->
   <!-- </g> -->
   <g>
     <!-- top center -->
     <text x="80" y="25" fill="#3366CC">{{topCenterLabel}}</text>
     <!-- bottom left -->
     <text x="15" y="155" fill="#FF9900">{{bottomLeftLabel}}</text>
     <!-- bottom right -->
     <text x="140" y="155" fill="#109618">{{bottomRightLabel}}</text>
   </g>
</svg>
</template>

<style lang="scss" scoped src="./somatocard-diagram.scss"></style>

<script src="./somatocard-diagram.js"></script>
