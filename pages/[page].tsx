import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import EditForm from '@/components/editForm'
import { validateData, handleUpdateNote } from '@/backend/handleAPI'
import { useRouter } from 'next/router'

interface PropsList {
	data: string
}

const GetNote = ({ data }: PropsList) => {
	// show-hide
	const [currDisplay, setCurrDisplay] = useState<string>('display-note')
	const [message1, setMessage1] = useState<string>('')
	const [dataLoaded, setDataLoaded] = useState<boolean>(false)
	const [isUrlExisted, setIsUrlExisted] = useState<boolean>(false)

	// server-data
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [url, setUrl] = useState<string>('')
	const [originalKey, setOriginalKey] = useState<string>('')
	const [userNoteKey, setUserNoteKey] = useState<string>('')

	const router = useRouter()

	useEffect(() => {
		if (dataLoaded === false) {
			setDataLoaded(true)
			loadData()
		}
	}, [])

	const loadData = async () => {
		// fetch data
		const dataObj = {
			urlName: data
		}
		const res1 = await fetch(`/api/getNote`, {
			method: 'POST',
			body: JSON.stringify(dataObj)
		})

		// check if 'page' is available ?
		if (res1.status === 400) {
			return setDescription(`Keyword "${data}" is not in use`)
		}

		// if 'page' is available, update data
		const res2 = await res1.json()
		const { id, title, description, url } = res2
		setIsUrlExisted(true)
		setTitle(title)
		setDescription(description)
		setUrl(url)
		setOriginalKey(id)
	}

	const handleEdit = () => {
		setMessage1('')
		setCurrDisplay('edit-note')
	}

	const handleVerifyKey = () => {
		setMessage1('')
		if (!validateData(title, description, url, setMessage1)) return
		setCurrDisplay('verify-key')
	}

	const handleUpdate = async () => {
		const isUpdated = await handleUpdateNote(
			title,
			description,
			originalKey,
			userNoteKey,
			setMessage1
		)
		if (isUpdated) router.reload()
	}

	return (
		<div className='container'>
			<Head>
				<title>{title}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<article
					style={currDisplay === 'display-note' ? {} : { display: 'none' }}
				>
					<h1 id='h1'>{title}</h1>
					<p id='large_p'>{description}</p>
					{isUrlExisted ? (
						<button id='button' onClick={handleEdit}>
							Edit
						</button>
					) : null}
				</article>

				<form
					style={currDisplay === 'edit-note' ? {} : { display: 'none' }}
				>
					<EditForm
						usingFor='edit'
						title={title}
						setTitle={setTitle}
						description={description}
						setDescription={setDescription}
						url={url}
						setUrl={setUrl}
					/>
					<input
						id='button'
						type='button'
						value='Update'
						onClick={handleVerifyKey}
					/>
				</form>

				<form
					style={currDisplay === 'verify-key' ? {} : { display: 'none' }}
				>
					<input
						id='p'
						type='text'
						onChange={(e) => setUserNoteKey(e.target.value)}
					/>
					<input
						id='button'
						type='button'
						value='Publish'
						onClick={() => handleUpdate()}
					/>
				</form>

				<section>
					<p id='p'>{message1}</p>
				</section>
			</main>
		</div>
	)
}

export default GetNote

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: { data: context.params.page }
	}
}
