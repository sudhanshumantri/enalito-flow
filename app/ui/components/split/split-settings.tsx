import { useGetTriggersQuery } from '@api/flow-api'
import { ConditionalSplitUserData } from '@core/models'
import { TextField } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { RootState } from '@ui/store'
import { useSelector } from 'react-redux'
import { selectStepById, updateStepUserData } from '../flow/flow'

type Params = {
  stepId: string
}
export const SplitSettingsComponent = ({ stepId }: Params) => {
  const dispatch = useAppDispatch()
  const step = useSelector((state: RootState) => selectStepById(state, stepId))
  if (!step) throw new Error()
  const userData = step.userData as ConditionalSplitUserData
  const updateUserData = (changes: any) =>
    dispatch(updateStepUserData(stepId, changes))

  const { data, error, isLoading } = useGetTriggersQuery()
  return <div className={"configContainer"}>
  <TextField
    label="Filter"
    variant="outlined"
    value={userData.filter}
    onChange={e => {
      updateUserData({ filter: e.target.value })
    }} />
  </div>
}