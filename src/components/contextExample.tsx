import { createContext, useContext } from "react";

const CONTEXT = createContext("");

function Parent() {
  return (
    <CONTEXT.Provider value={"a"}>
      <Child />
    </CONTEXT.Provider>
  );
}

function Child() {
  const context = useContext(CONTEXT);

  return <h1>{context}</h1>;
}
