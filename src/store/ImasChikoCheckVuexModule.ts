import { Mutation, Action, VuexModule, getModule, Module } from 'vuex-module-decorators'
import { Store } from 'vuex'
import { MainStore } from './store'
import VoiceActtorName from '../modules/VoiceActorName'
import ApiRequest from '../clients/api'


@Module({name: 'ImasShikoCheckListStore', namespaced: true, stateFactory: true })
export class ImasShikoCheckModuleClass extends VuexModule {

  imasVoiceActors: VoiceActtorName[] = []
  shikoCheckList: string[] = []
  isUpdate = true
  usrToken: string = ''

  @Mutation
  public SET_VOICE_ACTORS(param: VoiceActtorName[]) {
    this.imasVoiceActors = param
  }

  @Mutation
  public SET_SHIKO_CHECK_LIST(param: string[]) {
    this.shikoCheckList = param
  }

  @Mutation
  public setUrlToken(param: string) {
    this.usrToken = param
  }


  @Action
  public async getVoiceActors() {
    const result = await ApiRequest.fetchVoiceActorMasturbationList()
    this.SET_VOICE_ACTORS(result.voiceActors)
  }

  @Action
  public async getVoiceActorAndShikoList(usrToken: string) {
    const result = await ApiRequest.fetchVoiceActorAndShikoList(usrToken)
    this.SET_VOICE_ACTORS(result.voiceActors)
    this.SET_SHIKO_CHECK_LIST(JSON.parse(result.shikoList[0].shiko_list))
  }

  @Action({})
  public async createVoiceActorShikoList(shikoCheckList: string) {
    const result = await ApiRequest.createVoiceActorMasturbation(shikoCheckList)
  }

  @Action({})
  public async updateVoiceActorShikoList(shikoCheckList: string, usrToken: any) {
    const result = await ApiRequest.updateVoiceActorMasturbation(shikoCheckList, usrToken)
  }
}


const ImasShikoCheckListVuexModule = (store?: Store<MainStore>) => getModule(ImasShikoCheckModuleClass, store)
export default ImasShikoCheckListVuexModule

export function registerImasShikoCheckListModule(store: Store<MainStore>) {
  if (!store.state.imasShikoCheckStore) {
    store.registerModule('ImasShikoCheckListStore', ImasShikoCheckModuleClass)
  }
}
