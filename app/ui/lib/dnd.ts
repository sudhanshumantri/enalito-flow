import { getCanChangeParent } from '@core/functions/flow'
import { InstrumentType, Step } from '@core/models'
import { DragSourceOptions } from 'react-dnd'

export const DraggedTypeName = 'stepOrInstrument';

export type DraggedInstrumentInfo = {
  instrumentType: InstrumentType
}
export type DraggedStepInfo = {
  stepId: string
  instrument: InstrumentType
  parentId?: string
}

const instrumentDragOptions: DragSourceOptions = {
  dropEffect: 'copy',
}

export type DroppedItemInfo = {
  draggedItem: DraggedItemInfo,
  parentId: string
}
export type DraggedItemInfo = DraggedStepInfo | DraggedInstrumentInfo

export const createDraggedInfoFromStep = (step: Step): DraggedItemInfo => {
  return <DraggedStepInfo> {
    stepId: step.stepId,
    parentId: step.parentId,
    instrument: step.instrumentType,
  }
}

export const isDraggedInstrument = (item: DraggedStepInfo | DraggedInstrumentInfo | undefined): item is DraggedInstrumentInfo => (item as DraggedInstrumentInfo)?.instrumentType !== undefined
export const isDraggedStep = (item: DraggedStepInfo | DraggedInstrumentInfo | undefined): item is DraggedStepInfo => (item as DraggedStepInfo)?.stepId !== undefined
export type MoveItem = (draggedItem: DraggedItemInfo, parentId: string) => void

export const canDraggedItemDrop = (dragged: DraggedItemInfo, newParentId: string) => {
  if (!dragged) {
    return false
  }
  if (isDraggedInstrument(dragged)) {
    return true
  }
  if (isDraggedStep(dragged)) {
    return getCanChangeParent(dragged.instrument)(dragged.stepId, newParentId, dragged.parentId)
  }
  throw new Error('Unknown dragged item type')
}
