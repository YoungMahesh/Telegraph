import { NextApiRequest, NextApiResponse } from 'next'
import { q, client, collectionName } from '@/database/fauna'

interface createdNote extends Object {
	ref: {
		id: string
	}
	data: Object
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('Create-Note Request: Executed')
	if (req.method === 'POST') {
		try {
			const { title, description, url } = await JSON.parse(req.body)
			const res1: createdNote = await client.query(
				q.Create(q.Collection(collectionName), {
					data: { title, description, url }
				})
			)
			console.log('Create-Note Request: Completed\n', res1)
			console.log(res1.ref.id)
			res.status(201).send({ key1: res1.ref.id })
		} catch (err) {
			console.log('Create-Note Request: Failed\n', err)
			res.status(400).send({ message: 'Error occured while creating Note' })
		}
	}
}
