import React from "react";
import "./App.css";

function Card(props) {
  const moveLeft = () => {
    props.moveCard(props.id, props.boardId - 1);
  };

  const moveRight = () => {
    props.moveCard(props.id, props.boardId + 1);
  };
  return (
    <div className="card">
      {props.boardId > 1 && <button onClick={moveLeft}>left</button>}
      <div className="card-content">{props.content}</div>
      {props.boardId < 4 && <button onClick={moveRight}>right</button>}
    </div>
  );
}

function Board(props) {
  const onClick = () => {
    const input = window.prompt("add a card");

    if (input) {
      props.addCard(input, props.boardId);
    }
  };
  return (
    <div className="board">
      <div className="board-name">{props.name}</div>
      {props.cards.map(card => (
        <Card
          content={card.content}
          boardId={card.boardId}
          id={card.id}
          moveCard={props.moveCard}
        />
      ))}
      <button onClick={onClick}>+ Add a card</button>
    </div>
  );
}

function App({ initialCards }) {
  const [cards, setCards] = React.useState(initialCards);

  const addCard = (input, boardId) => {
    setCards([...cards, { content: input, id: cards.length + 1, boardId }]);
  };

  const moveCard = (id, boardId) => {
    const newCards = cards.map(card => {
      if (card.id === id) {
        return {
          ...card,
          boardId
        };
      }
      return card;
    });

    setCards(newCards);
  };
  React.useEffect(() => {
    const cardsJson = window.localStorage.getItem("cards");
    const cards = JSON.parse(cardsJson);
    if (cards) {
      console.log("hyrating");

      setCards(cards);
    }
  }, []);

  React.useEffect(
    () => {
      console.log("saving");
      const cardsJson = JSON.stringify(cards);
      window.localStorage.setItem("cards", cardsJson);
    },
    [cards]
  );
  return (
    <div className="App">
      <Board
        name="Winnie"
        boardId={1}
        addCard={addCard}
        cards={cards.filter(card => card.boardId === 1)}
        moveCard={moveCard}
      />
      <Board
        name="Bob"
        boardId={2}
        addCard={addCard}
        moveCard={moveCard}
        cards={cards.filter(card => card.boardId === 2)}
      />
      <Board
        name="Thomas"
        boardId={3}
        moveCard={moveCard}
        addCard={addCard}
        cards={cards.filter(card => card.boardId === 3)}
      />
      <Board
        name="George"
        boardId={4}
        addCard={addCard}
        moveCard={moveCard}
        cards={cards.filter(card => card.boardId === 4)}
      />
    </div>
  );
}

export default App;
