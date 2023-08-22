import React, {useState, useRef, useEffect} from 'react'
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from 'react-router';
import styles from "./HeaderDropdown.module.css"
import axios from 'axios';

const HeaderDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    
    const openDropdown = () => {
        setIsOpen(!isOpen)
    };

    const toggleOutside = (event) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setIsOpen(false)
        }
    }

    const handleLogout = () => {
        navigate("/login");
        window.location.reload();
    }

    useEffect(() => {        
        document.addEventListener("click", toggleOutside);
        return () => {
          document.removeEventListener("click", toggleOutside);
        };
      }, []);
    

    return (
        <div>
            <RxAvatar style={{ fontSize: "35px" }} className={styles.icon} onClick={openDropdown}/>
            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.dropdown_item}>{}</div>
                    <div className={styles.dropdown_item}>Profile</div>
                    <div className={styles.dropdown_item}>Files</div>
                    <div className={styles.dropdown_item} onClick={handleLogout}>Log out</div>
                </div>
            )}            
        </div>
    )
}

export default HeaderDropdown