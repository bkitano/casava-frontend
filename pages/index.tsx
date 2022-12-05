import axios from "axios";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [markdown, setMarkdown] = useState("no data yet...");
  const [rawString, setRawString] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    const BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

    setMarkdown("Loading...");
    const cleanedRawString = JSON.stringify(rawString);
    try {
      const response = await axios.post(`${BACKEND_ENDPOINT}/convert`, {
        raw_string: cleanedRawString,
        password,
      });

      const { csv, markdown } = response.data;
      setMarkdown(markdown);
    } catch (err) {
      setMarkdown(`Error: ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <label>
        raw table copy paste:
        <textarea
          name="raw_string"
          onChange={(e) => setRawString(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        password:
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" onClick={handleSubmit} />
      <div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown} />
      </div>
    </div>
  );
}
