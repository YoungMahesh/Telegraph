module.exports = {
	// this page is necessary, as it lists all the keys necessary for the project when you download project locally using `git clone`
	env: {
		FAUNADB_KEY: process.env.FAUNADB_KEY,
		COLLECTION_NAME: 'Telegraph',
		COLLECTION_IDX_URL: 'Telegraph_urls'
	}
}
