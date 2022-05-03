import { canDelayChangeParent, createDelay, normalizeDelayComponent } from '@core/functions/delay'
import { canEmailChangeParent, createEmail, normalizeEmailComponent } from '@core/functions/email'
import { canConditionalSplitChangeParent,
  canConditionalSplitNoChangeParent,
  canConditionalSplitYesChangeParent,
  createConditionalSplit,
  normalizeConditionalSplitMainComponent,
  normalizeConditionalSplitNoComponent,
  normalizeConditionalSplitYesComponent,
} from '@core/functions/split'

import { canTriggerChangeParent, normalizeTriggerComponent } from '@core/functions/trigger'
import { allInstrumentTypes, InstrumentType, Step } from '@core/models'

export const isStepNotInstrument = (item: Step | InstrumentType): item is Step => (<Step>item).stepId !== undefined
export const isStep = (item?: Step): item is Step => (<Step>item).stepId !== undefined
// export const isStepType = (item: Step | undefined): item is Step => !!item

export type CreateStep = (parentId?: string) => {
  values: Step[],
  terminalParentId: string
}

export type NormalizeStepComponent = (step: Step) => Step
export type NormalizeStep = (step: Step[]) => Step[]

export const validateStepComponent = (step: Step) => {
  if (!step) {
    throw new Error('Step is undefined')
  }
  if (!step.stepId) {
    throw new Error('Step id is undefined')
  }
  if (!step.instrumentType) {
    throw new Error('Step instrument type is undefined')
  }
  if (!allInstrumentTypes.includes(step.instrumentType)) {
    throw new Error('Step instrument type is not valid ' + step.instrumentType)
  }
}

export const normalizeStepComponent = (step: Step) => {
  validateStepComponent(step)
  switch (step.instrumentType) {
    case 'trigger': return normalizeTriggerComponent(step)
    case 'email': return normalizeEmailComponent(step)
    case 'delay': return normalizeDelayComponent(step)
    case 'conditional-split': return normalizeConditionalSplitMainComponent(step)
    case 'conditional-split-yes': return normalizeConditionalSplitYesComponent(step)
    case 'conditional-split-no': return normalizeConditionalSplitNoComponent(step)
  }
}
export const normalizeStepComponents = (steps: Step[]) => {
  return steps.map(normalizeStepComponent)
}

export type CanChangeParent = (itemId: string, newParentId: string, oldParentId?: string) => boolean

export const getCanChangeParent = (instrument: InstrumentType): CanChangeParent => {
  switch (instrument) {
    case 'trigger': return canTriggerChangeParent
    case 'email': return canEmailChangeParent
    case 'delay': return canDelayChangeParent
    case 'conditional-split': return canConditionalSplitChangeParent
    case 'conditional-split-yes': return canConditionalSplitYesChangeParent
    case 'conditional-split-no': return canConditionalSplitNoChangeParent
  }
}

export const createStep = (instrumentType: InstrumentType, parentId?: string) => {
  switch (instrumentType) {
    case 'trigger': throw new Error('Step cannot be created')
    case 'email': return createEmail(parentId)
    case 'delay': return createDelay(parentId)
    case 'conditional-split': return createConditionalSplit(parentId)
    case 'conditional-split-yes': throw new Error('Step cannot be created')
    case 'conditional-split-no': throw new Error('Step cannot be created')
  }
}
