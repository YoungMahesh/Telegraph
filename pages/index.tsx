import Head from 'next/head'
import { useState } from 'react'
import DisplayKey from '@/components/displayKey'
import EditForm from '@/components/editForm'
import { handlePublishNote } from '@/backend/handleAPI.ts'

export default function Home() {
	// show-hide
	const [currDisplay, setCurrDisplay] = useState<string>('edit-note')
	const [message1, setMessage1] = useState<string>('')

	// data for server
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [url, setUrl] = useState<string>('')
	const [noteKey, setNoteKey] = useState<string>('')

	return (
		<div className='container'>
			<Head>
				<title>Tasks</title>
				<link rel='icon' href='/favicon.ico' />
				<meta
					property='description'
					content='Telegraph.now.sh is a minimalist publishing tool that allows you to quickly create richly formatted posts and push them to the Web in just a click. It inspired from Telegra.ph with additional feature to delete your note.'
				/>
			</Head>

			<main>
				<form
					style={currDisplay === 'edit-note' ? {} : { display: 'none' }}
				>
					<EditForm
						usingFor='create'
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						url={url}
						setUrl={setUrl}
					/>
					{
						url.length ? (
							<p>https://telegraph.now.sh/api/{url}</p>
						) : null
					}
					<input
						id='button'
						type='button'
						value='Publish'
						onClick={() =>
							handlePublishNote(
								title,
								setTitle,
								description,
								setDescription,
								url,
								setNoteKey,
								setCurrDisplay,
								setMessage1
							)
						}
					/>
				</form>

				<section
					style={currDisplay === 'display-key' ? {} : { display: 'none' }}
				>
					<DisplayKey
						url={url}
						noteKey={noteKey}
						setMessage1={setMessage1}
					/>
				</section>
				<section>
					<p id='p'>{message1}</p>
				</section>
			</main>
		</div>
	)
}
