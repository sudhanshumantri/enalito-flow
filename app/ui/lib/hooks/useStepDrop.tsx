import { dropStep } from '@ui/components/flow/flow'
import { AppDispatch } from '@ui/store'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { canDraggedItemDrop, DraggedItemInfo, DraggedTypeName, MoveItem } from '../dnd'
import { useSignalDrop } from './useSignalDrop'

type Params = {
  stepId: string
}
export const useStepDrop = ({ stepId }: Params) => {
  const canDrop = (dragged: DraggedItemInfo) => canDraggedItemDrop(dragged, stepId)
  const [showDropSignal, signalDrop] = useSignalDrop(canDrop)
  const dispatch = useDispatch<AppDispatch>()

  const onDrop: MoveItem = (draggedItem, parentId) => {
    dispatch(dropStep(draggedItem, parentId))
  }

  const useDropValues = useDrop(() => ({
    accept: DraggedTypeName,
    drop: dragged => onDrop(dragged, stepId),
    // drop: dragged => onDropRedux(dragged, stepId),
    canDrop,
    collect: monitor => {
      signalDrop(monitor)
      return {
        isOver: monitor.isOver(),
      }
    }
  }))

  return [
    { showDropSignal },
    ...useDropValues
  ] as const
}