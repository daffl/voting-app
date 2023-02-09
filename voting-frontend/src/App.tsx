import './App.css';
import AddLinkForm from './AddLinkForm';
import { Link } from 'voting-api';
//@ts-ignore
import { useFind } from 'figbird';
import LinkListItem from './LinkListItem';

function App() {
  const { data } = useFind('links', {})
  const links: Link[] = data || []

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
