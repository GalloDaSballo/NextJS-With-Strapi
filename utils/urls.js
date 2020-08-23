export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const fromImageToUrl = (image) => {
    console.log("fromImageToUrl", image)
    if(!image){
      return '/vercel.svg' //Or default image here
    }
  
    if(image.url.indexOf('/') === 0){
      //It's a relative url, add API URL
      return `${API_URL}${image.url}`
    }
  
    return image.url
  
  }