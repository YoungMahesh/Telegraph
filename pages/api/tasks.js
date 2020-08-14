import faunadb, { query as q } from 'faunadb'
const client = new faunadb.Client({
	secret: process.env.FAUNADB_KEY
})

export default async (req, res) => {
	if (req.method === 'GET') {
		console.log('GET Request: Executed')
		try {
			const res1 = await client.query(
				q.Map(
					q.Paginate(q.Match(q.Index('all_Tasks'))),
					q.Lambda('X', q.Get(q.Var('X')))
				)
			)

			console.log('GET Requst: Completed')
			res.status(200).send(res1.data)
		} catch (err) {
			console.log('GET Request: Failed\n', err)
			res.status(400).send({ message: 'Get Request Error' })
		}
	}
}
