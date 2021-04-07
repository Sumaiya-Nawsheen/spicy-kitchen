import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data =>{
        const eventData = {
            title: data.name,
            imageURL: imageURL,
            price: data.price
        };
        const url = `http://localhost:5055/addProduct`;
        

        fetch(url, { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)

        })
        .then(res => console.log("server side response", res))
    };

    const handleImageUpload= (event) =>{
const imageData = new FormData();
imageData.set('key', 'e186a2cb4171e579d2fdda583dd8b920');
imageData.append('image', event.target.files[0])

axios.post("https://api.imgbb.com/1/upload", imageData)
.then(function(response){
    setImageURL(response.data.data.display_url);
})
.catch(function(error){
    console.log(error)
});
    };

    return (
        <div>
             <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name"  defaultValue="New Delicious Food" {...register("name")} /><br></br>
       <input type="file" onChange={handleImageUpload} name="exampleRequired" /><br></br>
       <input name="price"   {...register("price")} /><br></br>
       <input type="submit" />
    </form>
        </div>
    );
    };

export default AddProduct;