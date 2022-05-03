import { assertTypeEquals } from '@core/functions/common/types'

export type InstrumentType =
  'trigger' |
  'email' |
  'delay' |
  'conditional-split' |
  'conditional-split-yes' |
  'conditional-split-no'

export const allInstrumentTypes = [
  'trigger',
  'email',
  'delay',
  'conditional-split',
  'conditional-split-yes',
  'conditional-split-no'
] as const
assertTypeEquals<InstrumentType, typeof allInstrumentTypes>(allInstrumentTypes)

export const draggableInstrumentTypes = [
  'email',
  'delay',
  'conditional-split'
] as const

export type StepUserData =
  EmailUserData |
  DelayUserData |
  ConditionalSplitUserData |
  TriggerUserData

export type Step = {
  stepId: string
  instrumentType: InstrumentType
  parentId?: string
  userData?: StepUserData,
}

export type EmailUserData = {
  senderName: string
  senderEmail: string
  subject: string
  preview: string
  template: string
  utm: string
}

export type DelayUserData = {
  delay: number
  unit: number
  untilTimeOfDay: boolean
  untilDayOfWeek: boolean
}

export type ConditionalSplitUserData = {
  filter: string
}

export type TriggerUserData = {
  trigger: number
}
