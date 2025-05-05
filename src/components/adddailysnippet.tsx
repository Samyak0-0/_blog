import Image from "next/image";
import { useState, useRef } from "react";

const AddDailySnippet = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const AddFileInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const [fileCount, setFileCount] = useState(0);
  // const [musicList, setMusicList] = useState(0);

  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      setFileCount(files.length);
    }
  };

  const handleAddFiles = () => {
    const dt = new DataTransfer();

    const files = Array.from(fileInputRef.current?.files || []);

    const addFiles = Array.from(AddFileInputRef.current?.files || []);
    addFiles.forEach((file) => files.push(file));
    files.forEach((file) => dt.items.add(file));

    fileInputRef.current.files = dt.files;

    handleFileChange();
  };

  console.log(fileInputRef.current?.files);

  return (
    <div>
      <form className="max-w-2xl mx-auto p-6 space-y-6">
        <div>
          <label
            htmlFor="thoughtOfDay"
            className="block text-sm font-medium mb-2"
          >
            Thought of the Day
          </label>
          <input
            type="text"
            id="thoughtOfDay"
            placeholder="  or Today as a sentence . . . "
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="dailyJournal"
            className="block text-sm font-medium mb-2"
          >
            Daily Journal
          </label>
          <textarea
            id="dailyJournal"
            rows={4}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="space-y-6">
          {/* File Input */}
          <div>
            <label
              htmlFor="picOfDay"
              className="block text-sm font-medium mb-2"
            >
              Pic of the Day
            </label>
            <input
              type="file"
              id="picOfDay"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Image Preview */}
          <div className="mt-4">
            {fileInputRef.current?.files?.length &&
              fileInputRef.current?.files?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from(fileInputRef.current.files).map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                        width={500}
                        height={500}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const dt = new DataTransfer();
                          const files = Array.from(
                            fileInputRef.current?.files || []
                          );
                          files.splice(index, 1);
                          files.forEach((file) => dt.items.add(file));
                          fileInputRef.current.files = dt.files;
                          handleFileChange();
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>

          <input
            type="file"
            id="addPicOfDay"
            accept="image/*"
            multiple
            ref={AddFileInputRef}
            onChange={handleAddFiles}
            className="w-full p-2 border rounded-lg hidden"
          />

          <div className="mt-4">
            <label
              htmlFor="addPicOfDay"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add More Images
            </label>
          </div>

          {/* Description Inputs */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Picture Description(s)
            </label>
            <div className="space-y-4">
              {Array.from({ length: fileCount }).map((_, index) => (
                <div key={index}>
                  <label className="block text-xs text-gray-600 mb-1">
                    Description for image {index + 1}
                  </label>
                  <textarea
                    id={`picDescription-${index}`}
                    rows={2}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Describe the image..."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="musicPractice"
              className="block text-sm font-medium mb-2"
            >
              Music Practice Recordings
            </label>
            <input
              type="file"
              id="musicPractice"
              accept="audio/*,video/*"
              ref={musicInputRef}
              multiple
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        {/* <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              // Add logic to handle additional music recordings
              musicInputRef.current?.click();
            }}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add More Recordings
          </button>
        </div> */}

        {/* <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Uploaded Recordings:</h3>
          <div className="space-y-2">
            {Array.from(musicInputRef.current?.files || []).map((file, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>
                {file.name}
              </div>
            ))}
          </div>
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddDailySnippet;
