import React, { useState } from 'react';

export default function Sorteio() {
  const [input, setInput] = useState('');
  const [item, setItem] = useState([]);
  const [id, setId] = useState(0);
  const [modal, setModal] = useState(false);
  const [optItem, setOptItem] = useState(false);

  const handleClick = () => {
    if (input.trim() != '') {
      setId(id + 1);
      setItem([...item, input]);

      setInput('');
    }
  };

  const handleAddNumber = (number) => {
    for (let c = 1; c <= number; c++) {
      item.push(c);
      setInput(input + ' ');
      setTimeout(() => {
        setInput('');
      });
    }
  };

  const handleSortear = () => {
    const interval = setInterval(
      () =>
        setModal({
          title: 'Sorteando',
          etc: '...',
          result: item[Math.floor(Math.random() * item.length)],
        }),
      1,
    );

    setTimeout(() => {
      setModal({
        title: 'Vencedor é:',
        etc: false,
        result: item[Math.floor(Math.random() * item.length)],
      });
      clearInterval(interval);
    }, 2000);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="div-main">
        <div className="div-input">
          <input
            type="text"
            value={input}
            placeholder="Sorteando..."
            onChange={({ target }) => setInput(target.value)}
          />
          <div>
            <span
              onClick={() => {
                setOptItem(!optItem);
              }}
            >
              &#9881;
            </span>
          </div>
          {optItem && (
            <section className="section-options-input">
              <input
                type="Number"
                value={optItem}
                placeholder="Número personalizado"
                onChange={({ target }) => setOptItem(target.value)}
              />
              <button
                onClick={() => {
                  if (optItem.trim() != '') {
                    if (optItem <= 1000) {
                      setOptItem('');
                      handleAddNumber(optItem);
                    } else {
                      alert('Número deve ser menor ou igual a 1000!');
                    }
                  }
                }}
              >
                Adicionar
              </button>
            </section>
          )}
        </div>
        <p>Escreva aqui as opções a serem sorteadas⤴</p>
        <button onClick={handleClick}>Adicionar</button>
        {item.length === 0 && (
          <div>
            <p>Ou use as opções abaixo:</p>
            <button onClick={() => handleAddNumber(5)}>1 a 5</button>
            <button onClick={() => handleAddNumber(10)}>1 a 10</button>
            <button onClick={() => handleAddNumber(100)}>1 a 100</button>
          </div>
        )}
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
          <h1 className="h1-anime">
            {modal.title}
            {modal.etc && <div class="loader"></div>}
          </h1>
          <h1>
            <strong>{modal.result}</strong>
          </h1>

          <button onClick={() => setModal(false)}>Fechar</button>
        </div>
      )}
    </form>
  );
}
