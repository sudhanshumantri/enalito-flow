import { AppDispatch, RootState } from '@ui/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const dispatchSetSelectedStepId = (stepId: string) => dispatch(setSelectedStepId(stepId))
