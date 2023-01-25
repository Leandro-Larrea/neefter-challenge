import { useState } from "react";
import style from "../styles/form.module.css"

export function GetButton({ status, collection, id, setStatus}){

    const [loader, setLoader] = useState(false)

   function getMintHash(nftCollection, nftId){
    setLoader(true)
    setStatus("getting hash...")
        setTimeout(() => {
            fetch(`https://staging.crossmint.com/api/2022-06-09/collections/default-${nftCollection}/nfts/${nftId}` ,{
            method: 'GET',
            headers: {
              "x-client-secret": process.env.REACT_APP_CLIENT,
              'x-project-id': process.env.REACT_APP_PROJECT_ID
            }
    })
    .then(a => a.json())
    .then(b=> {
            if(b.onChain.mintHash){
                console.log("asd",b.onChain.mintHash)
                setStatus("your mintHash it's: " + b.onChain.mintHash)
                setLoader(false)
                return 
                }
            if(b.onChain.contractAddress){
                console.log("asd",b.onChain.contractAddress)
                setStatus("your contractAddress it's: " + b.onChain.contractAddress)
                setLoader(false)
                return 
                }
            console.log("calling get again")
                getMintHash(nftCollection, nftId)
            }  
        )
        }, 7000);    }

    return <div>{!loader?
                <button type="button" onClick={()=>getMintHash(collection, id)} className={style.button}>Get mintHash</button>:
                <button type="button" className={style.buttonLoading}></button>
            }</div>
}