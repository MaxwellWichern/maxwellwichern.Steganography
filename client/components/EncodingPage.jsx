import React from 'react'
import MyDropzone from './MyDropzone'
import StockImgModal from './StockImgModal'
import { deleteSomething } from '../routeToServer'
import { getSomething } from '../routeToServer'
import { addSomething } from '../routeToServer'
import { CredentialsContext } from './App'

const styling = {
  display: 'flex',
  alignItems: 'center'
}

const textStyles = {
  width: '100%',
  height: '200px'
}


export default function EncodingPage(props) {
  const {uName} = React.useContext(CredentialsContext)
  const [imageSelect, setImageSelect] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)

  const [originalImage, setOriginalImage] = React.useState({
    picAsFile: null,
    preview: null
  })

  const [hiddenImage, setHiddenImage] = React.useState({
    picAsFile: null,
    preview: null
  })

  const [hiddenText, setHiddenText] = React.useState(null)

  const [outputImage, setOutPutImage] = React.useState(null)

  const onSubmission = async (e) => {
    e.preventDefault()
    let result = new FormData();
    result.append(
      "file",
      originalImage.picAsFile
    )
    result.append("preview", originalImage.preview)

    if (imageSelect)
      result.append("Hidden", hiddenImage.picAsFile)
    else
      result.append("Hidden", hiddenText)

    result.append("User", uName[0])

    //Send image data to python here
    const requestOptions = {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data' },
      body: result
    };
    const post_result = await fetch('http://localhost:8000/user/encode/image/', requestOptions)
    .then(response => response.json())

    setOutPutImage(await post_result.imgLink)

    console.log(result)
    for (const data of result) {
      console.log(data)
    }
  }

  return(
    <>
      <h2>Encode your image!</h2>
      <div style={styling}>
        <div style={{display:'flex'}}>
          <MyDropzone imageFile={originalImage} setImageFile={setOriginalImage} purpose='Use This Image To Hide'/>
          <svg onClick={()=>{setShowModal(true)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg>
          <StockImgModal
            open={showModal}
            onClose={()=>{setShowModal(false)}}
            passImage={originalImage}
            passSetImage={setOriginalImage}
          />
        </div>
        <form name="inputForm"  onSubmit={onSubmission}>
          {!imageSelect && <label htmlFor="hiddenTextField" id="hiddenTextContainer">
            <input style={textStyles} onChange={(e) => {setHiddenText(e.target.value)}} type="text" name='inputForm' id="hiddenTextField"/>
          </label>}
          {imageSelect && <MyDropzone imageFile={hiddenImage} setImageFile={setHiddenImage} purpose='Hide This Image'/>}
          <label>
            <input style={{ display: "none" }} type='submit' value="Submit"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
            <div>
            <input type="radio" name="messageType" value="image" onClick={()=>{setImageSelect(true)}}/>
            <input type="radio" name="messageType" value="text" onClick={()=>{setImageSelect(false)}}/>
          </div>
          </label>
        </form>


        <img id='outputEncoded' style={{width: '400px', height: '200px', background: 'grey', border: 'solid 1px', borderRadius: '15%'}} src={outputImage}/>
        <label>
        <a download='#' href='#' title='downloadEncoded'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>
        </a>
        </label>

      </div>
    </>
  )
}
