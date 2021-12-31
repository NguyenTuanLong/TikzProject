import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const IMG_PREFIX = "data:image/png;base64,";
export default function Form() {
  const [imgContent, setImgContent] = useState("");
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const editorContent = watch("textTex");
  const onSubmit = async(data) => {
    const formData = new FormData();
    const tex = data.textTex;
    const base64Tex = new Buffer.from(tex, 'utf8').toString('base64');
    // const base64Tex = btoa(unescape(encodeURIComponent(data.textTex)));
    formData.append("data", base64Tex);
    // try {
    //     const result = await axios.post("http://localhost:5000/code", formData);
    //     setImgContent(result.data);
    // } catch (error) {
    //     setImgContent("");
    // }
  }

  const onEditorStateChange = (editorState) => {
    setValue("textTex", editorState);
  };

  useEffect(() => {
    register("textTex", { required: true })
  }, [register]);

   // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
        <ReactQuill id="quill" theme="snow" value={editorContent} onChange={onEditorStateChange}/>
        <p className="Error">{errors.textTex &&  <span>This field is required</span>}</p>
        <input type="submit" onClick={handleSubmit(onSubmit)}/>
        {imgContent.length > 0 
        ? <img src={`${IMG_PREFIX}${imgContent}`} alt="imgContent"/> 
        : <div></div>
        }
    </div>
    
  );
}
