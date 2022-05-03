import { EmailUserData, InstrumentType, Step } from '@core/models'
import { nanoid } from 'nanoid'
import { CanChangeParent, CreateStep, NormalizeStep, NormalizeStepComponent, validateStepComponent } from './flow'

export const canEmailChangeParent: CanChangeParent = (itemId, newParentId, oldParentId) =>
  itemId !== newParentId &&
  (!oldParentId || newParentId !== oldParentId)

export const createEmailUserData = () => {
  return <EmailUserData> {
    senderName: '',
    senderEmail: '',
    subject: '',
    preview: '',
    template: '',
    utm: '',
  }
}

export const createEmail: CreateStep = parentId => {
  const id = nanoid()
  return {
    values: [
      {
        stepId: id,
        instrumentType: 'email',
        parentId,
        userData: createEmailUserData()
      }
    ],
    terminalParentId: id
  }
}

export const normalizeEmailComponent: NormalizeStepComponent = step => {
  validateStepComponent(step)
  if (step.instrumentType !== 'email') {
    throw new Error('Step is not email')
  }
  if (!step.userData) {
    return <Step>{
      ...step,
      userData: createEmailUserData()
    }
  }
  return step
}

export const normalizeEmail: NormalizeStep = stepComposite => {
  if (stepComposite?.length != 1) {
    throw new Error('Email is valid only if it has exactly one step')
  }
  const [step] = stepComposite
  return [normalizeEmailComponent(step)]
}
