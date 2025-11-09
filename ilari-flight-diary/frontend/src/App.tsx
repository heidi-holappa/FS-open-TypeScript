import { useState, useEffect } from 'react';
import type { DiaryEntry } from './types';
import { getAllDiaries, createDiaryEntry } from './service/diaryService';



const App = () => {

  const [date, setNewDate] = useState('');
  const [weather, setNewWeather] = useState('');
  const [visibility, setNewVisibility] = useState('');
  const [comment, setNewComment] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
      getAllDiaries().then(data => {
        setEntries(data)
      })
    }, [])

    
    const entryCreation = (event: React.SyntheticEvent) => {
      event.preventDefault()
      createDiaryEntry({ date: date, visibility: visibility, weather: weather, comment: comment }).then(data => {
        setEntries(entries.concat(data))
      })

      setNewDate('');
      setNewWeather('');
      setNewVisibility('');
      setNewComment('');
      
    }

  return (
    <div>
      <h1>Diary</h1>
      <div>
        <form onSubmit={entryCreation}>
          <div>
            <label>Date:</label>
            <input
              value={date}
              onChange={(event) => setNewDate(event.target.value)} 
            />
          </div>
          <div>
            <label>Visibility:</label>
            <input
              value={visibility}
              onChange={(event) => setNewVisibility(event.target.value)} 
            />
          </div>
          <div>
            <label>Weather:</label>
            <input
              value={weather}
              onChange={(event) => setNewWeather(event.target.value)} 
            />
          </div>
          <div>
            <label>Comment:</label>
            <input
              value={comment}
              onChange={(event) => setNewComment(event.target.value)} 
            />
          </div>
          <button type='submit'>add</button>
        </form>
        <ul>
          {entries.map(entry => 
            <li key={entry.id}>{entry.date}: {entry.weather} & {entry.visibility}{entry.comment ? ' Comment: ' + entry.comment : ''}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;