import { useEffect, useState } from "react";
import { useStore } from '@nanostores/react';
import { CONTENT, URL, DATA_MOCK } from "../utils/constants";
import { isLoading, responseData, recipe, isDemoMode } from '../utils/store';

export default function InputText(props) {
  const [value, setValue] = useState('');
  const $isLoading = useStore(isLoading);
  const $response = useStore(responseData);
  const $isDemoMode = useStore(isDemoMode);

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
    setValue('');

    $isDemoMode
    ? responseData.set(DATA_MOCK)
    : await dataPost()
  }

  useEffect(() => {
    if ($response) {
      isLoading.set(false);
    }
  }, [$isLoading, $response]);

  return (
    <div className="p-2 flex flex-col gap-3">
      <input
        className="border-2 border-black p-2 rounded-lg text-xl w-full md:w-3/4 m-auto disabled:border-gray-500"
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
      <label className="inline-flex items-center cursor-pointer m-auto">
        <input onClick={() => isDemoMode.set(!isDemoMode.get())} type="checkbox" value="" className="sr-only peer"/>
         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-400"></div>
        <span className="ms-3 text-lg font-medium text-black">{$isDemoMode ? CONTENT.toggle.demo : CONTENT.toggle.live}</span>
      </label>
    </div>
  );
}