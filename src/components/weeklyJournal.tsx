import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const weekFileMap: Record<number, string> = {
  7: "/weeklyJournals/Week7.md",
  8: "/weeklyJournals/Week8.md",
};

const WeeklyJournal = ({ selectedWeek }: { selectedWeek: number | null }) => {
  const [markdown, setMarkdown] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedWeek && weekFileMap[selectedWeek]) {
      setLoading(true);
      fetch(weekFileMap[selectedWeek].replace("..", ""))
        .then((res) => res.text())
        .then((text) => setMarkdown(text))
        .finally(() => setLoading(false));
    } else {
      setMarkdown("");
    }
  }, [selectedWeek]);

  const handleSave = () => {
    // Saving to file system is not possible from browser; placeholder for backend integration
    alert("Saving is not implemented in this demo.");
    setEditMode(false);
  };

  if (!selectedWeek) return null;

  return (
    <div style={{ marginTop: 24 }} className=" h-screen">
      <button onClick={() => setEditMode((e) => !e)} style={{ marginBottom: 12 }}>
        {editMode ? "Preview" : "Edit"}
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : editMode ? (
        <div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={12}
            style={{ width: "100%" }}
          />
          <button onClick={handleSave} style={{ marginTop: 8 }}>
            Save
          </button>
        </div>
      ) : (
        <ReactMarkdown
          components={{
            h1: (props) => <h1 className="markdown-h1" {...props} />,
            h2: (props) => <h2 className="markdown-h2" {...props} />,
            h3: (props) => <h3 className="markdown-h3" {...props} />,
            h4: (props) => <h4 className="markdown-h4" {...props} />,
            h5: (props) => <h5 className="markdown-h5" {...props} />,
            h6: (props) => <h6 className="markdown-h6" {...props} />,
          }}
        >{markdown}</ReactMarkdown>
      )}
    </div>
  );
};

export default WeeklyJournal;
