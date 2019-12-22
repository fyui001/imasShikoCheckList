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
  const VoiceActorList = Vue.extend({
    data() {
      return {}
    },
    components: {
      VoiceActorItem
    },
    computed: {
      voiceActors() {
        return (
          ImasShikoCheckListVuexModule.imasVoiceActors
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      }
    }
  })

  export default VoiceActorList

</script>

<style scoped>

</style>
