import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { Plus  } from 'react-bootstrap-icons';
import Axios from 'axios';
function FileUpload({ currentUserImg, refreshFunction, isSubmitted = false}) {
    const [Images, setImages] = useState(currentUserImg ? [currentUserImg] : [])

    useEffect(() => {
        setImages(currentUserImg ? [currentUserImg] : []);
      }, [currentUserImg]);

    useEffect(() => {
        if(isSubmitted) setImages([]) 
      }, [isSubmitted]);

      

    const onDrop = (file) => {
        console.log('acceptedFile', file)

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", file[0])
        // save the Image we chose inside the Node Server 
        Axios.post('http://localhost:5000/api/users/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, `http://localhost:5000/${response.data.image}`])
                    refreshFunction([...Images, `http://localhost:5000/${response.data.image}`])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = (image) => {
        console.log('image ondelete', image)
        const currentIndex = Images.indexOf(image);

        let newImage = [...Images]
        newImage.splice(currentIndex, 1)

        setImages(newImage)
        // refreshFunction(newImage)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}  className='my-4'>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                accept= 'image/*'
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Plus style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
