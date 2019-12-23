import {Mutation, Action, VuexModule, getModule, Module} from "vuex-module-decorators"
import store from './store'
import VoiceActtorName from '../modules/VoiceActorName'
import axios from 'axios'


@Module({dynamic: true, store, name: 'ShikoCheckList-Store'})
export class ImasShikoCheckVuexModuleClass extends VuexModule {

  imasVoiceActors: VoiceActtorName[] = []
  shikoCheckList: string[] = []
  isFetching = false
  isUpdate = true
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

  @Mutation
  public updateShikoListFailed() {

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
  public async createVoiceActorShikoList(shikoCheckList: string) {
    await axios({
      method: 'POST',
      url: 'https://app.mogamin.net/api/shiko/create',
      params: {
        'shikoList': shikoCheckList
      }
    }).then((result: any) => {
      const responce = result.data
      if (responce.status) {
        this.setUrlToken(responce.usrToken)
      } else {
        this.updateShikoListFailed()
      }

    }).catch(() => {
      this.updateShikoListFailed()
    })
  }

  @Action({})
  public async updateVoiceActorShikoList(usrToken: any, shikoCheckList: string) {
    await axios({
      method: 'POST',
      url: 'https://app.mogamin.net/api/shiko/update',
      params: {
        'shikoList': shikoCheckList,
        'usrToken': usrToken
      }
    }).then((result) => {
      if (result.data.status) {
        this.updateShikoListFailed()
      }
    }).catch(() => {
      this.updateShikoListFailed()
    })
  }

}

const ImasShikoCheckListVuexModule = getModule(ImasShikoCheckVuexModuleClass)
export default ImasShikoCheckListVuexModule
