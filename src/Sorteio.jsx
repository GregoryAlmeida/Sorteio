import React, { useState } from 'react';

export default function Sorteio() {
  const [input, setInput] = useState('');
  const [item, setItem] = useState([]);
  const [id, setId] = useState(0);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    if (input.trim() != '') {
      setId(id + 1);
      setItem([...item, { id: id, item: input }]);

      setInput('');
    }
  };

  const handleSortear = () =>
    setModal(item[Math.floor(Math.random() * item.length)].item);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="div-input">
        <input
          type="text"
          value={input}
          placeholder="Sorteando..."
          onChange={({ target }) => setInput(target.value)}
        />
        <button onClick={handleClick}>Adicionar</button>
      </div>
      <div className="div-result">
        {item.length > 1 && (
          <div className="div-buttons">
            <button onClick={handleSortear}>Sortear</button>
            <button
              onClick={() => {
                setItem([]);
                setId(0);
              }}
            >
              Apagar Tudo
            </button>
          </div>
        )}

        {item.map(({ id, item }) => (
          <p className="p-item" key={id}>
            {item}
          </p>
        ))}
      </div>
      {modal && (
        <div className="modal">
          <h1>Vencedor é:</h1>
          <h1>
            <strong>{modal}</strong>
          </h1>
          <button onClick={() => setModal(false)}>Fechar</button>
        </div>
      )}
    </form>
  );
}
