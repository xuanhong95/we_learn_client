import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
	<div>
		<strong>Bạn không có quyền truy cập hoặc liên kết không tồn tại</strong>
		<center><Link to="/">Trở về trang chủ</Link></center>
	</div>
);
export default NotFound;