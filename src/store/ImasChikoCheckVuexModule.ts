import {Mutation, Action, VuexModule, getModule, Module} from "vuex-module-decorators"
import store from './store'
import VoiceActtorName from '../modules/VoiceActorName'
import axios from 'axios'


@Module({dynamic: true, store, name: 'ShikoCheckList-Store'})
export class ImasShikoCheckVuexModuleClass extends VuexModule {

  imasVoiceActors: VoiceActtorName[] = []
  shikoCheckList: string[] = []
  isFetching = false
  usrToken = ''

  @Mutation
  public setVoiceActors(param: VoiceActtorName[]) {
    this.imasVoiceActors = param
  }

  @Mutation
  public setShikoCheckList(param: string[]) {
    this.shikoCheckList = param
  }

  @Mutation
  public setUrlToken(param: string) {
    this.usrToken = param
  }

  @Action({})
  public getVoiceActors() {
    axios({
      method: 'GET',
      url: 'https://app.mogamin.net/api/shiko/get'
    }).then((result: any) => {

        this.setVoiceActors(result.data.voiceActors)

    }).catch(() => {

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
      const responce = result.data
      if (responce.status) {

        const voiceActors: VoiceActtorName[] = result.data.voiceActors
        this.setVoiceActors(voiceActors)
        this.setShikoCheckList(JSON.parse(responce.shikoList[0].shiko_list))

      }
    })
  }

  @Action({})
  public createVoiceActorShikoList(shikoCheckList: string): void {
    axios({
      method: 'POST',
      url: 'https://app.mogamin.net/api/shiko/create',
      params: {
        'shikoList': shikoCheckList
      }
    }).then((result: any) => {
      const responce = result.data

      if (responce.status) {
        this.setUrlToken(responce.urlToken)
      }

    })
  }

  @Action({})
  public updateVoiceActorShikoList(usrToken: string) {
    const json = JSON.stringify(ImasShikoCheckListVuexModule.shikoCheckList)
    axios({
      method:'POST',
      url: 'https://app.mogamin.net/api/shiko/update',
      params: {
        'shikoList': json,
        'usrToken': usrToken
      }
    }).then((result) => {

    }).catch(() => {

    })
  }

}

const ImasShikoCheckListVuexModule = getModule(ImasShikoCheckVuexModuleClass)
export default ImasShikoCheckListVuexModule
