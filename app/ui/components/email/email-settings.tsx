import { createEmailUserData } from '@core/functions/email'
import { EmailUserData } from '@core/models'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { RootState } from '@ui/store'
import { useSelector } from 'react-redux'
import { selectStepById, updateStepUserData } from '../flow/flow'
type Params = {
  stepId: string
}
export const EmailSettingsComponent = ({ stepId }: Params) => {

  const step = useSelector((state: RootState) =>
    selectStepById(state, stepId)
  )

  if (!step) {
    throw new Error()
  }

  const userData = step.userData as EmailUserData ?? createEmailUserData()

  const dispatch = useAppDispatch()

  const updateUserData = (changes: any) => {

    dispatch(updateStepUserData(stepId, changes))
  }

  const templates = [
    { label: 'Lorem', value: 'lorem' },
    { label: 'Ipsum', value: 'ipsum' },
    { label: 'Dolor', value: 'dolor' },
    { label: 'Sit', value: 'sit' },
    { label: 'Amet', value: 'amet' },
  ]

  return <div className={"configContainer"}>
    <TextField
      label="Sender Name"
      variant="outlined"
      value={userData.senderName}
      onChange={e => updateUserData({ senderName: e.target.value })} />
    <TextField
      label="Sender Email"
      variant="outlined"
      value={userData.senderEmail}
      onChange={e => updateUserData({ senderEmail: e.target.value })} />
    <TextField
      label="Subject"
      variant="outlined"
      value={userData.subject}
      onChange={e => updateUserData({ subject: e.target.value })} />
    <TextField
      label="Preview Text"
      variant="outlined"
      value={userData.preview}
      onChange={e => updateUserData({ preview: e.target.value })} />

    <FormControl fullWidth>
      <InputLabel id="template-select-label">Template</InputLabel>
      <Select
        labelId="template-select-label"
        id="template-select"
        label="Template"
        value={userData.template}
        onChange={e => updateUserData({ template: e.target.value })}
      >
        {templates.map(x =>
          <MenuItem
            key={x.value}
            value={x.value}
          >
            {x.label}
          </MenuItem>)
        }
      </Select>
    </FormControl>

    <TextField
      label="UTM Capmaign Parameter"
      variant="outlined"
      value={userData.utm}
      onChange={e => updateUserData({ utm: e.target.value })} />
  </div>
}