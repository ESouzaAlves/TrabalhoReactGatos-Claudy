import React, { useState, useEffect } from 'react';

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search';

function CatImageGenerator() {
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const fetchCatImage = async () => {
    setIsLoading(true);
    setError(null);
    setCatImageUrl(null); 

    try {
      const response = await fetch(CAT_API_URL);

      if (!response.ok) {
      
        throw new Error(`Erro ao buscar a imagem: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        setCatImageUrl(data[0].url);
      } else {
        throw new Error('Nenhum gato foi encontrado na resposta da API.');
      }

    } catch (err) {
      console.error('Erro na requisição da API:', err);
      setError('Desculpe, não foi possível carregar o gato. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, [fetchTrigger]); 

  const handleNextImage = () => {
    setFetchTrigger(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gerador de Gatinhos</h1>
      
      <button 
        onClick={handleNextImage} 
        disabled={isLoading} 
        style={{ margin: '15px 0', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {isLoading ? 'Carregando...' : 'Clique para o próximo gato'}
      </button>

      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      {isLoading && <p>Buscando outro gato...</p>}

      {catImageUrl && !isLoading && (
        <div style={{ marginTop: '20px' }}>
          <img 
            src={catImageUrl} 
            alt="Um gato aleatório"

            style={{ 
              maxWidth: '600px', 
              maxHeight: '500px', 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)' 
            }}
          />
        </div>
      )}
    </div>
  );
}


export default CatImageGenerator;