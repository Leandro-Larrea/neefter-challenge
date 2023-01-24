import style from "../styles/form.module.css"

export function CreateButton({loader}){
    return <div>{!loader?
                <button type="submit" className={style.button}>Create</button>:
                <button  className={style.buttonLoading}></button>
            }</div>
}