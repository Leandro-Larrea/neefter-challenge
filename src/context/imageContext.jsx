import { useState,createContext  } from "react";

export const ImageContext = createContext({image:false, undefined})

export const ImageProvider =({children})=>{
    const [image, setImage] = useState(false);

    return <ImageContext.Provider value={{ image, setImage}}>
        {children}
    </ImageContext.Provider>
}