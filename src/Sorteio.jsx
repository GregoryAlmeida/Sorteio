import React, { useState } from 'react';

export default function Sorteio() {
  const [input, setInput] = useState('');
  const [item, setItem] = useState([]);
  const [id, setId] = useState(0);
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    if (input.trim() != '') {
      setId(id + 1);
      setItem([...item, input]);

      setInput('');
    }
  };

  const handleSortear = () => {
    const interval = setInterval(
      () => setModal(item[Math.floor(Math.random() * item.length)]),
      1,
    );

    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="div-input">
        <input
          type="text"
          value={input}
          placeholder="Sorteando..."
          onChange={({ target }) => setInput(target.value)}
        />
        <p>Escreva aqui as opções a serem sorteadas⤴</p>
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

        {item.map((name) => (
          <p className="p-item" key={Math.random()}>
            {name}
            <button
              onClick={() => {
                item.splice(item.indexOf(name), 1);
                setInput(input + ' ');
                setTimeout(() => {
                  setInput('');
                });
              }}
            >
              X
            </button>
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
