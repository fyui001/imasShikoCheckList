<template>
  <div class="main">
    <b-alert class="noShikoAlert" :show="isVoiceActorLoading" variant="danger">リストの取得にに失敗しました</b-alert>
    <b-alert class="noShikoAlert" :show="isNotSelected" variant="danger">まだアイマス声優でシコってないようですね、早くシコってこのリストを埋め尽くそう！</b-alert>
    <VoiceActorList class="voiceActorList"/>
    <b-button class="saveBut" v-if="!isNotSelected" type="submit" variant="primary" @click="shikoListCreate" :disabled="buttonDisable">保存する</b-button>
    <div class="success" :show="isCreated">
      <b-alert :show="isCreated">
        シコチェックリストの保存に成功しました<br>
        下記のリンクがあなたのシコチェックリストです<br>
        どこかにメモしておきましょう
      </b-alert>
      <b-alert :show="isUpdate">
        シコチェックリストの更新に成功しました
      </b-alert>
      <a class="url" :href="url" target="_blank">{{url}}</a>
    </div>
    <b-alert :show="saveFailed">シコチェックリストの保存に失敗しました</b-alert>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import VoiceActorList from './VoiceActorList.vue'
import ImasShikoCheckListVuexModule from '../store/ImasChikoCheckVuexModule'

export default Vue.extend({
  name: 'ImasVoiceActorShikoList',
  data() {
    return {
      url: '',
      isLoading: false,
      isLoadingFailed: false,
      isCreate: false,
      isUpdate: false,
      saveFailed: false,
      buttonDisable: false
    }
  },
  async created() {
    try {
      this.$data.isLoading = true
      if (ImasShikoCheckListVuexModule(this.$store).imasVoiceActors.length === 0 && !this.$route.query.token) {
        ImasShikoCheckListVuexModule(this.$store).getVoiceActors()
        this.$data.isLoading = false
      } else {
        const usrToken: any = this.$route.query.token
        this.$data.url = `https://imasshikochecklist.firebaseapp.com/?token=${usrToken}`
        ImasShikoCheckListVuexModule(this.$store).getVoiceActorAndShikoList(usrToken)
        this.$data.isLoading = false
    }
    } catch {
      this.$data.isLoadingFailed = true
    }
  },
  components: {
    VoiceActorList
  },
  computed: {
    isNotSelected() {
      return ImasShikoCheckListVuexModule(this.$store).shikoCheckList.length === 0
    },
    isVoiceActorLoading() {
      return this.$data.isLoadingFailed
    },
    isCreated() {
      return this.$data.isCreate
    }
  },
  methods: {
    async shikoListCreate() {
      this.$data.buttonDisable = true
      const json = JSON.stringify(ImasShikoCheckListVuexModule(this.$store).shikoCheckList)
      if (this.$data.url === '') {
        await ImasShikoCheckListVuexModule(this.$store).createVoiceActorShikoList(json)
        if (ImasShikoCheckListVuexModule(this.$store).isUpdate) {
          this.$data.url = `https://imasshikochecklist.firebaseapp.com/?token=${ImasShikoCheckListVuexModule(this.$store).usrToken}`
          this.$data.isCreate = true
        } else {
          this.$data.saveFailed = true
        }
      } else {
        await ImasShikoCheckListVuexModule(this.$store).updateVoiceActorShikoList(this.$route.query.token, json)
        if (ImasShikoCheckListVuexModule(this.$store).isUpdate) {
          this.$data.isUpdate = true
        } else {
          this.$data.saveFailed = true
        }
      }
    }
  }
})

</script>
<style lang="scss" scoped>
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
.success {
  font-size: 20px;
  margin: 20px;
}
</style>
