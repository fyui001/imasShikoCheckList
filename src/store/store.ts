import Vue from 'vue'
import Vuex from 'vuex'
import { ImasShikoCheckModuleClass, registerImasShikoCheckListModule } from './ImasChikoCheckVuexModule'


Vue.use(Vuex)

export interface MainStore {
  imasShikoCheckStore?: ImasShikoCheckModuleClass
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function createStore() {
  const store = new Vuex.Store<MainStore>({})
  registerImasShikoCheckListModule(store)
  return store
}