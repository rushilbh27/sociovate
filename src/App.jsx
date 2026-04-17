import React, { useState } from 'react'
import SociovateEnterpriseLanding from './SociovateEnterpriseLanding'
import SplashLoader from './SplashLoader'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <SplashLoader onDone={() => setLoading(false)} />}
      <SociovateEnterpriseLanding />
    </>
  )
}

export default App
