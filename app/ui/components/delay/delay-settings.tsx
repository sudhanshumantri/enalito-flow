import {
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DelayUserData, Step } from '@core/models'
import { useAppDispatch } from '@ui/lib/hooks/store'
import { selectStepById, updateStep, updateStepUserData } from '../flow/flow'
import { useSelector } from 'react-redux'
import { RootState } from '@ui/store'
import { createDelayUserData } from '@core/functions/delay'

type Params = {
  stepId: string
}
export const DelaySettingsComponent = ({ stepId }: Params) => {
  const dispatch = useAppDispatch()
  const step = useSelector((state: RootState) => selectStepById(state, stepId))
  if (!step) throw new Error()
  const userData = step.userData as DelayUserData
  const updateUserData = (changes: any) =>
    dispatch(updateStepUserData(stepId, changes))

  return <div className={"configContainer"}>
    <TextField
      label="Delay"
      variant="outlined"
      type="number"
      value={userData.delay}
      onChange={e => {
        const newValue = Math.max(Number(e.target.value), 0)
        updateUserData({ delay: newValue })
      }} />
    <FormControl fullWidth>
      <InputLabel id="delay-select-label">Delay Unit</InputLabel>
      <Select
        labelId="delay-select-label"
        id="delay-select"
        value={userData.unit || 10}
        label="Delay Unit"
        onChange={e => {
          const newValue = Number(e.target.value)
          updateUserData({ unit: newValue })
        }}
      >
        <MenuItem value={10}>Days</MenuItem>
        <MenuItem value={20}>Hours</MenuItem>
        <MenuItem value={30}>Minutes</MenuItem>
      </Select>
    </FormControl>
    <FormControlLabel
      control={
        <Checkbox
          checked={userData.untilTimeOfDay}
          onChange={e => {
            const newValue = e.target.checked
            updateUserData({ untilTimeOfDay: newValue })
          }} />}
      label="Delay until a specific time of day" />
    <FormControlLabel
      control={
        <Checkbox
          checked={userData.untilDayOfWeek}
          onChange={e => {
            const newValue = e.target.checked
            updateUserData({ untilDayOfWeek: newValue })
          }} />}
      label="Delay until a specific day(s) of the week" />
  </div>
}