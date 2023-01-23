import { useEffect, useState } from "react";
import style from "../styles/form.module.css"
import MyDropzone from "./dropzone";


export const Form = ()=>{

    const [nft, setNft] = useState({
        recipient: '',
        name: '',
        image: '',
        description: ''
    })

    const [loader,setLoader] = useState(false)


    const url = 'https://staging.crossmint.com/api/2022-06-09/collections/default-solana/nfts'; 
  const createNft = (e)=>{
    e.preventDefault()
    setLoader(true)
    fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-client-secret': 'sk_test.6mcNBCN9.KBMpyauMf9YEscw8zsokUhWSpCnnenFo',
          'x-project-id': '748a2029-cfd3-46d0-a9e6-fedba7ca80a2'
        },
        body: JSON.stringify( {
              recipient: nft.recipient,
              metadata: {
                  name: nft.name,
                  image: nft.image,
                  description: nft.description
                  }
              })
      })
    .then(res => res.json())
    .then(json => {console.log(json)
    setLoader(false)})
    .catch(err => console.error('error:' + err));
}

    useEffect(()=>{
        console.log(nft)
    },[nft])

    const handleInput = (e)=>{
        setNft({...nft,[e.target.name]: e.target.value})
    }

    return (
        <main className={style.main}>
            <h1>Mint your own NFT</h1>
            <form className={style.form} onSubmit={createNft}>
                <MyDropzone></MyDropzone>
                <div className={style.containerItems}>
                    <div className={style.item}>
                        <label className={style.label} htmlFor="name">Name</label>
                        <input name="name" className={style.input} type="text"  onChange={handleInput} value={nft.name}></input>
                    </div>
                    <div className={style.item}>
                         <label className={style.label} htmlFor="name">Recipient</label>
                        <input name="recipient" className={style.input} type="text" onChange={handleInput} value={nft.recipient}></input>
                    </div>
                </div>
                <div className={style.item}>
                         <label className={style.label} htmlFor="name">Description</label>
                        <textarea name="description" className={style.textarea} type="text" onChange={handleInput} value={nft.description}></textarea>
                    </div>
                {!loader?<button type="submit" className={style.button}>Create</button>:
                    <button  className={style.buttonLoading}></button>}
            </form>
        </main>
    )
}