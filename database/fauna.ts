import faunadb from 'faunadb'

export const q = faunadb.query
export const client = new faunadb.Client({
	secret: process.env.FAUNADB_KEY as string
})
export const collectionName = process.env.COLLECTION_NAME as string
