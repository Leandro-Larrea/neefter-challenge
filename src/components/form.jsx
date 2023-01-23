import { useEffect, useState } from "react";
import style from "../styles/form.module.css"
import MyDropzone from "./dropzone";


export const Form = ()=>{

    const [nft, setNft] = useState({    
        name: '',
        recipient: '',
        image: '',
        description: '',
        collection:"solana",
        attributes:[]
    })

    const [property, setProperty] = useState({
        nftKey: '',
        nftValue: '',
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
              recipient: "email:" + nft.recipient + ":" + nft.collection,
              metadata: {
                  name: nft.name,
                  image: "https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
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
        const {name, value} = e.target
        console.log("name:",name, "value:",value)
        if(name === "description" && value.length > 300) return
        if(name !== "description" && value.length > 100) return  
        setNft({...nft,[name]: value})
    }

    const handleProperty=(e)=>{
        const {name, value} = e.target
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

     function handleFileInputChange(e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]) 
        reader.onloadend =  () => {
          setNft({...nft, [e.target.name]: reader.result})
        }    
    }

    return (
        <main className={style.main}>
            <h1>Mint your own NFT</h1>
            <form className={style.form} onSubmit={createNft}>
                {/* <MyDropzone></MyDropzone> */}
                <div className={style.containerItems}>
                <div className={style.item}>
                        <label className={style.label} htmlFor="image">image: {!nft.image.length && "required"}</label>
                        <input name="image" className={style.input} type="file"  onChange={handleFileInputChange}></input>
                    </div>
                    <div className={style.item}>
                        <label className={style.label} htmlFor="name">Name: {!nft.name.length && "required"}</label>
                        <input name="name" className={style.input} type="text"  onChange={handleInput} value={nft.name}></input>
                    </div>
                    <div className={style.item}>
                         <label className={style.label} htmlFor="recipient">Recipient: {!nft.recipient.length && "required"}</label>
                        <input name="recipient" className={style.input} type="text" onChange={handleInput} value={nft.recipient}></input>
                    </div>
                    <div className={style.item}>
                         <label className={style.label} htmlFor="recipient">Collection id: {!nft.recipient.length && "required"}</label>
                        <select name="collection" value={nft.collection} onChange={handleInput}>
                            <option>solana</option>
                            <option>polygon</option>
                        </select>
                    </div>      
                </div>
                <div className={style.item}>
                        <label className={style.label} htmlFor="description">Description: {!nft.description.length && "required"}</label>
                        <textarea name="description" className={style.textarea} type="text" onChange={handleInput} value={nft.description}></textarea>
                        <p className={style.textLength}>{nft.description.length}/300</p>
                </div>
                <div className={style.containerItems}>
                    <div className={style.item}>
                        <label className={style.label} htmlFor="nftKey">Property: (optionally)</label>
                        <input onChange={handleProperty} name="nftKey" className={style.input} type="text"  value={property.nftKey}></input>
                    </div>
                    <div className={style.item}>
                         <label className={style.label} htmlFor="nftValue">value:</label>
                        <input onChange={handleProperty} name="nftValue" className={style.input} type="text" value={property.nftValue}></input>
                    </div>
                    <button onClick={createProperty} className={style.properties}>Add</button>
                </div>
                <section className={style.nftContainer}>
                    {Object.keys(nft).filter((e)=> e !== "attributes").map(e=> <p className={style.nftKey} key={e}>{e}: {nft[e]}</p>)}
                    {nft.attributes?.map((e,i)=> 
                        <div style={{margin:"16px 0"}} key={i}>
                            <p>{`Attribute ${i + 1}:`}</p>
                            <p style={{color:"white"}}> {e.trait_type}: {e.value}</p>
                        </div>
                    )}
                </section>
                {!loader?<button type="submit" className={style.button}>Create</button>:
                    <button  className={style.buttonLoading}></button>}
            </form>
            
        </main>
    )
}