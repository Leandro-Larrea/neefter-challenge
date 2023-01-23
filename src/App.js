import { Route } from "react-router-dom";
import { Form } from "./components/form";

export default function App(){
    return (
        <div className="App">
            <Route exact path= "/" component={Form}/>
                
            
        </div>
    )
}