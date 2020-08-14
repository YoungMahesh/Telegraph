import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
	const [tasksArr, setTasksArr] = useState([])
	const [dataLoaded, setDataLoaded] = useState(false)

	useEffect(() => {
		if (dataLoaded === false) {
			loadData()
		}
	}, [tasksArr])

	const loadData = async () => {
		const res1 = await fetch(`/api/tasks`)
		if (res1.status === 400) {
			console.log('Error ocuured')
		}
		const res2 = await res1.json()
		setDataLoaded(true)
		setTasksArr(res2)
		console.log(res2)
	}

	return (
		<div className='container'>
			<Head>
				<title>Tasks</title>
				<link rel='stylesheet' href='/styles/index.css' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<div>
					<h1>Space for Title</h1>
				</div>

				<div className='tasks'>
					{tasksArr.map((el, idx) => (
						<div key={idx} className='task'>
							<h3>{el.data.title}</h3>
							<h4>{`${
								el.data.completed ? 'completed' : 'not-complted'
							}`}</h4>
						</div>
					))}
				</div>
			</main>
		</div>
	)
}
