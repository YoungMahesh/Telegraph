interface PropsList {
	usingFor: string
	title: string
	setTitle: Function
	description: string
	setDescription: Function
	url: string
	setUrl: Function
}

const EditForm = ({
	usingFor,
	title,
	setTitle,
	description,
	setDescription,
	url,
	setUrl
}: PropsList) => {
	return (
		<>
			<input
				id='h1'
				type='text'
				placeholder='Title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				id='large_p'
				placeholder='Write your story'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			></textarea>
			{usingFor === 'create' ? (
				<input
					id='p'
					type='text'
					placeholder='desired url'
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			) : null}
		</>
	)
}

export default EditForm
