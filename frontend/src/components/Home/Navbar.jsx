import styles from './Navbar.module.css'
import { FaUserCircle } from "react-icons/fa";
import { FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export function Navbar() {
  return (
    <div>
      <nav >
       
 

<div className={styles.nav}>

    <ul>
        <div>
        <li>Rhythmic Realm </li>
        </div>
        <li><Link className={styles.linkel} to="/">Home</Link></li>
        <li><Link className={styles.linkel} to="/about">About</Link></li>
        <li>Contact</li>
        <li><Link to="/musicparty" className={styles.linkel}><FaMusic />Music Party</Link></li>
        <li><Link to="/profile" className={styles.linkel}><FaUserCircle style={{ fontSize: '2em' }} /></Link></li>
        <div>
            
        </div>
    </ul>
</div>

      </nav>
    </div>
  )
}

export default Navbar
