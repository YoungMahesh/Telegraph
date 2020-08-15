import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'

interface PropsList {
	data: string
}

const GetNote = ({ data }: PropsList) => {
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [dataLoaded, setDataLoaded] = useState<boolean>(false)

	// const [message1, setMessage1] = useState<string>('Loading...')

	useEffect(() => {
		if (dataLoaded === false) {
			setDataLoaded(true)
			loadData()
		}
	}, [])

	const loadData = async () => {
		const dataObj = {
			urlName: data
		}

		const res1 = await fetch(`/api/getNote`, {
			method: 'POST',
			body: JSON.stringify(dataObj)
		})

		if (res1.status === 400) {
			return setDescription(`Keyword "${data}" is not in use`)
		}

		const res2 = await res1.json()

		const { title, description } = res2

		setTitle(title)
		setDescription(description)
	}

	return (
		<div className='container'>
			<Head>
				<title>{title}</title>
				<link rel='stylesheet' href='/styles/page.css' />
			</Head>
			<main>
				<article>
					<h1>{title}</h1>
					<p>{description}</p>
				</article>
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
