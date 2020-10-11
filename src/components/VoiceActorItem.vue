<template>
  <b-form-checkbox class="voiceActorItem" v-model="isChecked"
    name="check-button" button button-variant="outline-danger" @change="shikoChecked">
    {{ voiceActorName }}
  </b-form-checkbox>
</template>

<script lang="ts">
import Vue from 'vue'
import ImasShikoCheckListVuexModule from '../store/ImasChikoCheckVuexModule'

export default Vue.extend({
  name: 'VoiceActorItem',
  data() {
    return {
      isChecked: false,
      value: this.$props.voiceActorName
    }
  },
  props: {
    voiceActorName: {
      type: String
    }
  },
  created() {
    const shikoCheckList = ImasShikoCheckListVuexModule(this.$store).shikoCheckList
    for (let i=0; i < shikoCheckList.length; i++) {
      if (this.$props.voiceActorName === shikoCheckList[i]) {
        this.isChecked = !this.isChecked
      }
    }
  },
  methods: {
    shikoChecked(e: string) {
      if (e) {
        ImasShikoCheckListVuexModule(this.$store).shikoCheckList.push(this.$props.voiceActorName)
      } else {
        ImasShikoCheckListVuexModule(this.$store).shikoCheckList.map((item:string, index: number) => {
          if(item === this.$props.voiceActorName) {
            ImasShikoCheckListVuexModule(this.$store).shikoCheckList.splice(index, 1)
          }
        })
      }
    }
  }
})
</script>
<style>
.voiceActorItem {
    margin: 5px;
}
</style>
