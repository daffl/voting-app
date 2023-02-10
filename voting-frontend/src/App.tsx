import './App.css';
import AddLinkForm from './AddLinkForm';
import { Link } from 'voting-api';
import LinkListItem from './LinkListItem';
import { useEffect, useState } from 'react';
import { client } from './client';

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const getLinks = async () => {
    const page = await client.service('links').find({
      query: {
        $sort: {
          votes: -1
        }
      }
    })
    setLinks(page.data);
  }

  useEffect(() => {
    getLinks()
    client.service('links').on('created', getLinks)
    client.service('links').on('patched', getLinks)

    return () => {
      client.service('links').removeListener('created', getLinks)
      client.service('links').removeListener('patched', getLinks)
    }
  })

  return (
    <div className="p-8">
        <ul className="list-none">
          {links.map(link => <LinkListItem key={link._id} {...link} />)}
        </ul>
      <AddLinkForm />
    </div>
  );
}

export default App;
