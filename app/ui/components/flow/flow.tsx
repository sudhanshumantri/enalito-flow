import { hasResponseData, useAddFlowMutation, useGetFlowDetailQuery, useUpdateFlowMutation } from '@api/flow-api'
import { createStep, isStep, normalizeStepComponents } from '@core/functions/flow'
import { findConditionalSplit } from '@core/functions/split'
import { createTrigger } from '@core/functions/trigger'
import { Step, StepUserData } from '@core/models'
import { Button, Drawer } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createEntityAdapter, createSlice, PayloadAction, Update } from '@reduxjs/toolkit'
import { DraggedItemInfo, DroppedItemInfo, isDraggedInstrument, isDraggedStep } from '@ui/lib/dnd'
import { useAppDispatch, useAppSelector } from '@ui/lib/hooks/store'
import { RootState } from '@ui/store'
import { nanoid } from 'nanoid'
import { ReactElement, ReactFragment, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import { DelayComponent } from '../delay/delay'
import { EmailComponent } from '../email/email'
import { InstrumentPanel } from '../instrument-panel/instrument-panel'
import { SplitComponent } from '../split/split'
import { TriggerComponent } from '../trigger/trigger'
import { FlowToolPanel } from './flow-tool-panel'
import styles from '../../../../src/styles/flow.module.scss'
import { createFlowTheme } from './theme'
import { useRouter } from 'next/router'
import Head from 'next/head'

const stepAdapter = createEntityAdapter<Step>({
  selectId: step => step.stepId,
  sortComparer: (a, b) => a.stepId.localeCompare(b.stepId),
})
export const stepSlice = createSlice({
  name: 'steps',
  initialState: stepAdapter.getInitialState({
    selectedStepId: '',
  }),
  reducers: {
    removeStep: stepAdapter.removeOne,
    addStep: stepAdapter.addOne,
    upsertStep: stepAdapter.upsertOne,
    updateStep: stepAdapter.updateOne,
    setAllSteps: stepAdapter.setAll,
    addSteps: stepAdapter.addMany,
    updateStepUserData: {
      reducer: (state, action: PayloadAction<{ stepId: string, userDataChanges: Update<StepUserData> }>) => {
        const { stepId, userDataChanges } = action.payload
        const step = state.entities[stepId]
        if (!step || !step.userData) throw new Error('No step or user data')

        step.userData = {
          ...step.userData,
          ...userDataChanges
        }
      },
      prepare: (stepId: string, userDataChanges: Update<StepUserData>) => ({
        payload: {
          stepId,
          userDataChanges,
        },
      }),
    },
    removeStepAndRerootChild: {
      reducer: (state, action: PayloadAction<string>) => {
        const stepId = action.payload
        const stepProxies = Object.values(state.entities)
        if (!stepProxies) throw new Error('No steps')

        const item = state.entities[stepId]
        if (!item) {
          throw new Error('Step not found')
        }
        const itemChild = stepProxies.find(x => x?.parentId === stepId)
        if (itemChild) {
          itemChild.parentId = item.parentId
        }
        stepAdapter.removeOne(state, stepId)
      },
      prepare: (stepId: string) => ({ payload: stepId }),
    },
    removeStepAndAllChildren: {
      reducer: (state, action: PayloadAction<string>) => {
        const stepId = action.payload
        const currentStep = state.entities[stepId]
        const steps = Object.values(state.entities).filter(isStep)
        const stepIdsToDelete = getStepDataTreeFlat(steps, currentStep).map(x => x.stepId)
        stepAdapter.removeMany(state, stepIdsToDelete)
      },
      prepare: (stepId: string) => ({ payload: stepId }),
    },
    setSelectedStepId: {
      reducer: (state, action: PayloadAction<string>) => {
        state.selectedStepId = action.payload
      },
      prepare: (stepId: string) => ({ payload: stepId }),
    },
    dropStep: {
      reducer: (state, action: PayloadAction<DroppedItemInfo>) => {
        const { draggedItem, parentId } = action.payload
        const stepProxies = Object.values(state.entities)
        if (!stepProxies) throw new Error('No steps')

        const draggedInstrument = isDraggedInstrument(draggedItem) ? draggedItem : undefined
        if (draggedInstrument) {
          const newStep = createStep(draggedInstrument.instrumentType, parentId)
          const dropItemChild = stepProxies.find(x => x?.parentId === parentId)
          if (dropItemChild) {
            dropItemChild.parentId = newStep.terminalParentId
          }
          stepAdapter.addMany(state, newStep.values)
        }

        const draggedStepInfo = isDraggedStep(draggedItem) ? draggedItem : undefined
        if (draggedStepInfo) {
          const draggedItem = stepProxies.find(x => x?.stepId === draggedStepInfo.stepId)
          if (!draggedItem) {
            throw new Error('Dragged step not found')
          }
          const draggedItemChild = stepProxies.find(x => x?.parentId === draggedItem.stepId)
          const dropItemChild = stepProxies.find(x => x?.parentId === parentId)
          if (dropItemChild) {
            dropItemChild.parentId = draggedItem.stepId
          }
          if (draggedItemChild) {
            draggedItemChild.parentId = draggedItem.parentId
          }
          draggedItem.parentId = parentId
        }

      },
      prepare: (draggedItem: DraggedItemInfo, parentId: string) => ({
        payload: { draggedItem, parentId }
      })
    }
  },
})


export const {
  removeStep,
  addStep,
  upsertStep,
  updateStep,
  setAllSteps,
  addSteps,
  dropStep,
  setSelectedStepId,
  removeStepAndRerootChild,
  updateStepUserData,
  removeStepAndAllChildren,
} = stepSlice.actions


export const {
  selectAll: selectSteps,
  selectById: selectStepById

} = stepAdapter.getSelectors((state: RootState) => state.steps)

export const getCardFromStep = (step: Step): ReactElement => {
  switch (step.instrumentType) {
    case 'trigger':
      return <TriggerComponent key={step.stepId} step={step} />
    case 'email':
      return <EmailComponent key={step.stepId} step={step} />
    case 'delay':
      return <DelayComponent key={step.stepId} step={step} />
    default:
      throw new Error('Unknown instrument type')
  }
}

const getStepDataTreeFlat = (
  allSteps: Step[],
  currentStep?: Step
): Step[] => {
  if (!currentStep) return []

  const directChildren = allSteps.filter(x => x.parentId === currentStep.stepId)
  if (directChildren) {
    const childTree = directChildren.flatMap(x => getStepDataTreeFlat(allSteps, x))
    return [currentStep, ...childTree]
  }
  return [currentStep]
}

const getStepVisualTree = (
  allSteps: Step[],
  currentStep?: Step
): ReactFragment => {
  const step = currentStep || allSteps.find(x => !x?.parentId) // TODO: enforce single
  if (!step) return <></>

  const childStep = allSteps.find(x => x.parentId === step.stepId)

  if (step.instrumentType === 'conditional-split') {
    const split = findConditionalSplit(step, allSteps)

    const yesChildStep = allSteps.find(x => x.parentId === split.yesStep.stepId)
    const noChildStep = allSteps.find(x => x.parentId === split.noStep.stepId)

    const yesCardTree = yesChildStep && getStepVisualTree(allSteps, yesChildStep)
    const noCardTree = noChildStep && getStepVisualTree(allSteps, noChildStep)

    return <SplitComponent
      key={step.stepId}
      yesStepId={split.yesStep.stepId}
      noStepId={split.noStep.stepId}
      splitStep={step}
      yesTree={yesCardTree}
      noTree={noCardTree}
    />
  }

  return <>
    {getCardFromStep(step)}
    {childStep && getStepVisualTree(allSteps, childStep)}
  </>
}

type Params = {
  flowId: string | undefined
}
export const Flow = ({ flowId }: Params) => {
  const router = useRouter()
  const selectedStep = useSelector((state: RootState) =>
    selectStepById(state, state.steps.selectedStepId)
  )
  const [addFlowApi] = useAddFlowMutation()
  const [updateFlowApi] = useUpdateFlowMutation()
  const { data, error, isLoading } = useGetFlowDetailQuery(flowId ?? '', { skip: !flowId })

  const steps = useAppSelector(selectSteps)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!flowId) {
      const trigger = createTrigger()
      const [triggerStep] = trigger.values
      dispatch(setAllSteps([triggerStep]))
      dispatch(setSelectedStepId(triggerStep.stepId))
    }
  }, [flowId])

  useEffect(() => {
    if (isLoading) {
    }
    if (data) {
      const normalizeSteps = normalizeStepComponents(data.steps)
      dispatch(setAllSteps(normalizeSteps))
    }
    else if (error) {
      console.error(error)
      throw new Error('Flow not fetched. ' + (error as any).error)
    }
  }, [data, error, isLoading])

  const theme = createFlowTheme(styles)

  const saveFlow = async () => {
    if (!flowId) {
      const name = nanoid()
      const addedFlow = await addFlowApi({
        name,
        tags: '',
        description: '',
        steps,
      })
      if (hasResponseData(addedFlow)) {
        if (addedFlow.data.code !== 1) {
          throw new Error('Flow not saved. ' + addedFlow.data.message)
        }
        router.push('/flow/' + addedFlow.data._id)
      }
      else {
        throw new Error('Flow not saved. ' + addedFlow.error)
      }
    }
    else {
      const updatedFlow = await updateFlowApi({ flowId, steps })
      if (hasResponseData(updatedFlow)) {
        if (updatedFlow.data.code !== 1) {
          throw new Error('Flow not saved. ' + updatedFlow.data.message)
        }
      }
      else {
        throw new Error('Flow not saved. ' + updatedFlow.error)
      }
    }
  }

  return <ThemeProvider theme={theme}>
    <Head>
      <title>Enalito Flow</title>
      <meta name="description" content="Enalito Flow" />
    </Head>
    <DndProvider backend={HTML5Backend}>
      <div className={"row"}>
        <Drawer
          sx={{
            width: 300,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 300,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={true}
        >
          {selectedStep
            ? <FlowToolPanel stepId={selectedStep.stepId} />
            : <InstrumentPanel />
          }
          <Button onClick={saveFlow} variant="contained">Save</Button>
        </Drawer>

        <div className={"canvas"}>
          {isLoading ? '. . .' : error ? `Error. ${(error as any).error}` : getStepVisualTree(steps)}
        </div>

      </div>
    </DndProvider>
  </ThemeProvider>
}
