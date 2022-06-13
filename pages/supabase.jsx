import { useState } from "react";
import axios from "axios";
const Supabase = () => {
  const [, setObs] = useState();

  const handleObs = (e) => {
    const target = e.currentTarget;
    const image = target.files[0];
    console.log(target.files);
    setObs(image);
  };

  const upload = async () => {
    alert("upload");

    const ruler = await axios.post("/api/addRuler", {
      name: "Samudragupta",
    });
    console.log(ruler);
  };
  return (
    <div>
      <h1>Test</h1>
      <div className="p-1 mb-2">
        <label
          className="block mb-2 font-bold text-zinc-800"
          htmlFor="user_avatar"
        >
          Upload Obs Photo
        </label>
        <input
          type="file"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          className="w-full text-base rounded text-zinc-600 bg-zinc-200 focus:outline-none focus:border-transparent"
          onChange={handleObs}
        />
        <button onClick={upload} className="bg-green border-black border-[1px]">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Supabase;
