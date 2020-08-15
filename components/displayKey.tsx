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
			<p>{`URL: ${url}`}</p>
			<p>{`Key: ${noteKey}`}</p>
			<button onClick={copyKey}>Copy</button>
		</>
	)
}

export default DisplayKey
