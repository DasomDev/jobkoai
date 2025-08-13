import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [cards, setCards] = useState([
    { id: 1, title: '카드 1', content: '첫 번째 카드 내용입니다.' },
    { id: 2, title: '카드 2', content: '두 번째 카드 내용입니다.' },
    { id: 3, title: '카드 3', content: '세 번째 카드 내용입니다.' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('폼이 제출되었습니다!');
    console.log('폼 데이터:', formData);
  };

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      title: `카드 ${cards.length + 1}`,
      content: `새로운 카드 ${cards.length + 1}의 내용입니다.`
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>JobKoAI - 간단한 UI 예시</h1>
      </header>
      
      <main className="App-main">
        {/* 폼 섹션 */}
        <section className="form-section">
          <h2>연락처 폼</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">이름:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">이메일:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">메시지:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              제출하기
            </button>
          </form>
        </section>

        {/* 카드 섹션 */}
        <section className="cards-section">
          <div className="cards-header">
            <h2>카드 목록</h2>
            <button onClick={addCard} className="add-card-btn">
              새 카드 추가
            </button>
          </div>
          
          <div className="cards-grid">
            {cards.map(card => (
              <div key={card.id} className="card">
                <h3>{card.title}</h3>
                <p>{card.content}</p>
                <button 
                  className="card-btn"
                  onClick={() => alert(`${card.title} 클릭됨!`)}
                >
                  자세히 보기
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
