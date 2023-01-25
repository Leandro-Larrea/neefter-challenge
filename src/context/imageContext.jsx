import { useState,createContext  } from "react";

export const ImageContext = createContext({image:"", undefined})

export const ImageProvider =({children})=>{
    const [image, setImage] = useState("");

    return <ImageContext.Provider value={{ image, setImage}}>
        {children}
    </ImageContext.Provider>
}