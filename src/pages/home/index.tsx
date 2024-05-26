import { useEffect, useRef, useState } from 'react';

type Card = {
  description: string;
  id: string;
  title: string;
};

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [updateIndex, setUpdateIndex] = useState<number | null>(null);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  const newDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const updateDescriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (updateIndex !== null && updateDescriptionRef.current) {
      updateDescriptionRef.current.style.height = 'auto';
      updateDescriptionRef.current.style.height = `${updateDescriptionRef.current.scrollHeight}px`;
    }
  }, [updateIndex]);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const handleAddCard = () => {
    if (newTitle && newDescription) {
      setCards([...cards, { description: newDescription, id: generateId(), title: newTitle }]);
      setNewTitle('');
      setNewDescription('');
      if (newDescriptionRef.current) {
        newDescriptionRef.current.style.height = 'auto';
      }
    }
  };

  const handleUpdateCard = (index: number) => {
    setUpdateTitle(cards[index].title);
    setUpdateDescription(cards[index].description);
    setUpdateIndex(index);
  };

  const handleUpdateSaveCard = (index: number) => {
    const newCards = [...cards];
    newCards[index] = {
      description: updateDescription,
      id: newCards[index].id,
      title: updateTitle,
    };
    setCards(newCards);
    setUpdateIndex(null);
  };

  const handleDeleteCard = (index: number) => {
    const newCards = cards.filter((_, index_) => index_ !== index);
    setCards(newCards);
  };

  const adjustHeight = (element: HTMLTextAreaElement) => {
    const target = element;
    target.style.height = 'auto';
    target.style.height = `${element.scrollHeight}px`;
  };

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <h1>Welcome!</h1>
      <div
        style={{
          border: '1px solid black',
          margin: '10px',
          padding: '10px',
          width: '50%',
        }}
      >
        <input
          placeholder="Title"
          type="text"
          value={newTitle}
          style={{
            margin: '5px',
            padding: '5px',
            width: '90%',
          }}
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <textarea
          ref={newDescriptionRef}
          placeholder="Description"
          value={newDescription}
          style={{
            margin: '5px',
            overflow: 'hidden',
            padding: '5px',
            resize: 'none',
            width: '90%',
          }}
          onChange={(event) => setNewDescription(event.target.value)}
          onInput={(event) => adjustHeight(event.currentTarget)}
        />
        <button
          type="button"
          style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            margin: '5px',
            padding: '5px',
          }}
          onClick={handleAddCard}
        >
          Add Card
        </button>
      </div>
      {cards.map((card, index) => (
        <div
          key={card.id}
          style={{
            border: '1px solid black',
            margin: '10px',
            padding: '10px',
            width: '50%',
          }}
        >
          {updateIndex === index ? (
            <div>
              <input
                type="text"
                value={updateTitle}
                style={{
                  margin: '5px',
                  padding: '5px',
                  width: '90%',
                }}
                onChange={(event) => setUpdateTitle(event.target.value)}
              />
              <textarea
                ref={updateDescriptionRef}
                value={updateDescription}
                style={{
                  margin: '5px',
                  overflow: 'hidden',
                  padding: '5px',
                  resize: 'none',
                  width: '90%',
                }}
                onChange={(event) => setUpdateDescription(event.target.value)}
                onInput={(event) => adjustHeight(event.currentTarget)}
              />
              <button
                type="button"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  margin: '5px',
                  padding: '5px',
                }}
                onClick={() => handleUpdateSaveCard(index)}
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <button
                type="button"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  margin: '5px',
                  padding: '5px',
                }}
                onClick={() => handleUpdateCard(index)}
              >
                Update Card
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  margin: '5px',
                  padding: '5px',
                }}
                onClick={() => handleDeleteCard(index)}
              >
                Delete Card
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
