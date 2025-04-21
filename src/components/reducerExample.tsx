import { createContext, useContext, useReducer } from "react";

const CONTEXT = createContext("");

interface State {
  count: number;
}

interface Action {
  type: "increment" | "decrement";
}

function reducer(a: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: a.count + 1 };
    case "decrement":
      return { count: a.count - 1 };
  }
}

function Parent() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <CONTEXT.Provider value={"a"}>
      <button
        onClick={() => {
          dispatch({ type: "increment" });
        }}
      ></button>
      <button
        onClick={() => {
          dispatch({ type: "decrement" });
        }}
      ></button>

      {state.count}
      <Child />
    </CONTEXT.Provider>
  );
}

function Child() {
  const context = useContext(CONTEXT);

  return <h1>{context}</h1>;
}
