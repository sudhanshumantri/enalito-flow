import { Step } from '@core/models'
import { useDrag } from 'react-dnd'
import { createDraggedInfoFromStep, DraggedTypeName } from '../dnd'

export const useStepDrag = (step: Step) => {
  const draggedInfo = createDraggedInfoFromStep(step)
  return useDrag(() => ({
    type: DraggedTypeName,
    item: draggedInfo,
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() })
  }))
}
