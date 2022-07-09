import { NextApiRequest, NextApiResponse } from 'next'
import { q, client, collectionName } from '@/database/fauna'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Delete-Note Request: Executed')
  if (req.method === 'POST') {
    try {
      const { noteKey } = await JSON.parse(req.body)
      const res1 = await client.query(
        q.Delete(q.Ref(q.Collection(collectionName), noteKey))
      )
      console.log('Delete-Note Request: Completed\n', res1)
      res.status(201).send({ message: 'Note Deleted' })
    } catch (err) {
      console.log('Delete-Note Request: Failed\n', err)
      res.status(400).send({ message: 'Error occured while deleting note' })
    }
  }
}
