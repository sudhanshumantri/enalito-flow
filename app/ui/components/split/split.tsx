import { ConditionalSplitUserData, Step } from '@core/models'
import { Button, Card, Menu, MenuItem } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { useStepDrop } from '@ui/lib/hooks/useStepDrop'
import { ReactFragment, useState } from 'react'
import { removeStepAndAllChildren, setSelectedStepId } from '../flow/flow'

type Params = {
  splitStep: Step
  yesStepId: string
  noStepId: string
  yesTree: ReactFragment | undefined
  noTree: ReactFragment | undefined
}
export const SplitComponent = ({ splitStep, yesStepId, noStepId, yesTree, noTree }: Params) => {
  const [{ showDropSignal: showYesCardDropSignal }, { isOver: isOverYes }, yesCardDrop] = useStepDrop({ stepId: yesStepId })
  const [{ showDropSignal: showNoCardDropSignal }, { isOver: isOverNo }, noCardDrop] = useStepDrop({ stepId: noStepId })
  const dispatch = useAppDispatch()
  const onClick = () => dispatch(setSelectedStepId(splitStep.stepId))

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
    const stepId = splitStep.stepId
    if (stepId) {
      dispatch(removeStepAndAllChildren(stepId))
    }
  }
  const userData = splitStep.userData as ConditionalSplitUserData

  return <>
    <div className={"mainCardContainer"}>
      <Card
        variant="outlined"
        className={"mainCard"}
        onClick={onClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: '10px' }}>
          {
            userData.filter
              ? `Filter when ${userData.filter}`
              : 'Configure Split'
          }
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
    <div className={"treeContainer"}>
      <div className={"yesBranchContainer"}>
        {yesCardDrop(
          <div className={showYesCardDropSignal ? "branchCardContainerDrop" : "branchCardContainer"}>
            <Card variant="outlined" className={"yesCard"}>Yes</Card>
          </div>
        )}
        {yesTree}
      </div>
      <div className={"noBranchContainer"}>
        {noCardDrop(
          <div className={showNoCardDropSignal ? "branchCardContainerDrop" : "branchCardContainer"}>
            <Card variant="outlined" className={"noCard"}>No</Card>
          </div>
        )}
        {noTree}
      </div>
    </div>
  </>
}