import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { Plus  } from 'react-bootstrap-icons';
import Axios from 'axios';
function FileUpload({ initialUserImg, refreshFunction, isSubmitted = false ,setIsSubmitted}) {
    const [Image, setImage] = useState(initialUserImg ? initialUserImg : "")
    useEffect(() => {
        setImage(initialUserImg ? initialUserImg : "");
      }, [initialUserImg]);

    useEffect(() => {
        if(isSubmitted) setImage('')
        setIsSubmitted(false)
      }, [setIsSubmitted, isSubmitted]);

      

    const onDrop = (file) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", file[0])
        // save the Image we chose inside the Node Server 
        Axios.post('http://localhost:5000/api/users/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImage(`http://localhost:5000/${response.data.image}`)
                    refreshFunction(`http://localhost:5000/${response.data.image}`)

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }


    const onDelete = () => {
        setImage('')
        refreshFunction('')
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

            {Image &&(
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                    <div onClick={onDelete}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={Image} alt={`productImg`} />
                    </div>
            </div>
            )}

        </div>
    )
}

export default FileUpload
