import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import './Form2.css';

const IMG_PREFIX = "data:image/png;base64,";
export default function Form() {
  const [imgContent, setImgContent] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    const formData = new FormData();
    const tex = data.textTex;
    const base64Tex = new Buffer.from(tex, 'utf8').toString('base64');
    // const base64Tex = btoa(unescape(encodeURIComponent(data.textTex)));
    formData.append("data", base64Tex);
    try {
        const result = await axios.post("http://localhost:5000/code", formData);
        setImgContent(result.data);
    } catch (error) {
        setImgContent("");
    }
  }

   // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
        <input class="button-2" type="submit" onClick={handleSubmit(onSubmit)}/>      
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            {/* include validation with required or other standard HTML validation rules */}
            <textarea id="input" type="text" wrap="off" cols="100" rows="40" {...register("textTex", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.textTex && <span>This field is required</span>}
            
        </form>
        {imgContent.length > 0 
        ? <img src={`${IMG_PREFIX}${imgContent}`} alt="imgContent"/> 
        : <div></div>
        }
    </div>
    
  );
}
