import Vue from 'vue'
import Vuex from 'vuex'
import { ImasVoiceActorShikoCheckVuexModuleClass } from './vuex-module'

Vue.use(Vuex)

export interface MainStore {
  imasViceActorShikoCheckStore: ImasVoiceActorShikoCheckVuexModuleClass
}

const store = new Vuex.Store<MainStore>({})

export default store
