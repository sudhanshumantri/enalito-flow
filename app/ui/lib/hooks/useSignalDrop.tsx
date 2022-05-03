import { useCallback, useState } from 'react'
import { DropTargetMonitor } from 'react-dnd'
import { DraggedItemInfo } from '../dnd'

export const useSignalDrop = (canDrop: (dragged: DraggedItemInfo) => boolean) => {

  const [showDropSignal, setShowDropSignal] = useState(false)

  const signalDrop = (monitor: DropTargetMonitor<DraggedItemInfo, void>) => {
    const draggedItem = monitor.getItem<DraggedItemInfo>()
    const accepting = canDrop(draggedItem)
    setShowDropSignal(accepting)
  }

  return [showDropSignal, signalDrop] as const
}