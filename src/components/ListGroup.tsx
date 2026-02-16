import { useState } from "react";

interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void;
}

function ListGroup({items, heading, onSelectItem}: Props) {
    const [selIndex, setSelIndex] = useState(-1);
     
    const message = items.length === 0 && <p>No item found</p>;

    return (
       <>
            <h1>{heading}</h1>
            { message }
            <ul className="list-group">
                {items.map((item, index) => 
                    <li 
                        className={selIndex === index ? "list-group-item active" : "list-group-item"}
                        key={item} 
                        onClick={() => {
                            setSelIndex(index);  
                            onSelectItem(item); 
                        }}
                    >
                        {item}
                    </li>
                    )
                }
            </ul>
        </> 
    );
}


export default ListGroup;