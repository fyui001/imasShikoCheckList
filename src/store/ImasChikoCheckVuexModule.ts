import { Mutation, Action, VuexModule, getModule, Module } from "vuex-module-decorators"
import store from './store'
import VoiceActtorName from '../modules/VoiceActorName'
import axios from 'axios'



@Module({dynamic: true, store, name: 'ShikoCheckList-Store'})
export class ImasShikoCheckVuexModuleClass extends VuexModule {

  imasVoiceActors: VoiceActtorName[] = []
  shikoCheckList: string[] = []

  @Mutation
  public setVoiceActors(param: VoiceActtorName[]) {
    this.imasVoiceActors = param
  }

  @Mutation
  public setShikoCheckList(param: string[]) {
    this.shikoCheckList = param
  }

  @Action({})
  public getVoiceActors() {
    axios({
      method: 'GET',
      url: 'https://app.mogamin.net/api/shiko/get'
    }).then((result: any) => {
      this.setVoiceActors(result.data.voiceActors)
    })
  }

  @Action({})
  public getVoiceActorAndShikoList(usrToken: string) {
    axios({
      method: 'GET',
      url: 'https://app.mogamin.net/api/shiko/get',
      params: {
        usrToken
      }
    }).then((result: any) => {
      const voiceActors: VoiceActtorName[] = result.data.voiceActors
      const shikoLists: string[] = JSON.parse(result.data.shikoList[0].shiko_list)
      console.log(shikoLists)
      this.setVoiceActors(voiceActors)
      this.setShikoCheckList(shikoLists)
    })
  }

}

const ImasShikoCheckListVuexModule = getModule(ImasShikoCheckVuexModuleClass)
export default ImasShikoCheckListVuexModule
