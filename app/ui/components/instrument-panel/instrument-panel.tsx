import { draggableInstrumentTypes } from '@core/models'
import { Button } from '@mui/material'
import { InstrumentComponent } from '../instrument/instrument'

export const InstrumentPanel = () => {
  return <>
    <Button href="/" variant="outlined">Home</Button>

    <div className={"instrumentPanelContainer"}>
      {draggableInstrumentTypes
        .map(x =>
          <InstrumentComponent
            key={x}
            instrumentType={x} />)}
    </div>
  </>
}
