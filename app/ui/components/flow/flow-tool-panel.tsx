import { Step } from '@core/models'
import { Button, Drawer } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { RootState } from '@ui/store'
import { useSelector } from 'react-redux'
import { DelaySettingsComponent } from '../delay/delay-settings'
import { EmailSettingsComponent } from '../email/email-settings'
import { SplitSettingsComponent } from '../split/split-settings'
import { TriggerSettingsComponent } from '../trigger/trigger-settings'
import { selectStepById, setSelectedStepId } from './flow'

type Params = {
  stepId: string
}

export const getConfigComponent = (step: Step): JSX.Element => {
  switch (step.instrumentType) {
    case 'trigger':
      return <TriggerSettingsComponent stepId={step.stepId} />
    case 'delay':
      return <DelaySettingsComponent stepId={step.stepId} />
    case 'email':
      return <EmailSettingsComponent stepId={step.stepId} />
    case 'conditional-split':
      return <SplitSettingsComponent stepId={step.stepId} />
    default:
      throw new Error('Unknown instrument type')
  }
}

export const FlowToolPanel = ({ stepId }: Params) => {
  const dispatch = useAppDispatch()
  const onClick = () => dispatch(setSelectedStepId(''))
  const selectedStep = useSelector((state: RootState) =>
    selectStepById(state, state.steps.selectedStepId)
  )

  return <>
    <Button onClick={onClick} variant="outlined">← Back</Button>
    {selectedStep && getConfigComponent(selectedStep)}
  </>
}
