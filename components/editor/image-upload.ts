
import { createImageUpload } from "novel";
import { toast } from "sonner";


const onUpload = (file: File) => {
    const promise = fetch('api/upload',{
        method: 'POST',
        headers: {
            'Content-Type': file?.type || 'application/octet-stream',
            "x-vercel-filename": file?.name || 'image.png'
        },
        body: file,
    });

    return new Promise((resolve, reject) => {
        promise.then( async(response) => {
            if (response.status === 200) {
                const { url } = (await response.json()) as { url: string };
                // preload the image
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    resolve(url);
                };
            } else if (response.status === 401) {
                
                resolve(file);
                throw new Error('BLOB_READ_WRITE_TOKEN' + ' is not set in the environment variables');
            }
            else{
                throw new Error('Unknown error occurred while uploading the image');
            }
        }),
        {
            loading: 'Uploading image...',
            success: 'Image uploaded successfully',
            error: (error: Error) => {
                toast.error(`Failed to upload image: ${error.message}`);
                reject(error);
            }
        }
    });
}