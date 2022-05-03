import { EmailUserData, Step } from '@core/models'
import { Button, Card, Menu, MenuItem } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { useStepDrag } from '@ui/lib/hooks/useStepDrag'
import { useStepDrop } from '@ui/lib/hooks/useStepDrop'
import { useState } from 'react'
import { removeStepAndRerootChild, setSelectedStepId } from '../flow/flow'

type Params = {
  step: Step
}
export const EmailComponent = ({ step }: Params) => {
  const [{ isDragging }, drag, dragPreview] = useStepDrag(step)
  const [{ showDropSignal }, { /*canDrop,*/ isOver }, drop] = useStepDrop({ stepId: step.stepId })
  const dispatch = useAppDispatch()
  const onClick = () => dispatch(setSelectedStepId(step.stepId))
  const userData = step.userData as EmailUserData


  // MENU
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const deleteStep = () => {
    setAnchorEl(null)
    const stepId = step?.stepId
    if (stepId) {
      dispatch(removeStepAndRerootChild(stepId))
      // dispatch(removeStep(stepId))
    }
  }
  // /MENU

  return drop(
    <div className={showDropSignal ? "cardContainerDrop" : "cardContainer"}>
      {drag(
        <div>
          <Card
            variant="outlined"
            className={isDragging ? "cardDragging" : "card"}
            onClick={onClick}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: '10px' }}>

              {'Email ' + (userData.subject || '<no subject>')}
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  ...
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={deleteStep}>Delete</MenuItem>
                </Menu>
              </div>
            </div>

          </Card>
        </div>
      )}
    </div>
  )
}