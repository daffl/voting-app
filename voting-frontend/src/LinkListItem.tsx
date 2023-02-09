import React from 'react';
import { Link } from 'voting-api'
import { client } from './client';

const LinkListItem: React.FC<Link> = ({ _id, link, description, title, votes }) => {
  const upvote = async () => {
    await client.service('links').upvote({ _id })
  }
  const downvote = async () => {
    await client.service('links').downvote({ _id })
  }

  return (
    <li className="flex mb-4 border-b pb-4">
      <div className="pr-6">
        <button className="text-grey py-2 px-4 rounded-full" onClick={upvote}>+</button>
        <div className="ml-3 font-bold text-xl">{votes}</div>
        <button className="text-grey py-2 px-4 rounded-full" onClick={downvote}>-</button>
      </div>
      <div className="pt-6">
        <a href={link} className="font-bold text-blue-600">{title}</a>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </li>
  );
};

export default LinkListItem;
