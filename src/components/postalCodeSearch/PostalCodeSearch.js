import React, { useState } from "react";
import { connect } from "react-redux";
import { searchPostalCode } from "../../actions";
import "./PostalCodeSearch.css";

function PostalCodeSearch({ searchPostalCode }) {
  const [postalCode, setPostalCode] = useState("");

  const handleChange = function(e) {
    let newValue = e.target.value.trim();

    if (newValue.length === 4) {
      newValue = `${newValue.substring(0, 3)} ${newValue.substring(3)}`;
    }
    newValue = newValue.substring(0, 7);
    setPostalCode(newValue);
  };

  const handleKeyPress = function(e) {
    if (e.key === "Enter") {
        searchPostalCode(postalCode)
    }
  }

  return (
    <main className="PostalCodeSearch">
      <label>enter your postal code:</label>
      <input type="text" value={postalCode} onChange={handleChange} onKeyPress={handleKeyPress} />
      <button onClick={() => searchPostalCode(postalCode)}>
        find your onions
      </button>
    </main>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    searchPostalCode: postalCode => dispatch(searchPostalCode(postalCode))
  };
}

export default connect(null, mapDispatchToProps)(PostalCodeSearch);
