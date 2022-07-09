import TextField from '@mui/material/TextField'

interface PropsList {
  usingFor: string
  title: string
  setTitle: Function
  description: string
  setDescription: Function
  url: string
  setUrl: Function
}

const EditForm = ({
  usingFor,
  title,
  setTitle,
  description,
  setDescription,
  url,
  setUrl,
}: PropsList) => {
  return (
    <>
      <TextField
        fullWidth
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        fullWidth
        multiline
        rows={8}
        placeholder="Write your story"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {usingFor === 'create' ? (
        <TextField
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="desired url"
        />
      ) : null}
    </>
  )
}

export default EditForm
