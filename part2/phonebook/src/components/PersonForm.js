import React from "react";

const PersonForm = ({onSubmit, name, number}) => {
    return(
        <form onSubmit={onSubmit}>
        <div>
          name: <input name={name.value} onChange={name.onChange} />
        </div>
        <div>
          number: <input number={number.value} onChange={number.onChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm