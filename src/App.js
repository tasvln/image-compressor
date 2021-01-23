import React, { useState } from 'react'
import Header from './components/Header'
import imageCompression from "browser-image-compression";

function App() {
  const [image, setImage] = useState({ compressedLink: "", originalImage: "", originalLink: "", clicked: false, uploadImage: false });

  const handleImage = e => {
    if (e.target.files.length) {
      setImage({
        originalLink: URL.createObjectURL(e.target.files[0]),
        originalImage: e.target.files[0],
        outputFileName: e.target.files[0].name,
        uploadImage: e.target.files[0],
      });
    };
  };

  const changeValue = e => {
    setImage({ [e.target.name]: e.target.value });
  };

  const click = e => {
    e.preventDefault();

    const options = {
      maxSize: 2,
      maxWidthOrHeight: 2000,
      useWebWorker: true
    };

    let output;
    imageCompression(image.originalImage, options)
    .then(x => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      setImage({
        compressedLink: downloadLink
      });
    });

    setImage ({
      clicked: true
    });

    return 1;
  };

  return (
    <div className="App">
      <Header />
        <div>
          <div className="mx-20 my-5">
            <div className="w-1/2 w-fu bg-white p-4 rounded-lg mx-auto">
              {image.uploadImage ? (
                <></>
              ) : (
                <>
                  <div className="justify-center flex">
                    <input id="file-btn" className="apparance-none" type="file" accept="image/*" onChange={handleImage} hidden/>
                    <label className="py-2 px-6 bg-black text-white font-semibold text-center rounded-lg cursor-pointer" for="file-btn">Upload Image</label>
                  </div>
                </>
              )}
              {image.outputFileName ? (
                <div>
                  <img className="rounded-lg" src={image.originalLink} />
                  <div className="justify-center flex mt-8">
                    <button type="button" className="py-2 px-6 bg-black text-white font-semibold text-center rounded-lg" onClick={click}>Compress</button>
                  </div>
                </div>
              ) : (
                <>
                </>
              )}
            </div>
            <div className="w-1/2 w-fu rounded-lg mx-auto mt-6">
              <img className="rounded-lg" src={image.compressedLink} />
              <div className="mt-4">
                <p className="text-sm text-center bar-font">On PC:  Right click and Save the Image</p>
                <p className="text-sm text-center bar-font">On Phone:  Press Down and Save Image</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
