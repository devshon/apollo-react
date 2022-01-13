import React from "react";
import { HashRouter as Routes, Route } from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";
import Create from "../routes/Create";

function App() {
  return (
    <Routes>
      <Route exact path="/" component={Home} />
      <Route path="/create" component={Create} />
      <Route path="/movie/:id" component={Detail} />
    </Routes>
  );
}

export default App;
