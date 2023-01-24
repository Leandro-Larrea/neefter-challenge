 
export function getMintHash(collection,id){
        setTimeout(() => {
            fetch(`https://staging.crossmint.com/api/2022-06-09/collections/default-${nft.collection}/nfts/${obj.id}` ,{
            method: 'GET',
            headers: {
              "x-client-secret": process.env.REACT_APP_CLIENT,
              'x-project-id': process.env.REACT_APP_PROJECT_ID
            }
    })
    .then(a => a.json())
    .then(b=> {
            if(b.onChain.mintHash){
                setNftHash(b.onChain.mintHash)
                }
                setLoader(false)
                setNft({  name: '',
                recipient: '',
                image: image,
                description: '',
                collection:"solana",
                attributes:[]})
            }
        )
        }, 7000);    }
    