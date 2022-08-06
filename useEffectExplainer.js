import React from "react";
function UseffectExplainer() {
  let [count, setCount] = React.useState(0);
  let [count5, setCount5] = React.useState(0);
  // lifecyle method
  console.log("fn is executed");
  function effectFn() {
    console.log("I am an effect");
  }
  function incrementCount() {
    setCount(count + 1);
  }
  function incrementCount5() {
    setCount5(count + 5);
  }

  // 1. it is a hook that executes a fn passed into it after
  // first render only once ->
  // React.useEffect(effectFn, [])

  // 2. it is a hook that executes a fn passed into it after
  //    first render and everytime when state of
  //     any state var changes
  //    React.useEffect(effectFn);

  // 3.it is a hook that executes a fn passed into it after
  //   first render and everytime when state of a
  //   state variable that is passed in dependency array
  //   is changed
  // React.useEffect(effectFn, [count])

  return (
    <>
      <h1> I am banner</h1>
      {console.log("render is done")}
      <div>Main count {count}</div>
      <button onClick={incrementCount}>+</button>
      <div>Main count {count5}</div>
      <button onClick={incrementCount5}>+5</button>
    </>
  );
}
