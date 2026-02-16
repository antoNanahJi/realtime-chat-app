
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  let items = [
          'New York',
          'London',
          'San Francisco',
          'Tokyo',
          'Paris'
      ];
  
  const handleSelectItem = (item: String) => {
    console.log(item);
  }

  const [visib, setVisible] = useState(false);
  // return <div><ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /></div>;

  // return <div><Alert>Hello <em>World</em></Alert></div>

  return (
      <div>
        {visib && <Alert>My alert</Alert>}
        <Button onClick={() => { setVisible(true); }}>MyBtn</Button>
      </div>);
}

export default App;