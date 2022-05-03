import { Step } from '@core/models'

export type TriggerModel = {
  _id: string
  name: string
  description: string
  trigger_id: number
  icon: string
}

export type FlowModel = {
  _id: string
  steps: Step[]
}

export type PostRespone = {
  code: number
  message: string
}

export type AddFlowRequest = {
  name: string
  tags: string
  description: string
  steps: Step[]
}
export type AddFlowRespone = {
  _id: string
  code: number
  message: string
}

export type GetRespone<TData> = {
  code: number
  data: TData[]
}

export type UpdateFlowResponse = {
  code: number
  message: string
}

export type UpdateFlowRequest = {
  flowId: string
  steps: Step[]
}

export type FlowInfo = {
  _id: string
  name: string
}
export type GetFlowInfoResponse = {
  total: number
  data: FlowInfo[]
}

export type GetFlowDetailResponse = {
  _id: string
  name: string
  tags: string
  description: string
  steps: Step[],
  created: Date
  modified: Date
}