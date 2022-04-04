import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Form, InputGroup } from "react-bootstrap";

let debounceTimeout;

export default function SearchBar({ title, handleSearch }) {
	function onInputChange(e) {
		if (debounceTimeout) clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			handleSearch(e.target.value.toLowerCase());
		}, 250);
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
