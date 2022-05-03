import { ConditionalSplitUserData, InstrumentType, Step, StepUserData } from '@core/models'
import { nanoid } from 'nanoid'
import { CanChangeParent, NormalizeStep, NormalizeStepComponent, validateStepComponent } from './flow'

type SplitCompositeType = {
  split: InstrumentType
  yes: InstrumentType
  no: InstrumentType
}

const createSpli = (userDataGenerator: () => StepUserData, type: SplitCompositeType) => (parentId?: string) => {
  const splitStep: Step = {
    stepId: nanoid(),
    instrumentType: type.split,
    parentId,
    userData: userDataGenerator(),
  }
  const yesStep: Step = {
    stepId: nanoid(),
    instrumentType: type.yes,
    parentId: splitStep.stepId
  }
  const noStep: Step = {
    stepId: nanoid(),
    instrumentType: type.no,
    parentId: splitStep.stepId
  }
  return {
    values: [splitStep, yesStep, noStep],
    terminalParentId: yesStep.stepId
  }
}

const throwIfNotStepOfType = (step: Step, instrumentType: InstrumentType) => {
  if (step.instrumentType !== instrumentType) {
    throw new Error(`Step is not of the ${instrumentType} instrument type but ${step.instrumentType}`)
  }
}

const normalizeSplitMainComponent: (t: SplitCompositeType) => NormalizeStepComponent = type => step => {
  validateStepComponent(step)
  throwIfNotStepOfType(step, type.split)
  if (!step.userData) {
    return <Step>{
      ...step,
      userData: createConditionalSplitUserData()
    }
  }
  return step
}
const normalizeSplitYesComponent: (t: SplitCompositeType) => NormalizeStepComponent = type => step => {
  validateStepComponent(step)
  throwIfNotStepOfType(step, type.yes)
  return step
}
const normalizeSplitNoComponent:  (t: SplitCompositeType) => NormalizeStepComponent = type => step => {
  validateStepComponent(step)
  throwIfNotStepOfType(step, type.no)
  return step
}

export type FindSplit = (splitStep: Step, allSteps: Step[]) => { splitStep: Step, yesStep: Step, noStep: Step }
const findSplit: (t: SplitCompositeType) => FindSplit = type => (splitStep, allSteps) => {
  throwIfNotStepOfType(splitStep, type.split)
  const yesStep = allSteps.find(x => x.parentId === splitStep.stepId && x.instrumentType === type.yes)
  const noStep = allSteps.find(x => x.parentId === splitStep.stepId && x.instrumentType === type.no)
  if (!yesStep || !noStep) {
    throw new Error('No yes or no step found')
  }

  return {
    splitStep,
    yesStep,
    noStep
  }
}

const normalizeSplit: (t: SplitCompositeType) => NormalizeStep = type => stepComposite => {
  if (stepComposite?.length != 3) {
    throw new Error('Delay is valid only if it has exactly one step')
  }
  const [mainStep, firstBranchStep, secondBranchStep] = stepComposite
  if (!mainStep || !firstBranchStep || !secondBranchStep) {
    throw new Error('A step component is undefined')
  }
  if (mainStep.instrumentType !== 'email') {
    throw new Error('Step is not email')
  }
  if (firstBranchStep.instrumentType === secondBranchStep.instrumentType) {
    throw new Error('Split branches cannot have the same type')
  }
  const branchTypes = [type.yes, type.no] as const
  if (!branchTypes.includes(firstBranchStep.instrumentType) ||
    !branchTypes.includes(secondBranchStep.instrumentType)) {
    throw new Error('Split branch must be yes or no')
  }
  const yesBranch = firstBranchStep.instrumentType === type.yes ? firstBranchStep : secondBranchStep
  const noBranch = firstBranchStep === yesBranch ? secondBranchStep : firstBranchStep

  return [
    normalizeSplitMainComponent(type)(mainStep),
    normalizeSplitYesComponent(type)(yesBranch),
    normalizeSplitNoComponent(type)(noBranch),
  ]
}

export const canConditionalSplitChangeParent: CanChangeParent = (itemId, newParentId, oldParentId) => false
export const canConditionalSplitYesChangeParent: CanChangeParent = (itemId, newParentId, oldParentId) => false
export const canConditionalSplitNoChangeParent: CanChangeParent = (itemId, newParentId, oldParentId) => false
export const createConditionalSplitUserData = () => {
  return <ConditionalSplitUserData>{
    filter: '',
  }
}

const conditionalType: SplitCompositeType = { split: 'conditional-split', yes: 'conditional-split-yes', no: 'conditional-split-no' } as const
export const createConditionalSplit = createSpli(createConditionalSplitUserData, conditionalType)
export const normalizeConditionalSplitMainComponent = normalizeSplitMainComponent(conditionalType)
export const normalizeConditionalSplitYesComponent = normalizeSplitYesComponent(conditionalType)
export const normalizeConditionalSplitNoComponent = normalizeSplitNoComponent(conditionalType)
export const normalizeConditionalSplit = normalizeSplit(conditionalType)
export const isConditionalSplitUserData = (userData: StepUserData): userData is ConditionalSplitUserData => {
  return (userData as ConditionalSplitUserData).filter !== undefined
}
export const findConditionalSplit = findSplit(conditionalType)
