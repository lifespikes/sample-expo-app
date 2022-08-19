import * as fs from 'expo-file-system';
import {useState} from 'react';

const BASE_URI = 'https://eae75b2f31ab.ngrok.io';

export default function useUpload() {
  const [uploading, setUploading] = useState(false);

  return {
    uploading,

    uploadFile: async (fileURI) => {
      setUploading(true);

      const response = await fs.uploadAsync(
        `${BASE_URI}/upload`,
        fileURI,
        {
          fieldName: 'audio',
          httpMethod: 'POST',
          uploadType: fs.FileSystemUploadType.MULTIPART,
        }
      );

      setUploading(false);

      return JSON.parse(response.body);
    }
  };
}
