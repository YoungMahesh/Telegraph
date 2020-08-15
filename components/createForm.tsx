interface PropsList {
	title: string
	setTitle: Function
	description: string
	setDescription: Function
	url: string
	setUrl: Function
	setMessage1: Function
	setNoteKey: Function
	setCurrDisplay: Function
}

const CreateForm = ({
	title,
	setTitle,
	description,
	setDescription,
	url,
	setUrl,
	setMessage1,
	setNoteKey,
	setCurrDisplay
}: PropsList) => {
	const handleOnPublish = async () => {
		setMessage1('')

		if (title.length === 0 && description.length === 0) {
			return setMessage1('Content is Empty')
		}

		if (url.length < 3) {
			return setMessage1('URL should have atleast 3-characters')
		}

		const dataObj = {
			title: title,
			description: description,
			url: url
		}

		const res1 = await fetch(`/api/createNote`, {
			method: 'POST',
			body: JSON.stringify(dataObj)
		})

		if (res1.status === 400) {
			return setMessage1('Unable to connect with server')
		}
		const res2 = await res1.json()
		setNoteKey(res2.key1)
		setTitle('')
		setDescription('')
		setCurrDisplay('displayKey')
	}

	return (
		<>
			<input
				id='title1'
				type='text'
				placeholder='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				id='description1'
				placeholder='Write your story'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			></textarea>
			<input
				id='url1'
				type='text'
				placeholder='desired url'
				value={url}
				onChange={(e) => setUrl(e.target.value)}
			/>
			<input
				id='button1'
				type='button'
				value='Publish'
				onClick={handleOnPublish}
			/>
		</>
	)
}

export default CreateForm
