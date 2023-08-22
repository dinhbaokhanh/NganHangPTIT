import React from "react";
import styles from "./Topnav.module.css";
import { FaBell } from "react-icons/fa";
import HeaderDropdown from "./HeaderDropdown/HeaderDropdown";

const Topnav = () => {
	return (
		<div className={styles.topnav}>
			<div className={styles.logo}>Ngân Hàng Đề thi & Tài liệu PTIT</div>

			<div className={styles.input_container}>
				<input className={styles.input} placeholder="Tìm kiếm ..." />
			</div>

			<div className={styles.notif}>
				<div>
					<FaBell className={styles.icon} style={{ fontSize: "30px" }} />
				</div>
				<div className={styles.ver_line}></div>
				<HeaderDropdown />
			</div>
		</div>
	);
};

export default Topnav;
