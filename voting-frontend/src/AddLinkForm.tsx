import React, { useState } from 'react';
import { client } from './client';

interface NewLinkFormProps {
}

const NewLinkForm: React.FC<NewLinkFormProps> = () => {
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await client.service('links').create({
      link,
      title,
      description
    });
    setLink('');
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-4">Add a New Link</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Title:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="link">
          Link:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="link"
          type="text"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
          Description:
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default NewLinkForm;
