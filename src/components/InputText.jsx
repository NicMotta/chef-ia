import { useEffect, useState } from "react";
import { useStore } from '@nanostores/react';
import { CONTENT, URL, DATA_MOCK } from "../utils/constants";
import { isLoading, responseData, recipe } from '../utils/store';

export default function InputText(props) {
  const [value, setValue] = useState('');
  const $isLoading = useStore(isLoading);
  const $response = useStore(responseData);

  const postData = {
    model: "chef",
    options: {
      seed: Math.floor(Math.random() * 10000) + 1,
      temperature: 0.5
    },
    prompt: value,
    stream: false
  }

  // TODO Refactorizar y mover a archivo /utils/services.js
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
        if (data) {
          isLoading.set(false)
        }
      })
      .catch(error => {
        setError(error);
      });
    }


  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleClick = async () => {
    responseData.set(null);
    recipe.set(null);
    isLoading.set(true);
    responseData.set(DATA_MOCK);
    setValue('');
    //dataPost();
  }

  useEffect(() => {
    if ($response) {
      isLoading.set(false);
    }
  }, [$isLoading, $response]);

  return (
    <>
      <input
        className="border-2 border-black p-2 rounded-lg text-xl w-3/4 m-auto disabled:border-gray-500"
        type="text"
        id='text-input'
        name={props.name}
        placeholder={$isLoading ? CONTENT.placeholder.loading : CONTENT.placeholder.input}
        value={value}
        onChange={handleChange}
        disabled={$isLoading}
      />
      <button className="text-xl m-auto border-2 rounded-lg p-2 border-black bg-orange-500 hover:bg-orange-400 disabled:bg-gray-300 disabled:border-gray-500 disabled:text-gray-500" disabled={value === '' || $isLoading} onClick={handleClick}>
        {$isLoading ? CONTENT.button.loading : CONTENT.button.start}
      </button>
    </>
  );
}