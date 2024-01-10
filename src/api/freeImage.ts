import axios from 'axios';

const uploadImage = async (formData: {}) => {
  axios.post(
    'https://freeimage.host/api/1/upload ',
    formData
  )
}
export { uploadImage };
