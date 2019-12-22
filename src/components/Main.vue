<template>
    <div class="main">
            <b-alert class="noShikoAlert" :show="!isVoiceActorLoading" variant="danger">リストの取得にに失敗しました</b-alert>
            <b-alert class="noShikoAlert" :show="isNotSelected" variant="danger">まだアイマス声優でシコってないようですね、早くシコってこのリストを埋め尽くそう！</b-alert>
            <VoiceActorList class="voiceActorList"/>
            <b-button class="saveBut" v-if="!isNotSelected" type="submit" variant="primary" @click="shikoListCreate">保存する</b-button>
            <b-alert :show="isCreated">保存に成功しました{{usrToken}}</b-alert>
    </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import VoiceActorList from './VoiceActorList.vue'
  import ImasShikoCheckListVuexModule from '../store/ImasChikoCheckVuexModule'

  const MainVue = Vue.extend({
    data() {
      return {
        usrToken: '',
        isShikoList: true,
        isLoading: true,
        isLoadingFailed: false,
        isFetching: false,
        isCreate: false
      }
    },
    created() {
      try {

        if (ImasShikoCheckListVuexModule.imasVoiceActors.length === 0 && this.$route.query.token === undefined) {

          this.isShikoList = !this.isShikoList
          ImasShikoCheckListVuexModule.getVoiceActors()
          this.isLoading = false

        } else {

          const usrToken: any = this.$route.query.token
          this.$data.usrToken = usrToken
          ImasShikoCheckListVuexModule.getVoiceActorAndShikoList(usrToken)
          this.isLoading = false
        }
        this.isFetching = true

      } catch {
        this.isLoadingFailed = true
      }
    },
    components: {
      VoiceActorList
    },
    computed: {
      isNotSelected() {
        return ImasShikoCheckListVuexModule.shikoCheckList.length === 0
      },
      isVoiceActorLoading() {
        return this.$data.isFetching
      },
      isCreated() {
        return this.$data.isCreate
      }

    },
    methods: {
      shikoListCreate() {
        if (this.$data.usrToken === '') {
          const json = JSON.stringify(ImasShikoCheckListVuexModule.shikoCheckList)
          ImasShikoCheckListVuexModule.createVoiceActorShikoList(json)
          this.$data.usrToken = ImasShikoCheckListVuexModule.usrToken
          this.$data.isCreate = true
        } else {
          ImasShikoCheckListVuexModule.updateVoiceActorShikoList(this.$data.usrToken)
        }
      }
    }

  })
  export default MainVue
</script>
<style>
    .main {
        text-align: center;
    }

    .voiceActorList {
        margin: 5px;
    }

    .noShikoAlert {
        margin-top: 10px;
    }

    .saveBut {
        margin: 20px
    }
</style>
