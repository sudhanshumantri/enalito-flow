import { Step } from '@core/models'

export const normalizeSteps = (array: Step[]) => {
  return {
    entities: array.reduce((obj, x) => ({...obj, [x.stepId]: x}), {}),
    ids: array.map(x => x.stepId)
  }
}