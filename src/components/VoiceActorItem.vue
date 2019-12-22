<template>
        <b-form-checkbox class="voiceActorItem" v-model="isChecked"
                         name="check-button" button button-variant="outline-danger" @change="shikoChecked">
            {{voiceActorName}}
        </b-form-checkbox>
</template>

<script lang="ts">
  import Vue from 'vue'
  import ImasShikoCheckListVuexModule from '../store/ImasChikoCheckVuexModule'

  const VoiceActorItem = Vue.extend({
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
      const shikoCheckList = ImasShikoCheckListVuexModule.shikoCheckList
      for (let i=0; i < shikoCheckList.length; i++) {
        if (this.$props.voiceActorName === shikoCheckList[i]) {
          this.isChecked = !this.isChecked
        }
      }
    },
    methods: {
      shikoChecked(e: string) {
        if (e) {
          ImasShikoCheckListVuexModule.shikoCheckList.push(this.$props.voiceActorName)
        } else {
          ImasShikoCheckListVuexModule.shikoCheckList.map((item:string, index: number) => {
              if(item === this.$props.voiceActorName) {
                ImasShikoCheckListVuexModule.shikoCheckList.splice(index, 1)
            }
          })
        }
      }
    }
  })

  export default VoiceActorItem
</script>
<style>
.voiceActorItem {
    margin: 5px;

}
</style>
