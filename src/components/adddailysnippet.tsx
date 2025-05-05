import { useState, useRef } from "react";

const AddDailySnippet = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      setFileCount(files.length);
    }
  };

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
