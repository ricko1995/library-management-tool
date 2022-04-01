import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function SearchBar({ title, handleSearch }) {
	function onInputChange(e) {
		handleSearch(e.target.value.toLowerCase());
	}

	return (
		<InputGroup className="my-2">
			<InputGroup.Text>
				<FontAwesomeIcon className="me-2" icon={faMagnifyingGlass} /> {title}
			</InputGroup.Text>
			<Form.Control placeholder={title} type="text" onChange={onInputChange} />
		</InputGroup>
	);
}
