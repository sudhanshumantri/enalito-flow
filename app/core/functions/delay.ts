import { DelayUserData, InstrumentType, Step } from '@core/models'
import { nanoid } from 'nanoid'
import { CanChangeParent, CreateStep, NormalizeStep, NormalizeStepComponent, validateStepComponent } from './flow'

export const canDelayChangeParent: CanChangeParent = (itemId, newParentId, oldParentId) =>
  itemId !== newParentId &&
  (!oldParentId || newParentId !== oldParentId)

export const createDelayUserData = () => {
  return <DelayUserData>{
    delay: 0,
    unit: 0,
    untilTimeOfDay: false,
    untilDayOfWeek: true,
  }
}

export const createDelay: CreateStep = parentId => {
  const id = nanoid()
  return {
    values: [
      {
        stepId: id,
        instrumentType: 'delay',
        parentId,
        userData: createDelayUserData()
      }
    ],
    terminalParentId: id
  }
}

export const normalizeDelayComponent: NormalizeStepComponent = step => {
  validateStepComponent(step)
  if (step.instrumentType !== 'delay') {
    throw new Error('Step is not delay')
  }
  if (!step.userData) {
    return <Step>{
      ...step,
      userData: createDelayUserData()
    }
  }
  return step
}

export const normalizeDelay: NormalizeStep = stepComposite => {
  if (stepComposite?.length != 1) {
    throw new Error('Delay is valid only if it has exactly one step')
  }
  const [step] = stepComposite
  return [normalizeDelayComponent(step)]
}
