import { useState } from "react";
import { CONTENT, URL } from "../utils/constants";

export default function InputText(props) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);


  const postData = {
      model: "llama3:8b",
      options: {
          seed: 1823,
          temperature: 0.5
      },
      prompt: "¿Cuánto es 2 + 2?",
      stream: false
  }

  async function dataPost() {
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setResponse(data);
        console.log(response, data)
      })
      .catch(error => {
        setError(error);
      });
    }


  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleClick = async () => {
    setLoading(true);
    setValue('');
    dataPost();
  }

  return (
    <>
      <input
        className="border-2 border-black p-2 rounded-lg text-xl w-3/4 m-auto disabled:border-gray-500"
        type="text"
        id='text-input'
        name={props.name}
        placeholder={loading ? CONTENT.placeholder.loading : CONTENT.placeholder.input}
        value={value}
        onChange={handleChange}
        disabled={loading}
      />
      <button className="text-xl m-auto border-2 rounded-lg p-2 border-black bg-orange-500 hover:bg-orange-400 disabled:bg-gray-300 disabled:border-gray-500 disabled:text-gray-500" disabled={value === '' || loading} onClick={handleClick}>
        {loading ? CONTENT.button.loading : CONTENT.button.start}
      </button>
    </>
  );
}