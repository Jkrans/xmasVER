import ProgressBar from './ProgressBar'
import gravy from '../images/gravy.svg'


const Header = () => {
  return (
    <>
      <img className="gravy" src={gravy} alt="" />
      <main className="header" >
        <h1 className="header--h1">The North Pole Escape</h1>
        <ProgressBar />
      </main>
    </>
  )
}

export default Header
