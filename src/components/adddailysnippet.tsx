import { useState, useRef, FormEvent } from "react";

const AddDailySnippet = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    thoughtOfDay: "",
    dailyJournal: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("thoughtOfDay", formData.thoughtOfDay);
      formDataToSend.append("dailyJournal", formData.dailyJournal);
      
      if (fileInputRef.current?.files) {
        // Append all selected images
        Array.from(fileInputRef.current.files).forEach((file) => {
          formDataToSend.append("images", file);
        });
      }

      const response = await fetch("/api/snippets", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit snippet");
      }

      // Reset form
      setFormData({
        thoughtOfDay: "",
        dailyJournal: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";

      alert("Daily snippet submitted successfully!");
    } catch (error) {
      console.error("Error submitting snippet:", error);
      alert("Failed to submit snippet. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
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
            value={formData.thoughtOfDay}
            onChange={handleInputChange}
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
            value={formData.dailyJournal}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="picOfDay"
            className="block text-sm font-medium mb-2"
          >
            Pics of the Day
          </label>
          <input
            type="file"
            id="picOfDay"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddDailySnippet;
