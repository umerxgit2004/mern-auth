import { useDispatch, useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import {getDownloadURL, getStorage , ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'

import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/user/userSlice.js"

export default function Profile() {
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])

  const handleFileUpload = async (image) => {
    console.log(image)
    const storage = getStorage(app)
    const fileName = new Date ().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        console.log(imagePercent);
      },
      (error) => {
        setImageError(true);
        console.error(error); // Log or handle the error appropriately
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        }).catch(error => {
          console.error(error); // Log or handle the error appropriately
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input hidden type = "file" ref={fileRef} accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}/>
        <img onClick={() => fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture} alt="profile" className="mt-2 h-24 w-24 self-center cursor-pointer rounded-full object-cover" />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        
        <input onChange={handleChange} defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3"/>
        <input onChange={handleChange} defaultValue={currentUser.email} type="text" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3"/>
        <input onChange={handleChange} type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3"/>

        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>

      </div>
    
    </div>
  )
}
