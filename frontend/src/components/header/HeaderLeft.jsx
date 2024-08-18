
const HeaderLeft = ({toggle,setToggle}) => {
  return ( 
    
    <div className="header-left">
    <div className="header-menu">
      <i onClick={() => { setToggle(prev => !prev) }} className={toggle ? "bi bi-x-lg" : "bi bi-list"}></i>
    </div>
    <div className="header-logo">
      <strong>BLOG</strong>
      <i className="bi bi-pencil"></i>
    </div>
  </div>
   );
}
 
export default HeaderLeft;