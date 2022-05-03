import { Step, TriggerUserData } from '@core/models'
import { nanoid } from 'nanoid'
import { CanChangeParent, CreateStep, NormalizeStep, NormalizeStepComponent, validateStepComponent } from './flow'


export const canTriggerChangeParent: CanChangeParent = (itemId, newParentId, oldParentId) => false

export const createTriggerUserData = () => {
  return <TriggerUserData>{
    trigger: 0,
  }
}

export const createTrigger: CreateStep = parentId => {
  const id = nanoid()
  return {
    values: [
      {
        stepId: id,
        instrumentType: 'trigger',
        parentId,
        userData: createTriggerUserData()
      }
    ],
    terminalParentId: id
  }
}

export const normalizeTriggerComponent: NormalizeStepComponent = step => {
  validateStepComponent(step)
  if (step.instrumentType !== 'trigger') {
    throw new Error('Step is not trigger')
  }
  if (!step.userData) {
    return <Step>{
      ...step,
      userData: createTriggerUserData()
    }
  }
  return step
}

export const normalizeTrigger: NormalizeStep = stepComposite => {
  if (stepComposite?.length != 1) {
    throw new Error('Trigger is valid only if it has exactly one step')
  }
  const [step] = stepComposite
  return [normalizeTriggerComponent(step)]
}
