export function Xinput() {
  function getKey() {
    if (event.keyCode == 13) {
      alert('click enter');
    }
  }
  // const { color } = prop;
  return (
    <div>
      <header className="header">
        <h1 id="todoText">todos</h1>
        <input
          οnkeypress={getKey()}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"></input>
      </header>
    </div>
  );
}
