import { useRef, useState, useCallback } from 'react';
import './App.css';
import useSearch from './hook/useSearch';

function App() {

  const [query, setQuery] = useState<string>("")
  const [page, setPage] = useState<number>(1)


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  const { loading, error, hasMore, books } = useSearch(query, page)
  const observer = useRef<IntersectionObserver | null>(null)

  const lastBook = useCallback((node: HTMLDivElement | null) => {
    if (loading) { return }
    if (observer.current) { observer.current.disconnect() }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {

        setPage(prev => prev + 1)
      }
    })
    if (node) { observer.current.observe(node) }
  }, [loading, hasMore])

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={handleChange} />



      <div className="result">
        <h3>{loading && 'Loading...'}</h3>
        <h3>{error && 'Error Occured'}</h3>
        <div>
          {books.map((book, i) => {
            if (i + 1 === books.length) {
              return (<div ref={lastBook} key={i}><h3>{book.name}</h3>
                <img src={book.avatar} />
              </div>)
            }
            return (<div key={i}><h3>{book.name}</h3>
              <img src={book.avatar} />
            </div>)
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
