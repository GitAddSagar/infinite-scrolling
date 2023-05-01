import { useRef, useState, useCallback,useEffect } from 'react';
import './App.css';
import useSearch from './hook/useSearch';

function App() {

  const scrollIndicator = document.querySelector('.scroll-indicator');
  let lastScrollPosition = 0;

   window.addEventListener('scroll', function() {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition) {
    // scrolling down
    scrollIndicator?.classList.add('hide');
  } else {
    // scrolling up
    scrollIndicator?.classList.remove('hide');
  }

  lastScrollPosition = currentScrollPosition;
});



  const [toggle, setToggle] = useState<boolean>(false)
  const [limit, setLimit] = useState(1);
  
  const { loading, error, cats } = useSearch(toggle,limit)
  const observer = useRef<IntersectionObserver | null>(null)

  const lastCat = useCallback((node: HTMLDivElement | null) => {
    if (loading) { return }
    if (observer.current) { observer.current.disconnect() }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting ) {
        setToggle(!toggle)
      }
    })
    if (node) { observer.current.observe(node) }
  }, [loading])

  useEffect(() => {


if(window.innerWidth>870){
  setLimit(9)
}else if(window.innerWidth>570){
  setLimit(6)
}
else{
  setLimit(4)
}
    
  });

  return (
    <div className="App">

<div className="scroll-indicator">
  <a target='_blank' href="https://github.com/Sagar1079/infinite-scrolling">
  <img title='Click to View Source Code' id='GitHub' src="https://i.pinimg.com/564x/95/99/b5/9599b59f72fc043f13ca52dbf965b530.jpg"/>
  </a>
</div>

      <div className="result">
        <h3>{loading && 'Loading...'}</h3>
        <h3>{error && 'Error Occured'}</h3>
        <div className='AllCats'>
          {cats.map((cat, i) => {
            if (i + 1 === cats.length) {
              return (
                <img className="Cat" ref={lastCat} key={i} src={cat.url} alt='Myaaaaonn'/>
             )
            }
            return (
              <img className="Cat" key={i} src={cat.url} alt='Myaaaaonn'/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
