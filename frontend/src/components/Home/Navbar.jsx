import styles from './Navbar.module.css'
import { FaUserCircle } from "react-icons/fa";
export function Navbar() {
  return (
    <div>
      <nav >
       
 

<div className={styles.nav}>

    <ul>
        <div>
        <li>Rhythmic Realm </li>
        </div>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li><FaUserCircle style={{ fontSize: '2em' }} /></li>
        <div>
            
        </div>
    </ul>
</div>

      </nav>
    </div>
  )
}

export default Navbar
