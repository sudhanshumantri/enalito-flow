import { useGetTriggersQuery } from '@api/flow-api'
import { Step, TriggerUserData } from '@core/models'
import { Button, Card, Menu, MenuItem } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { useStepDrop } from '@ui/lib/hooks/useStepDrop'
import { useState } from 'react'
import { setSelectedStepId } from '../flow/flow'

type Params = {
  step: Step
}
export const TriggerComponent = ({ step }: Params) => {
  const [{ showDropSignal }, { isOver }, drop] = useStepDrop({ stepId: step.stepId })
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const onClick = () => dispatch(setSelectedStepId(step.stepId))
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const userData = step.userData as TriggerUserData
  const { data, error, isLoading } = useGetTriggersQuery(undefined, { skip: !userData.trigger })
  return drop(
    <div className={showDropSignal ? "triggerCardContainerDrop" : "triggerCardContainer"}>
      <Card
        variant="outlined"
        className={"triggerCard"}
        onClick={onClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: '10px' }}>
          {
            data
              ? `Trigger when ${data.find(x => x.trigger_id === userData.trigger)?.name}`
              : userData.trigger
                ? 'Trigger'
                : 'Configure Trigger'
          }
        </div>
      </Card>
    </div>
  )
}
