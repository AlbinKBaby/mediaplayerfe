import { serverurl } from "./serverUrl";
import { commonApi } from "./commonApi";

// api call for upload video

export const uploadVideo = async(reqBody)=>{
  return  await commonApi('POST',`${serverurl}/videos`,reqBody)
}

//api call for get videos - get call

export const getAllVideos = async()=>{
    return await commonApi('GET', `${serverurl}/videos`,"")
}

// deletw video

export const deleteVideo = async(id) =>{
    return await commonApi('DELETE',`${serverurl}/videos/${id}`,"")
}

// Add to History

export const addToHistory = async (data) => {
    return await commonApi('POST',`${serverurl}/history`,data)
}

// Get History

export const getHistory = async () =>{
    return await commonApi('GET',`${serverurl}/history`,"")
}

//  Delete History

export const deleteWatchHistory = async(id) =>{
    return await commonApi('DELETE',`${serverurl}/history/${id}`,"")
}

//  addcategory

export const addcategory = async (data) => {
    return await commonApi('POST',`${serverurl}/categories`,data)
}

// Get all Category
 
export const getAllCategories = async() =>{
    return await commonApi('GET',`${serverurl}/categories`,"")
}

// Delete Category

export const deleteCateory = async(data) =>{
    return await commonApi('DELETE',`${serverurl}/categories/${data}`,"")
}

//  get video details by id

export const getVideoDetailById = async(id) =>{
    return await commonApi('GET', `${serverurl}/videos/${id}`,'')
}

// update category list

export const updateCategory = async(id,data)=>{
    return await commonApi('PUT',`${serverurl}/categories/${id}`,data)
}