import Head from 'next/head'
import { useState } from 'react'
import DisplayKey from 'components/displayKey'
import CreateForm from 'components/createForm'

export default function Home() {
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [url, setUrl] = useState<string>('')
	const [noteKey, setNoteKey] = useState<string>('')

	const [currDisplay, setCurrDisplay] = useState<string>('createForm')

	const [message1, setMessage1] = useState<string>('')

	return (
		<div className='container'>
			<Head>
				<title>Tasks</title>
				<link rel='stylesheet' href='/styles/index.css' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<form
					style={currDisplay === 'createForm' ? {} : { display: 'none' }}
				>
					<CreateForm
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						url={url}
						setUrl={setUrl}
						setMessage1={setMessage1}
						setNoteKey={setNoteKey}
						setCurrDisplay={setCurrDisplay}
					/>
				</form>

				<div
					style={currDisplay === 'displayKey' ? {} : { display: 'none' }}
				>
					<DisplayKey
						url={url}
						noteKey={noteKey}
						setMessage1={setMessage1}
					/>
				</div>
				<p id='message1'>{message1}</p>
			</main>
		</div>
	)
}
