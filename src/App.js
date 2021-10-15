import { AmiibosStorage } from './AmiibosContext'
import AmiibosContent from './Components/AmiibosContent'

function App() {
  return (
    <>
      <AmiibosStorage>
        <AmiibosContent />
      </AmiibosStorage>
    </>
  )
}

export default App
