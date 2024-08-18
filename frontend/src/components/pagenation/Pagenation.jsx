
import './Pagenation.css'

const Pagenation = ({ NumberOfPages, pageNumber, setPageNumber }) => {
  console.log(NumberOfPages)
  const arr = []
  for (let i = 0; i < NumberOfPages; i++) {
    arr[i] = i + 1
  }
  return (


    <div className="pagenation">

      <button onClick={() => {
        if (pageNumber > 1) {
          setPageNumber(page => page - 1)
        }
      }} disabled={pageNumber === 1} className={`previous`}>Previous</button>

      {arr.map((page) => {
        return (
          <button onClick={() => { 
            setPageNumber(page)
           }
          } key={page} className={`page-number ${pageNumber === page ? 'selected' : null}`}>{page}</button>
        )
      })}


      <button onClick={() => {
        if (pageNumber < NumberOfPages) {
          setPageNumber(page => page + 1)
        }
      }} disabled={pageNumber === NumberOfPages} className={`next`}>Next</button>
    </div>
  );
}

export default Pagenation;