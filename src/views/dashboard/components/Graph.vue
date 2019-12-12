<template>
  <div id="graph">
    <d3-network :net-nodes="nodes" :net-links="links" :options="options">
    </d3-network>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'

// jsnx._prototype.d3 = d3
export default {
  name: 'Graph',
  components: {
    D3Network
  },
  data() {
    return {
      nodes: [
        { id: 'elonmusk', name: 'elonmusk' },
        { id: 'erdayastronaut', name: 'erdayastronaut' },
        { id: 'flcnhvy', name: 'flcnhvy' },
        { id: 'teslaownerssv', name: 'teslaownerssv' },
        { id: 'justpaulinelol', name: 'justpaulinelol' },
        { id: 'tesla', name: 'tesla' },
        { id: 'dmc_ryan', name: 'dmc_ryan' },
        { id: 'teslaliving', name: 'teslaliving' },
        { id: 'f1elvis', name: 'f1elvis' },
        { id: 'benjamin_ho', name: 'benjamin_ho' },
        { id: 'narendramodi', name: 'narendramodi' },
        { id: 'anupampkher', name: 'anupampkher' },
        { id: 'spacex', name: 'spacex' },
        { id: 'orbitalatk', name: 'orbitalatk' },
        { id: 'virgingalactic', name: 'virgingalactic' },
        { id: 'detlefkroeze', name: 'detlefkroeze' },
        { id: 'amyinorbit', name: 'amyinorbit' },
        { id: 'youtube', name: 'youtube' },
        { id: 'rosannapansino', name: 'rosannapansino' },
        { id: 'jamescharles', name: 'jamescharles' },
        { id: 'mrbeastyt', name: 'mrbeastyt' },
        { id: 'hevesh5', name: 'hevesh5' },
        { id: 'jimmyfallon', name: 'jimmyfallon' },
        { id: 'fallontonight', name: 'fallontonight' },
        { id: 'markronson', name: 'markronson' },
        { id: 'neuro2343', name: 'neuro2343' },
        { id: 'evelynrobinson', name: 'evelynrobinson' },
        { id: 'theprimaldino', name: 'theprimaldino' },
        { id: 'bnordhaug', name: 'bnordhaug' },
        { id: 'rocketlab', name: 'rocketlab' },
        { id: 'nasa', name: 'nasa' },
        { id: 'moonpie', name: 'moonpie' },
        { id: 'thebigm', name: 'thebigm' },
        { id: 'martianmanish', name: 'martianmanish' },
        { id: 'google', name: 'google' },
        { id: 'billgates', name: 'billgates' },
        { id: 'potus44', name: 'potus44' },
        { id: 'alwaleed_talal', name: 'alwaleed_talal' },
        { id: 'atul_gawande', name: 'atul_gawande' },
        { id: 'sapinker', name: 'sapinker' },
        { id: 'pewdiepie', name: 'pewdiepie' },
        { id: 'gfuelenergy', name: 'gfuelenergy' },
        { id: 'jack_septic_eye', name: 'jack_septic_eye' },
        { id: 'outerminds', name: 'outerminds' },
        { id: 'nytimes', name: 'nytimes' },
        { id: 'madebygoogle', name: 'madebygoogle' },
        { id: 'ydserin', name: 'ydserin' },
        { id: 'patrikrei', name: 'patrikrei' },
        { id: 'akashkumar404', name: 'akashkumar404' },
        { id: 'juvconsulting', name: 'juvconsulting' },
        { id: 'ziadtheactivist', name: 'ziadtheactivist' },
        { id: 'zontziry', name: 'zontziry' },
        { id: 'time2ryot', name: 'time2ryot' },
        { id: 'onedsgns', name: 'onedsgns' },
        { id: 'blairimani', name: 'blairimani' },
        { id: 'hadiya_afzal', name: 'hadiya_afzal' },
        { id: 'aaminasdfghjkl', name: 'aaminasdfghjkl' },
        { id: 'twitter', name: 'twitter' },
        { id: 'elias_mcfc', name: 'elias_mcfc' },
        { id: 'imactuallyivy', name: 'imactuallyivy' },
        { id: 'sketchesbyboze', name: 'sketchesbyboze' },
        { id: 'probxbly', name: 'probxbly' },
        { id: 'time', name: 'time' }
      ],
      links: [
        { sid: 'elonmusk', tid: 'elonmusk', _color: 'red' },
        { sid: 'elonmusk', tid: 'erdayastronaut', _color: 'red' },
        { sid: 'elonmusk', tid: 'flcnhvy', _color: 'red' },
        { sid: 'elonmusk', tid: 'teslaownerssv', _color: 'red' },
        { sid: 'elonmusk', tid: 'justpaulinelol', _color: 'red' },
        { sid: 'tesla', tid: 'tesla', _color: 'red' },
        { sid: 'tesla', tid: 'dmc_ryan', _color: 'red' },
        { sid: 'tesla', tid: 'teslaliving', _color: 'red' },
        { sid: 'tesla', tid: 'f1elvis', _color: 'red' },
        { sid: 'tesla', tid: 'benjamin_ho', _color: 'red' },
        { sid: 'narendramodi', tid: 'narendramodi', _color: 'red' },
        { sid: 'narendramodi', tid: 'anupampkher', _color: 'red' },
        { sid: 'spacex', tid: 'spacex', _color: 'red' },
        { sid: 'spacex', tid: 'orbitalatk', _color: 'red' },
        { sid: 'spacex', tid: 'virgingalactic', _color: 'red' },
        { sid: 'spacex', tid: 'detlefkroeze', _color: 'red' },
        { sid: 'spacex', tid: 'amyinorbit', _color: 'red' },
        { sid: 'youtube', tid: 'youtube', _color: 'red' },
        { sid: 'youtube', tid: 'rosannapansino', _color: 'red' },
        { sid: 'youtube', tid: 'jamescharles', _color: 'red' },
        { sid: 'youtube', tid: 'mrbeastyt', _color: 'red' },
        { sid: 'youtube', tid: 'hevesh5', _color: 'red' },
        { sid: 'jimmyfallon', tid: 'jimmyfallon', _color: 'red' },
        { sid: 'jimmyfallon', tid: 'fallontonight', _color: 'red' },
        { sid: 'jimmyfallon', tid: 'markronson', _color: 'red' },
        { sid: 'jimmyfallon', tid: 'neuro2343', _color: 'red' },
        { sid: 'jimmyfallon', tid: 'evelynrobinson', _color: 'red' },
        { sid: 'erdayastronaut', tid: 'erdayastronaut', _color: 'red' },
        { sid: 'erdayastronaut', tid: 'elonmusk', _color: 'red' },
        { sid: 'erdayastronaut', tid: 'theprimaldino', _color: 'red' },
        { sid: 'erdayastronaut', tid: 'bnordhaug', _color: 'red' },
        { sid: 'erdayastronaut', tid: 'rocketlab', _color: 'red' },
        { sid: 'nasa', tid: 'nasa', _color: 'red' },
        { sid: 'nasa', tid: 'moonpie', _color: 'red' },
        { sid: 'nasa', tid: 'thebigm', _color: 'red' },
        { sid: 'nasa', tid: 'martianmanish', _color: 'red' },
        { sid: 'nasa', tid: 'google', _color: 'red' },
        { sid: 'billgates', tid: 'billgates', _color: 'red' },
        { sid: 'billgates', tid: 'potus44', _color: 'red' },
        { sid: 'billgates', tid: 'alwaleed_talal', _color: 'red' },
        { sid: 'billgates', tid: 'atul_gawande', _color: 'red' },
        { sid: 'billgates', tid: 'sapinker', _color: 'red' },
        { sid: 'pewdiepie', tid: 'pewdiepie', _color: 'red' },
        { sid: 'pewdiepie', tid: 'gfuelenergy', _color: 'red' },
        { sid: 'pewdiepie', tid: 'elonmusk', _color: 'red' },
        { sid: 'pewdiepie', tid: 'jack_septic_eye', _color: 'red' },
        { sid: 'pewdiepie', tid: 'outerminds', _color: 'red' },
        { sid: 'nytimes', tid: 'nytimes', _color: 'red' },
        { sid: 'google', tid: 'google', _color: 'red' },
        { sid: 'google', tid: 'madebygoogle', _color: 'red' },
        { sid: 'google', tid: 'ydserin', _color: 'red' },
        { sid: 'google', tid: 'patrikrei', _color: 'red' },
        { sid: 'google', tid: 'akashkumar404', _color: 'red' },
        { sid: 'juvconsulting', tid: 'juvconsulting', _color: 'red' },
        { sid: 'juvconsulting', tid: 'ziadtheactivist', _color: 'red' },
        { sid: 'juvconsulting', tid: 'zontziry', _color: 'red' },
        { sid: 'juvconsulting', tid: 'time2ryot', _color: 'red' },
        { sid: 'juvconsulting', tid: 'onedsgns', _color: 'red' },
        { sid: 'ziadtheactivist', tid: 'ziadtheactivist', _color: 'red' },
        { sid: 'ziadtheactivist', tid: 'blairimani', _color: 'red' },
        { sid: 'ziadtheactivist', tid: 'hadiya_afzal', _color: 'red' },
        { sid: 'ziadtheactivist', tid: 'time2ryot', _color: 'red' },
        { sid: 'ziadtheactivist', tid: 'aaminasdfghjkl', _color: 'red' },
        { sid: 'twitter', tid: 'twitter', _color: 'red' },
        { sid: 'twitter', tid: 'elias_mcfc', _color: 'red' },
        { sid: 'twitter', tid: 'imactuallyivy', _color: 'red' },
        { sid: 'twitter', tid: 'sketchesbyboze', _color: 'red' },
        { sid: 'twitter', tid: 'probxbly', _color: 'red' }
      ],
      options: {
        force: 900,
        nodeSize: 20,
        size: {
          h: 800
        },
        nodeLabels: true,
        linkWidth: 5,
        canvas: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.graph {
  width: 100%;
  height: 100%;
}
.canvas-dev {
  width: 100%;
  height: 500px;
}
</style>
