import { DelayUserData, Step } from '@core/models'
import { Button, Card, Menu, MenuItem } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { useStepDrag } from '@ui/lib/hooks/useStepDrag'
import { useStepDrop } from '@ui/lib/hooks/useStepDrop'
import { useState } from 'react'
import { removeStep, removeStepAndRerootChild, setSelectedStepId } from '../flow/flow'

type Params = {
  step: Step
}
export const DelayComponent = ({ step }: Params) => {
  const [{ isDragging }, drag, dragPreview] = useStepDrag(step)
  const [{ showDropSignal }, { /*canDrop,*/ isOver }, drop] = useStepDrop({ stepId: step.stepId })
  const dispatch = useAppDispatch()
  const onClick = () => dispatch(setSelectedStepId(step.stepId))




  // MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteStep = () => {
    setAnchorEl(null);
    const stepId = step?.stepId
    if (stepId){
      dispatch(removeStepAndRerootChild(stepId))
      // dispatch(removeStep(stepId))
    }
  }
  // /MENU

  const userData = step.userData as DelayUserData

  return drop(
    <div className={showDropSignal ? "cardContainerDrop" : "cardContainer"}>
      {drag(
        <div>
          <Card
            onClick={onClick}
            variant="outlined"
            className={isDragging ? "cardDragging" : "card"}
          >

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: '10px'}}>
              <span style={{textOverflow: 'ellipsis', flexGrow: 0, flexShrink: 100, whiteSpace: 'nowrap'}}>
                Wait {userData.delay} {userData.unit <= 10 ? 'Days' : userData.unit == 20 ? 'Hours' : userData.unit == 30 ? 'Minutes' : ''}
              </span>

            {/*
              MENU
            */}
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