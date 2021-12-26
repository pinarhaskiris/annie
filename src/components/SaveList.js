import React, { useEffect, useState } from 'react'

export const SaveList: React.FC = ({list}) => {
  // set up local state for generating the download link
  const [downloadLink, setDownloadLink] = useState('')

  // function for generating file and set download link
  const makeTextFile = () => {
    // This creates the file. 
    // In my case, I have an array, and each item in 
    // the array should be on a new line, which is why
    // I use .join('\n') here.
    const data = new Blob([list.join('\n')], { type: 'text/plain' })

    // this part avoids memory leaks
    if (downloadLink !== '') window.URL.revokeObjectURL(downloadLink)

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data))
  }

  // Call the function if list changes
  useEffect(() => {
    makeTextFile()
  }, [list])

  return (
    <a id="exportLink"
      // this attribute sets the filename
      download='annotations.txt'
      // link to the download URL
      href={downloadLink}
    >
      Export
    </a>
  )
}

export default SaveList