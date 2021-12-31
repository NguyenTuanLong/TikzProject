import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import './Form.css';

const IMG_PREFIX = "data:image/png;base64,";
export default function Form() {
  const [imgContent, setImgContent] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    const formData = new FormData();
    const file = data.exampleRequired[0];
    console.log(file);
    formData.append("file",file);
    try {
        const result = await axios.post("http://localhost:5000/", formData);
        setImgContent(result.data);
    } catch (error) {
        setImgContent("");
    }
  }

   // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            {/* include validation with required or other standard HTML validation rules */}
            <input class="custom-file-upload" type="file" {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <input class="button-2" type="submit" />
        </form>
        {imgContent.length > 0 
        ? <img src={`${IMG_PREFIX}${imgContent}`} alt="imgContent"/> 
        : <div></div>
        }
    </div>
    
  );
}
