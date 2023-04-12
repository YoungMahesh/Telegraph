import { useEffect, useState } from 'react'

interface PropsList {
  url: string
  noteKey: string
  setMessage1: Function
}

const DisplayKey = ({ url, noteKey, setMessage1 }: PropsList) => {
  const [pageOrigin, setPageOrigin] = useState('')

  useEffect(() => {
    setPageOrigin(window.location.origin)
  }, [])

  const copyKey = () => {
    navigator.clipboard.writeText(`URL: ${pageOrigin}/${url}\nKey: ${noteKey}`)
    setMessage1('Copied URL and Key!')
  }

  return (
    <>
      <p id="p">{`Page URL: ${pageOrigin}/${url}`}</p>
      <p id="p">
        {`Private Key: ${noteKey}`} (needed if you want to edit or delete this
        page in future)
      </p>
      <button id="button" onClick={copyKey}>
        Copy URL and Key
      </button>

      <button
        id="button"
        onClick={() => window.open(`${pageOrigin}/${url}`, '_blank')}
      >
        Visit {`${pageOrigin}/${url}`}
      </button>
    </>
  )
}

export default DisplayKey
