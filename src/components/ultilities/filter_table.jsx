import React, { Component } from 'react';
import { Input, Button } from 'antd';
const FilterTable = (props) => {
	const { onInputChange, onSearch, value,
		searchInput, changeInputSearch, fieldName } = props
	return (
		onSearch == undefined ?
			<div className="custom-filter-dropdown">
				<Input
					ref={(ele) => changeInputSearch(ele)}
					placeholder="Search name"
					value={value}
					onChange={(e) => onInputChange(e, fieldName)}
					onPressEnter={() => onSearch(fieldName)}
				/>
			</div>
			:
			<div className="custom-filter-dropdown">
				<Input
					ref={(ele) => changeInputSearch(ele)}
					placeholder="Search name"
					value={value}
					onChange={(e) => onInputChange(e, fieldName)}
					onPressEnter={() => onSearch(fieldName)}
				/>
				<Button type="primary" onClick={() => onSearch(fieldName)}>Search</Button>
			</div>

	)
}
export default FilterTable