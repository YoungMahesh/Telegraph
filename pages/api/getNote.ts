import { NextApiRequest, NextApiResponse } from 'next'
import { q, client, collectionIdxUrls } from '@/database/fauna'

interface getNote extends Object {
  ref: {
    id: string
  }
  ts: number
  data: {
    title: string
    description: string
    url: string
  }
}

// {
// 	ref: Ref(Collection("Telegraph"), "273906429807559173"),
// 	ts: 1597476377260000,
// 	data: {
// 	  title: 'weelky walk',
// 	  description: 'far far away from India there is country called Japan',
// 	  url: 'japan'
// 	}
//  }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Get-Note Request: Executed')
  if (req.method === 'POST') {
    try {
      const { urlName } = await JSON.parse(req.body)
      console.log('urlName: ', urlName)
      const res1: getNote = await client.query(
        q.Get(q.Match(q.Index(collectionIdxUrls), urlName))
      )
      const { ref, data } = res1
      const { id } = ref
      const { title, description, url } = data
      console.log('Get-Note Request: Completed\n', res1)
      const dataObj = {
        id,
        title,
        description,
        url,
      }
      res.status(201).send(dataObj)
    } catch (err) {
      console.log('Get-Note Request: Failed\n', err)
      res.status(400).send({ message: 'Error occured while getting Note' })
    }
  }
}
