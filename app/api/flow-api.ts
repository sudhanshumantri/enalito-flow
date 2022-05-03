import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddFlowRequest, AddFlowRespone, FlowInfo, FlowModel, TriggerModel, GetFlowDetailResponse, GetFlowInfoResponse, UpdateFlowResponse, UpdateFlowRequest } from './models'

export const hasResponseData = (item: any): item is { data: any } => (<{ data: any }>item).data !== undefined

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
const token = process.env.NEXT_PUBLIC_ENALITO_TOKEN
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

export const flowApi = createApi({
  reducerPath: 'flowApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: reqHeaders => {
      reqHeaders.set('X-ENALITO-TOKEN', token ?? '')
      return reqHeaders
    },
  }),
  endpoints: (builder) => ({
    addFlow: builder.mutation<AddFlowRespone, AddFlowRequest>({
      query: flow => ({
        url: `add?clientid=${clientId}`,
        method: 'POST',
        body: flow,
      }),
    }),
    updateFlow: builder.mutation<UpdateFlowResponse, UpdateFlowRequest>({
      query: request => ({
        url: `update/${request.flowId}`,
        method: 'POST',
        body: {
          steps: request.steps
        },
      }),
    }),
    getFlowList: builder.query<GetFlowInfoResponse, void>({ query: () => 'list' }),
    getFlowDetail: builder.query<GetFlowDetailResponse, string>({ query: flowId => `${flowId}` }),
    getTriggers: builder.query<TriggerModel[], void>({ query: () => 'trigger/list' }),
  }),
})

export const {
  useGetTriggersQuery,
  useAddFlowMutation,
  useGetFlowListQuery,
  useGetFlowDetailQuery,
  useUpdateFlowMutation,
} = flowApi