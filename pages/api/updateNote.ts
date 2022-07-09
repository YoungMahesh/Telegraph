import { NextApiRequest, NextApiResponse } from 'next'
import { q, client, collectionName } from '@/database/fauna'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Update-Note Request: Executed')
  if (req.method === 'POST') {
    try {
      const { title, description, noteKey } = await JSON.parse(req.body)
      const res1 = await client.query(
        q.Update(q.Ref(q.Collection(collectionName), noteKey), {
          data: { title, description },
        })
      )
      console.log('Update-Note Request: Completed\n', res1)
      res.status(201).send({ message: 'Note Updated' })
    } catch (err) {
      console.log('Update-Note Request: Failed\n', err)
      res.status(400).send({ message: 'Error occured while updating Note' })
    }
  }
}
