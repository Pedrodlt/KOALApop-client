import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './SearchBar.css'

function SearchBar({ setShowFilterProduct }) {

    const [query, setQuery] = useState('');


    const handleQueryChange = e => {
        const inputValue = e.target.value
        setQuery(inputValue)
        setShowFilterProduct(inputValue)
    }

    return (

        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Product/Category/Price..."
                className="mb-3 searchBar"
            >
                <Form.Control type="text" placeholder="Product" value={query} onChange={handleQueryChange} />
            </FloatingLabel>
        </>
    )
}

export default SearchBar