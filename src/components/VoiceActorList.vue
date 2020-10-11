<template>
  <div class="shikoList">
    <VoiceActorItem
      v-for="item in voiceActors"
      :key="item.id"
      :voice-actor-name="item.name">
    </VoiceActorItem>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VoiceActorItem from './VoiceActorItem.vue'
import ImasShikoCheckListVuexModule from '../store/ImasChikoCheckVuexModule'
export default Vue.extend({
  name: 'VoiceActorList',
  data() {
    return {}
  },
  components: {
    VoiceActorItem
  },
  computed: {
    voiceActors() {
      return (
        ImasShikoCheckListVuexModule(this.$store).imasVoiceActors
          .sort((a, b) => a.name.localeCompare(b.name))
      )
    }
  }
})
</script>

<style scoped>
</style>
