import React from 'react'

export default function Error() {

  document.title = `#404 | ${process.env.REACT_APP_NAME}`

  return (
    <div>
      <h1 className='text-center'>#404: Page not found!</h1>
    </div>
  )
}
