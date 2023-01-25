import axios from "axios";
import { useCallback, useContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { ImageContext, ImageProvider } from "../context/imageContext";
import { cleanProperties, generateTimestamp } from "../functions/rebuildProperties";
import style from "../styles/form.module.css"
import { CreateButton } from "./createButton";
import MyDropzone from "./dropzone";
import { GetButton } from "./getButton";

export const Form = ()=>{
    const {image, setImage} = useContext(ImageContext)
    const initialNft ={
        name: '',
        recipient: '',
        image: image,
        description: '',
        collection:"solana",
        attributes:[],
        birth:"",
        id:""}
    const [nft, setNft] = useState(initialNft)
    const [status, setStatus] = useState(false)
    const [property, setProperty] = useState({
        nftKey: '',
        nftValue: '',
    })
    const [loader,setLoader] = useState(false)

    useEffect(()=>{
        setNft({...nft, image:image })
    },[image])

    const changeStatus =(text)=>{
        setStatus(text)
    }
   
    const createNft = async(e)=>{  
        e.preventDefault()
        let newNft = nft
        if(nft.birth){
            newNft = {...newNft, attributes:[...nft.attributes,{display_type:"date",trait_type:"birthday", value: generateTimestamp(nft.birth)}], birth:""}
             console.log(newNft) 
        }
        if(!nft.image || !nft.name|| !nft.description || !nft.recipient) return alert("be sure of completing all required fields and upload and image")
        const url = `https://staging.crossmint.com/api/2022-06-09/collections/default-${nft.collection}/nfts`; 
      
    setLoader(true)
    fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          "x-client-secret": process.env.REACT_APP_CLIENT,
          'x-project-id': process.env.REACT_APP_PROJECT_ID
        },
        body: JSON.stringify( {
              recipient: "email:" + nft.recipient + ":" + nft.collection,
              metadata: {
                //   name: nft.name,
                //   image: nft.image,
                //   description: nft.description,
                //   attributes: nft
                ...cleanProperties(newNft)
                  }
              })
      })
     .then(res => res.json())
     .then(resJ => {if(resJ.id) {
                setNft({...initialNft, id: resJ.id, collection: nft.collection})
                setStatus("your nft status it's pending")
                setImage("")
                setLoader(false)
                return
            }
            setStatus("something went wrong")
            setLoader(false)
            return 
        }
    )
     .catch(error => {
        setStatus("something went wrong")
        setLoader(false)
    })          
    }

    const handleInput = (e)=>{
        const {name, value} = e.target
        if(name === "description" && value.length > 64) return
        if(name !== "description" && value.length > 64) return  
        setNft({...nft,[name]: value})
    }

    const handleProperty=(e)=>{
        const {name, value} = e.target;
        if(name === "nftKey" && value.length > 227) return
        setProperty({...property,[name]:value})
    }

    const createProperty = (e)=>{
        e.preventDefault()
        if(property.nftKey.length === 0 || property.nftValue.length === 0 ) return 
        setNft({...nft, attributes:[...nft.attributes,{trait_type: property.nftKey, value: property.nftValue}]})
        setProperty({
            nftKey: '',
            nftValue: '',
        })
    }

    return (
        <main className={style.main}>
            <h1>Mint your own NFT</h1>
            <form className={style.form} onSubmit={createNft}>
                <MyDropzone nft={nft}></MyDropzone>
                <div className={style.containerItems}>
                    <div className={style.item}>
                        <label className={style.label} htmlFor="name">Name: {!nft.name.length && "required"}</label>
                        <input name="name" id="name" required={true} className={style.input} type="text"  onChange={handleInput} value={nft.name}></input>
                    </div>
                    <div className={style.item}>
                         <label className={style.label} htmlFor="recipient">Recipient:  {!nft.recipient.length && "required"}</label>
                        <input name="recipient" id="recipient" required={true} className={style.input} type="text" onChange={handleInput} value={nft.recipient}></input>
                    </div>
                    <div className={style.item}>
                         <label className={style.label} htmlFor="collection">Collection id: {!nft.recipient.length && "required"}</label>
                        <select name="collection" id="collection" value={nft.collection} onChange={handleInput}>
                            <option>solana</option>
                            <option>polygon</option>
                        </select>
                    </div> 
                    <div className={style.item}>
                         <label className={style.label} htmlFor="birth">birth: (optionally)</label>
                        <input name="birth" id="birth" className={style.input} type="date" onChange={handleInput} value={nft.birth}></input>
                    </div>   
                </div>
                
                        <label className={style.label} htmlFor="description">Description: {!nft.description.length && "required"}</label>
                        <textarea required={true} name="description" id="description" className={style.textarea} type="text" onChange={handleInput} value={nft.description}></textarea>
                        <p className={style.textLength}>{nft.description.length}/64</p>
                
                <div className={style.containerItems}>
                    <h3 style={{width:"100%", textAlign:"center"}}>optionally you can add custom "attributes"</h3>
                    <div className={style.item}>
                        <label className={style.label} htmlFor="nftKey">key </label>
                        <input onChange={handleProperty} name="nftKey" id="nftKey" className={style.input} type="text"  value={property.nftKey}></input>
                    </div>
                    <div className={style.item}>
                         <label className={style.label} htmlFor="nftValue">value:</label>
                        <input onChange={handleProperty} name="nftValue" id="nftValue" className={style.input} type="text" value={property.nftValue}></input>
                    </div>
                   
                    <button onClick={createProperty} className={style.properties}>Add</button>
                    
                </div>
                <section className={style.nftContainer}>
                    <div className={style.nftProperties}>
                        <p className={style.nftKey}>Name: {nft.name}</p>
                        <p className={style.nftKey}>Recipient: {nft.recipient}</p>
                        <p className={style.nftKey}>Collection: {nft.collection}</p>
                        <p className={style.nftKey}>Description: {nft.description}</p>
                        {nft.birth &&  <p className={style.birth}>birthday: {nft.birth}</p>}
                        {nft.attributes?.map((e,i)=> 
                            <div style={{margin:"16px 0"}} key={i}>
                                <p>{`Attribute ${i + 1}:`}</p>
                                <p style={{color:"white"}}> {e.trait_type}: {e.value}</p>
                            </div>
                        )}
                    </div>
                    {image && <img src={image} hrf="not image"></img>}
                </section>          
                {status === "your nft status it's pending" || status === "getting hash..."?
                <GetButton status={status} id={nft.id} setStatus={changeStatus} collection={nft.collection}></GetButton>:
                <CreateButton loader={loader} ></CreateButton>}
                    {status && <p>{status}</p>}
            </form>
        </main>
    )
}