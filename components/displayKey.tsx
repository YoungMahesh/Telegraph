import Router from 'next/router'

interface PropsList {
  url: string
  noteKey: string
  setMessage1: Function
}

const DisplayKey = ({ url, noteKey, setMessage1 }: PropsList) => {
  const copyKey = () => {
    navigator.clipboard.writeText(`URL: ${url}\nKey: ${noteKey}`)
    setMessage1('Copied URL and Key!')
  }

  return (
    <>
      <p id="p">{`URL: ${url}`}</p>
      <p id="p">{`Key: ${noteKey}`}</p>
      <button id="button" onClick={copyKey}>
        Copy URL and Key
      </button>

      <button id="button" onClick={() => Router.push(`/${url}`)}>
        Visit {`"${url}"`}
      </button>
    </>
  )
}

export default DisplayKey
