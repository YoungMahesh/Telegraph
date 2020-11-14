export const validateData = (
	title: string,
	url: string,
	setMessage1: Function
) => {
	if (
		title.length < 3 ||
		url.length < 3 ||
		title.length > 50 ||
		url.length > 50
	) {
		setMessage1(
			'Title, Description and URL each should be between 3 to 50 characters'
		)
		return false
	}
	return true
}

export const handlePublishNote = async (
	title: string,
	setTitle: Function,
	description: string,
	setDescription: Function,
	url: string,
	setNoteKey: Function,
	setCurrDisplay: Function,
	setMessage1: Function
) => {
	// 1. validate data
	setMessage1('Loading...')
	title = title.trim()
	description = description.trim()
	url = url.trim()
	if (!validateData(title, url, setMessage1)) return

	// 2. send data to database
	const dataObj = {
		title: title,
		description: description,
		url: url
	}
	const res1 = await fetch(`/api/createNote`, {
		method: 'POST',
		body: JSON.stringify(dataObj)
	})

	// 3. if connection problem, display notice
	if (res1.status === 400) {
		return setMessage1('URL is already in use.')
	}

	// 4. On successfull connection, provide 'Key'
	const res2 = await res1.json()
	setNoteKey(res2.key1)
	setTitle('')
	setDescription('')
	setMessage1('')
	setCurrDisplay('display-key')
}

export const handleUpdateNote = async (
	title: string,
	description: string,
	originalKey: string,
	setMessage1: Function
) => {
	// 1. check if 'key' matches with 'url'
	setMessage1('Loading...')
	title = title.trim()
	description = description.trim()

	const dataObj = {
		title: title,
		description: description,
		noteKey: originalKey
	}
	const res1 = await fetch(`/api/updateNote`, {
		method: 'POST',
		body: JSON.stringify(dataObj)
	})

	// 2. if not matched, display-notice
	if (res1.status === 400) {
		setMessage1(`Problem with Server`)
		return false
	}
	return true
}

export const handleDeleteNote = async (
	originalKey: string,
	setMessage1: Function
) => {
	setMessage1('Loading...')
	const dataObj = {
		noteKey: originalKey
	}
	const res1 = await fetch(`/api/deleteNote`, {
		method: 'POST',
		body: JSON.stringify(dataObj)
	})

	if (res1.status === 400) {
		setMessage1(`Problem with Server`)
		return false
	}
	return true
}
