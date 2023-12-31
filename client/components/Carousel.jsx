import React from 'react'
import { CredentialsContext, FLASK_URL } from './App'
import emptyImg from '../../server/resources/nullImg.jpg'

const stockImgStyle = {
  position: 'relative',
  border: 'solid 6px',
  margin: '6px',
  borderRadius: '20%',
  cursor: 'pointer',
  height: '400px',
  padding: '6px'
}

export default function Carousel(props) {
  const {uName, loggedIn} = React.useContext(CredentialsContext)
  const {imageList, imType} = props
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselElement1 = React.useRef(null)
  const carouselElement2 = React.useRef(null)
  const carouselElement3 = React.useRef(null)

  //increment button
  const incrementCarousel = (e) => {
    setCurrentIndex(() => ((currentIndex + 1 ) % imageList.length))
  }
  //decrement button
  const decrementCarousel = (e) => {
    setCurrentIndex(() => ((currentIndex - 1 ) % imageList.length))
  }

  //when the mouse enters the image it highlights
  function mouseEntered(e) {
    e.target.style.background = 'grey'
    e.target.style.color = 'white'
  }

  //when the mouse leaves, it reverts to the original colors
  function mouseLeft(e) {
    e.target.style.background = 'white'
    e.target.style.color = 'black'
  }

  //called when the image is deleted
  async function deleteImage(imgSrc) {
    //a regex picking up the actual link of the image and not the full aws path
    let srcLink = String(imgSrc).match(/amazonaws\.com\/([\w]+)?\/(OrigImg)?(EncryptedImg)?\/(?<newLink>[\d\w.]+)\?(X-Amz)/ms)
    //datastring is the key in the form of userName/imageType(OrigImg/EncryptedImg)/link
    const dataString = `${uName[0]}/${imType}/${srcLink.groups.newLink}`
    //creating the formData required by AWS to find the right image by providing the constructed key and sending the AWS bucket to search
    let result = new FormData();
    result.append(
      'Bucket',
      'stegosaurus'
    )
    result.append(
      'Key',
      dataString
    )
    requestOptions = {
      method: 'POST',
      body: result
    }
    try {
      //fetch request to delete
      const post_result = await fetch(FLASK_URL + 'user/delete/image/', requestOptions)
      .then((response)=>(response.json()))


    validateImg()
    }
    catch(e) {
      console.error(e)
      console.error("Failed to delete image via fetch: either it does not exist or incorrect data was submitted")
    }

  }

  //checks if the image is loaded and if so changes it from the null default image to the correct image on load
  //The onLoad() calls this
  function validateImg(img, reffed) {
    if (img) {
      reffed.current.src=img
    }
  }

  return(
    <div style={{display: 'flex', height: '400px', margin: '20px', padding: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <label>
        <button style={{display: 'none'}} onClick={(e)=>decrementCarousel(e)}/>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
        </svg>
      </label>
      {/*Carousel is constructed in three sections aside from the decrement and increment buttons on either side */}
      <div id="carousel"
        style={{display: 'flex', alignItems: 'center'}}>
        {/*Image One */}
        <label>
          <img ref={carouselElement1} key={(currentIndex) % imageList.length} style={stockImgStyle}
            src={emptyImg}
            alt={`Slide ${currentIndex}`}
            className='img-fluid'
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}
            id='1'
            onLoad={()=>{
              validateImg(imageList[currentIndex % imageList.length], carouselElement1)}
            }
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={()=>{deleteImage(imageList[currentIndex % imageList.length])}} /*style={{position: 'relative', top: '-150px', left: '-70px'}}*/ fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>
        </label>
        {/*Image Two */}
        <label>
          <img ref={carouselElement2} key={currentIndex} style={stockImgStyle}
            src={emptyImg}
            alt={`Slide ${currentIndex + 1}`}
            className='img-fluid'
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}
            id='2'
            onLoad={()=>{
              validateImg(imageList[currentIndex % imageList.length + 1], carouselElement2)}
            }
          />
          {loggedIn[0] ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={()=>{deleteImage(imageList[currentIndex % imageList.length + 1])}} /*style={{position: 'relative', top: '-150px', left: '-70px'}}*/ fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg>: ''}
        </label>
        {/*Image Three */}
        <label>
          <img ref={carouselElement3} key={(currentIndex+1) % imageList.length} style={stockImgStyle}
            src={emptyImg}
            alt={`Slide ${currentIndex + 2}`}
            className='img-fluid'
            onMouseEnter={(e)=>{mouseEntered(e)}}
            onMouseLeave={(e)=>{mouseLeft(e)}}
            id='3'
            onLoad={()=>{
              validateImg(imageList[currentIndex % imageList.length + 2], carouselElement3)}
            }
          />
          {loggedIn[0] ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={()=>{deleteImage(imageList[currentIndex % imageList.length + 2])}} /*style={{position: 'relative', top: '-150px', left: '-70px'}}*/ fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
          </svg> : console.error[loggedIn[0]]}
        </label>
      </div>
      <label>
        <button style={{display: 'none'}} onClick={(e)=>incrementCarousel(e)}/>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
        </svg>
      </label>
    </div>
  )
}
