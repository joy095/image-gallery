import React, { useState } from "react";

type Props = {};

const post = (props: Props) => {
  const [description, setDescription] = useState("");
  const [state, setState] = useState({
    image: "",
  });

  const { image } = state;

  const onChange = (e) => {
    e.persist();
    setState((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    console.log("Current file name: " + e.target.value);
    console.log("Previous file name: " + state.image);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const postData = async () => {
      const data = {
        description: description,
        image: image,
      };

      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.json();
    };
    postData().then((data) => {
      console.log(data);
      alert(data.message);
    });
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="max-w-xs my-2 overflow-hidden rounded shadow-lg">
        <div>
          <label htmlFor="Title">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div>
          <label htmlFor="Title">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            onChange={onChange}
            value={image}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default post;
