import axios from 'axios'
import { API_BASE_URL } from "@/config/getenv"

export interface FetchVoiceActorsResponse {
  status: boolean
  voiceActors: {
    id: number
    name: string
  }
  shiko_list?: string[]
}

export interface SendVoiceActorMasturbationList {
  shikoList: string
}

export interface UpdateVoiceActorMasturbationList {
  shikoList: string
  usrToken: string
}

export interface PostMasturbationResponse {
  status: boolean
  msg: string
}

export default class ApiRequest {

  static async fetchVoiceActorMasturbationList(): Promise<FetchVoiceActorsResponse> {
    const result = await axios({
      method: 'GET',
      url: `${API_BASE_URL}/api/shiko/get`
    })
    return result.data
  }

  static async fetchVoiceActorAndShikoList(token: string): Promise<FetchVoiceActorsResponse> {
    const result = await axios({
      method: 'GET',
      url: `${API_BASE_URL}/api/shiko/get`,
      params: {
        urlToken: token
      }
    })
    return result.data
  }

  static async createVoiceActorMasturbation(shikoCheckList: string): Promise<SendVoiceActorMasturbationList> {
    const result = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/api/shiko/create`,
      data: shikoCheckList
    })
    return result.data
  }

  static async updateVoiceActorMasturbation(shikoCheckList: string, usrToken: string): Promise<UpdateVoiceActorMasturbationList> {
    const result = await axios({
      method: 'POST',
      url: `${API_BASE_URL}/shiko/update`,
      data: {
        shikoList: shikoCheckList,
        usrToken
      }
    })
    return result.data
  }


}
