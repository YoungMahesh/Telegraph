import { NextApiRequest, NextApiResponse } from 'next'
import { q, client, collectionName } from '@/database/fauna'

interface getNote extends Object {
	ref: Object
	ts: number
	data: Object
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('Get-Note Request: Executed')
	if (req.method === 'POST') {
		try {
			const { urlName } = await JSON.parse(req.body)
			console.log('urlName: ', urlName)
			const res1: getNote = await client.query(
				q.Get(q.Match(q.Index('Telegraph_urls'), urlName))
			)

			console.log('Get-Note Request: Completed\n', res1)
			res.status(201).send(res1.data)
		} catch (err) {
			console.log('Get-Note Request: Failed\n', err)
			res.status(400).send({ message: 'Error occured while getting Note' })
		}
	}
}
