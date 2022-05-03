import { Card } from '@mui/material'
import {
  DraggedInstrumentInfo, DraggedTypeName
} from '@ui/lib/dnd'
import { useDrag } from 'react-dnd'

type Params = {
  instrumentType: string
}
export const InstrumentComponent = ({ instrumentType }: Params) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DraggedTypeName,
    item: { instrumentType } as DraggedInstrumentInfo,
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() })
  }))

  return drag(
    <div>
      <Card variant="outlined" className={"instrumentCard"}>{instrumentType}</Card>
    </div>
  )
}
