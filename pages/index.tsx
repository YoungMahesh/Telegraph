import Head from 'next/head'
import { useState } from 'react'
import DisplayKey from '@/components/displayKey'
import EditForm from '@/components/editForm'
import { handlePublishNote } from '@/backend/handleAPI'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'

export default function Home() {
  // show-hide
  const [currDisplay, setCurrDisplay] = useState<string>('edit-note')
  const [message1, setMessage1] = useState<string>('')

  // data for server
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [noteKey, setNoteKey] = useState<string>('')

  return (
    <div className="container">
      <Head>
        <title>Telegraph</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="description"
          content="Telegraph.now.sh is a minimalist publishing tool that allows you to quickly create richly formatted posts and push them to the Web in just a click. It inspired from Telegra.ph with additional feature to delete your note."
        />
      </Head>

      <header>
        <h3>
          {' '}
          <a href="https://telegra.ph" target="_blank">
            Telegr.ph
          </a>{' '}
          clone
        </h3>
        <h4>
          |{' '}
          <a href="https://github.com/YoungMahesh/Telegraph" target="_blank">
            View Source
          </a>{' '}
        </h4>
      </header>

      <Container sx={{ marginTop: '20px' }}>
        <Stack
          spacing={2}
          sx={
            currDisplay === 'edit-note'
              ? { width: '100%' }
              : { display: 'none' }
          }
        >
          <EditForm
            usingFor="create"
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            url={url}
            setUrl={setUrl}
          />
          {url.length ? <p>https://telegraph.now.sh/api/{url}</p> : null}

          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
          >
            <Button
              sx={{
                border: '1px solid black',
                textTransform: 'none',
                color: 'black',
                cursor: 'pointer',
              }}
              onClick={() =>
                handlePublishNote(
                  title,
                  setTitle,
                  description,
                  setDescription,
                  url,
                  setNoteKey,
                  setCurrDisplay,
                  setMessage1
                )
              }
            >
              Publish
            </Button>
          </Box>
        </Stack>

        <section
          style={currDisplay === 'display-key' ? {} : { display: 'none' }}
        >
          <DisplayKey url={url} noteKey={noteKey} setMessage1={setMessage1} />
        </section>
        <section>
          <p id="p">{message1}</p>
        </section>
      </Container>
    </div>
  )
}
