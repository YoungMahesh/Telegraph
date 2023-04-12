import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import EditForm from '@/components/editForm'
import {
  validateData,
  handleUpdateNote,
  handleDeleteNote,
} from '@/backend/handleAPI'
import { useRouter } from 'next/router'

interface PropsList {
  data: {
    page: string
  }
}

const GetNote = ({ data }: PropsList) => {
  // show-hide
  const [currDisplay, setCurrDisplay] = useState<string>('display-note')
  const [message1, setMessage1] = useState<string>('')
  const [dataLoaded, setDataLoaded] = useState<boolean>(false)
  const [isUrlExisted, setIsUrlExisted] = useState<boolean>(false)

  // server-data
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [originalKey, setOriginalKey] = useState<string>('')
  const [userNoteKey, setUserNoteKey] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    if (dataLoaded === false) {
      setDataLoaded(true)
      loadData()
    }
  }, [])

  const loadData = async () => {
    // fetch data
    const dataObj = {
      urlName: data.page,
    }
    const res1 = await fetch(`/api/getNote`, {
      method: 'POST',
      body: JSON.stringify(dataObj),
    })

    // check if 'page' is available ?
    if (res1.status === 400) {
      return setDescription(`Page with this url does not exist`)
    }

    // if 'page' is available, update data
    const res2 = await res1.json()
    const { id, title, description, url } = res2
    setIsUrlExisted(true)
    setTitle(title)
    setDescription(description)
    setUrl(url)
    setOriginalKey(id)
  }

  const goToEditPage = () => {
    setMessage1('')
    setCurrDisplay('edit-note')
  }

  const modifyText = (isUpdate: boolean) => {
    setMessage1('')
    if (isUpdate) {
      if (!validateData(title, url, setMessage1)) return
      setCurrDisplay('update-note')
    } else {
      setCurrDisplay('delete-note')
    }
  }

  const modifyAPI = async (isUpdate: boolean) => {
    if (originalKey !== userNoteKey) {
      return setMessage1('This Private Key is wrong, try again')
    }
    let isModified = false
    if (isUpdate) {
      isModified = await handleUpdateNote(
        title,
        description,
        originalKey,
        setMessage1
      )
    } else {
      isModified = await handleDeleteNote(originalKey, setMessage1)
    }
    if (isModified) router.reload()
  }

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <article
          style={currDisplay === 'display-note' ? {} : { display: 'none' }}
        >
          <h1 id="h1">{title}</h1>
          <p id="large_p" style={{ whiteSpace: 'pre-wrap' }}>
            {/* 'pre-wrap will recognize \n & \t */}
            {description}
          </p>
          {isUrlExisted ? (
            <button id="button" onClick={goToEditPage}>
              Edit
            </button>
          ) : null}
        </article>

        <form style={currDisplay === 'edit-note' ? {} : { display: 'none' }}>
          <EditForm
            usingFor="edit"
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            url={url}
            setUrl={setUrl}
          />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <input
              id="button"
              type="button"
              value="Update"
              onClick={() => modifyText(true)}
            />
            <input
              id="button"
              type="button"
              value="Delete"
              onClick={() => modifyText(false)}
            />
          </div>
        </form>

        <form
          style={
            currDisplay === 'update-note' || currDisplay === 'delete-note'
              ? {}
              : { display: 'none' }
          }
        >
          <input
            id="p"
            type="text"
            placeholder="Private Key"
            onChange={(e) => setUserNoteKey(e.target.value)}
          />
          {currDisplay === 'update-note' ? (
            <input
              id="button"
              type="button"
              value="Publish"
              onClick={() => modifyAPI(true)}
            />
          ) : (
            <input
              id="button"
              type="button"
              value="Delete"
              onClick={() => modifyAPI(false)}
            />
          )}
        </form>

        <section>
          <p id="p">{message1}</p>
        </section>
      </main>
    </div>
  )
}

export default GetNote

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: { data: params },
  }
}
