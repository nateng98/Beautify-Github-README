import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'; // Import necessary Firebase storage functions
import { storage } from './firebase'; // Import Firebase storage instance from a custom file

// Define an asynchronous function to handle file upload
const upload = async (file: any) => {
  const date = new Date(); // Create a new Date instance to get the current timestamp
  const storageRef = ref(storage, `images/${date + file.name}`); // Create a storage reference in Firebase, using the current date and file name for uniqueness
  const uploadTask = uploadBytesResumable(storageRef, file); // Create an upload task that allows monitoring the upload progress

  // Return a promise to manage asynchronous upload actions
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed', 
      (snapshot) => { // Event listener for state changes during upload
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // Calculate upload progress as a percentage
        console.log('upload is ' + progress + '% done'); // Log the upload progress
      },
      (error) => { // Handle any errors during upload
        reject('Something went wrong!' + error?.code); // Reject the promise with an error message
      },
      () => { // Handle successful upload completion
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { // Get the file's download URL after a successful upload
          resolve(downloadURL); // Resolve the promise with the file's download URL
        });
      }
    );
  });
};

export default upload; // Export the upload function as the default export