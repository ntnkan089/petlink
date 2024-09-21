import React from 'react'

const Communication = () => {
  return (
    <div>
    <h1>Adoption Form</h1>
    <p>
        <label for="name">Name</label>
        <input type="text" placeholder="Enter your name" id="name" name="name" />
    </p>


    <p>
        <label for="address">Address</label>
        <input type="text" placeholder="Enter your address" id="address" />
    </p>

    <p>
        <label for="contact">Contact Information</label>
        <input type="text" placeholder="Enter your phone number" id="contact" />
    </p>

    <p>
        <label for="pet">Pet</label>
        <select name="pet" id="pet">
            <option value="">--Please select a pet--</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
        </select>
    </p>
    <p>
        <label for="reason">Reason for Adoption</label>
        <br />
        <textarea name="reason" id="reason" cols="30" rows="10"></textarea>
    </p>
    </div>
  )
}

export default Communication