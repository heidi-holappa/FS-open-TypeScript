import axios from 'axios';
import { useState, useEffect } from 'react';


interface DiaryEntry {
  id: string,
  date: string,
  weather: string,
  visibility: string
}




const App = () => {

  const [newEntry, setNewEntry] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {

      setEntries(response.data)
    })
  }, [])

  return (
    <div>
      <h1>Diary</h1>
      <div>
        <ul>
          {entries.map(entry => 
            <li key={entry.id}>{entry.date}: {entry.weather} & {entry.visibility}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;