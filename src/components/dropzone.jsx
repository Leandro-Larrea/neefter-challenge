import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Container } from 'reactstrap'
import Dropzone from 'react-dropzone'
import { useState } from 'react'
import style from "../styles/dropzone.module.css"
import axios from 'axios'
import { useContext } from 'react'
import { ImageContext } from '../context/imageContext'
import gifLoader from "../images/loader2.gif"

export default function MyDropzone({nft}) {

  const {image, setImage} = useContext(ImageContext)
  const [loading, setLoading] = useState(false)
  console.log(image)
  const handleDrop =  (files)=>{
    const upLoaders = files.map((file) =>{
      let formData = new FormData();
      formData.append('file', file);
      formData.append('tags',`codeinfuse, medium, gist`);
      formData.append('upload_preset','imagesNFT');
      formData.append('api_key',process.env.REACT_APP_API_KEY);
      formData.append('timestamp',(Date.now()/1000) | 0);
      setLoading(true)
      return  axios.post("https://api.cloudinary.com/v1_1/dkiyjbo6u/image/upload", formData, {
          headers: {"X-Requested-With": "XMLHttpRequest"},
      })
      .then((response)=>{
        const data = response.data
        const imageUrl = data.secure_url
        setImage(imageUrl)
        console.log(imageUrl)
      })
    })
  
    axios.all(upLoaders).then(()=>{
      setLoading(false);
    })
  }

  const imagePreview = ()=> {
    return image?
      <div className={style.imageContainer}>
        <img className={style.image} src={image}></img>
      </div>:
        loading?
          <img className={style.gif} src={gifLoader}></img>:
            <p>Not image</p>
    }
  


  return(
    <div><Container>
      <h3 className='text-center'>Sube tu imagenes aqui {!nft.image && "(required)"}</h3>
          <Dropzone className={style.dropzone}
           onDrop={handleDrop}
           onChange={(e)=> setImage(e.target.value)}
          value={image}
          >
              {({getRootProps, getInputProps})=> (
                  <section>
                      <div {...getRootProps({className: style.dropzone})}>
                          <input {...getInputProps()}/>
                          <span>📂</span>
                          <p>coloca tus imagenes aqui o clickea para seleccionar</p>
                      </div>
                  </section>
              )}
          </Dropzone>
          <div className={style.loaderContainer}>
              {imagePreview()}
            </div>
        </Container>
    </div>
  )
}