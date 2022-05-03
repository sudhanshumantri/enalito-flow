import { useGetTriggersQuery } from '@api/flow-api'
import { TriggerUserData } from '@core/models'
import { FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { RootState } from '@ui/store'
import { useSelector } from 'react-redux'
import { selectStepById, updateStepUserData } from '../flow/flow'

type Params = {
  stepId: string
}
export const TriggerSettingsComponent = ({ stepId }: Params) => {
  const dispatch = useAppDispatch()
  const step = useSelector((state: RootState) => selectStepById(state, stepId))
  if (!step) throw new Error()
  const userData = step.userData as TriggerUserData
  const updateUserData = (changes: any) =>
    dispatch(updateStepUserData(stepId, changes))

  const { data, error, isLoading } = useGetTriggersQuery()
  return <div className={"configContainer"}>
    <FormControl key={"trigger-select"} fullWidth>
      <InputLabel id="trigger-select-label">Trigger</InputLabel>
      <Select
        labelId="trigger-select-label"
        id="trigger-select"
        value={userData.trigger}
        label="Trigger"
        onChange={e => updateUserData({ trigger: e.target.value })}
      >
        {!isLoading && !error && data
          ? data.map(trigger =>
              <MenuItem key={trigger.trigger_id} value={trigger.trigger_id}>{trigger.name}</MenuItem>
            )
          : <MenuItem key='trigger-spinner' value='-1'>Loading...</MenuItem>
        }
      </Select>
    </FormControl>
  </div>
}