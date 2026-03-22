import { useEffect, useMemo, useRef, useState } from 'react'

const CATEGORY_WORDS = {
  Animales: [
    'Tigre',
    'Delfin',
    'Jirafa',
    'Pulpo',
    'Canguro',
    'Pinguino',
    'Elefante',
    'Lobo',
    'Leon',
    'Pantera',
    'Koala',
    'Mapache',
    'Hipopotamo',
    'Rinoceronte',
    'Cebra',
    'Avestruz',
    'Aguila',
    'Halcon',
    'Buho',
    'Cocodrilo',
    'Lagarto',
    'Tortuga',
    'Foca',
    'Ballena',
    'Zorro',
    'Oso',
    'Ardilla',
    'Camello',
    'Gorila',
    'Venado',
  ],
  Comida: [
    'Taco',
    'Hamburguesa',
    'Paella',
    'Sushi',
    'Lasana',
    'Enchiladas',
    'Pizza',
    'Ceviche',
    'Burrito',
    'Empanada',
    'Tamal',
    'Pozole',
    'Ramen',
    'Pasta',
    'Croissant',
    'Hotdog',
    'Quesadilla',
    'Mole',
    'Tostada',
    'Panini',
    'Falafel',
    'Hummus',
    'Donut',
    'Brownie',
    'Gelatina',
    'Helado',
    'Chilaquiles',
    'Sopa',
    'Sandwich',
    'Albondigas',
  ],
  Paises: [
    'Mexico',
    'Japon',
    'Brasil',
    'Canada',
    'Italia',
    'Marruecos',
    'Argentina',
    'Noruega',
    'Francia',
    'Alemania',
    'Portugal',
    'Chile',
    'Peru',
    'Colombia',
    'Uruguay',
    'Australia',
    'India',
    'China',
    'Corea del Sur',
    'Egipto',
    'Grecia',
    'Turquia',
    'Sudafrica',
    'Suiza',
    'Suecia',
    'Finlandia',
    'Irlanda',
    'Belgica',
    'Austria',
    'Tailandia',
  ],
  Cine: [
    'Titanic',
    'Avatar',
    'Gladiador',
    'Coco',
    'Shrek',
    'Rocky',
    'Frozen',
    'Inception',
    'Matrix',
    'Interstellar',
    'Toy Story',
    'Cars',
    'Up',
    'Moana',
    'Mulan',
    'Encanto',
    'Joker',
    'Alien',
    'Terminator',
    'Deadpool',
    'Barbie',
    'Oppenheimer',
    'Cazafantasmas',
    'Superman',
    'Batman',
    'Spiderman',
    'Ratatouille',
    'Dune',
    'Madagascar',
    'Tarzan',
  ],
  Profesiones: [
    'Medico',
    'Arquitecto',
    'Chef',
    'Bombero',
    'Piloto',
    'Fotografo',
    'Programador',
    'Abogado',
    'Enfermero',
    'Dentista',
    'Veterinario',
    'Profesor',
    'Ingeniero',
    'Disenador',
    'Carpintero',
    'Electricista',
    'Plomero',
    'Mecanico',
    'Periodista',
    'Actor',
    'Cantante',
    'Policia',
    'Soldado',
    'Jardinero',
    'Panadero',
    'Peluquero',
    'Contador',
    'Farmaceutico',
    'Astronauta',
    'Traductor',
  ],
  Deportes: [
    'Futbol',
    'Baloncesto',
    'Tenis',
    'Beisbol',
    'Natacion',
    'Boxeo',
    'Ciclismo',
    'Golf',
    'Voleibol',
    'Rugby',
    'Esgrima',
    'Karate',
    'Judo',
    'Atletismo',
    'Surf',
    'Patinaje',
    'Snowboard',
    'Escalada',
    'Remo',
    'Hockey',
    'Badminton',
    'Handball',
    'Gimnasia',
    'Polo',
    'Triatlon',
    'Lucha libre',
    'Automovilismo',
    'Buceo',
    'Skate',
    'Padel',
  ],
  Tecnologia: [
    'Laptop',
    'Smartphone',
    'Tablet',
    'Auriculares',
    'Dron',
    'Robot',
    'Teclado',
    'Mouse',
    'Monitor',
    'Impresora',
    'Router',
    'Servidor',
    'USB',
    'Camara',
    'Microfono',
    'Consola',
    'Proyector',
    'Smartwatch',
    'Bateria',
    'Altavoz',
    'Sensor',
    'Bluetooth',
    'Wifi',
    'Codigo',
    'Nube',
    'App',
    'Firewall',
    'Chip',
    'Pantalla',
    'Podcast',
  ],
  Musica: [
    'Guitarra',
    'Piano',
    'Bateria',
    'Violin',
    'Trompeta',
    'Saxofon',
    'Flauta',
    'Microfono',
    'Bajo',
    'Maracas',
    'Acordeon',
    'Arpa',
    'Cello',
    'Tambor',
    'Coro',
    'Opera',
    'Rock',
    'Pop',
    'Jazz',
    'Reggae',
    'Salsa',
    'Cumbia',
    'Merengue',
    'Ranchera',
    'Rap',
    'DJ',
    'Vinilo',
    'Concierto',
    'Melodia',
    'Karaoke',
  ],
  Lugares: [
    'Playa',
    'Montana',
    'Bosque',
    'Desierto',
    'Museo',
    'Aeropuerto',
    'Biblioteca',
    'Parque',
    'Restaurante',
    'Escuela',
    'Hospital',
    'Castillo',
    'Puente',
    'Mercado',
    'Estadio',
    'Teatro',
    'Catedral',
    'Hotel',
    'Puerto',
    'Zoologico',
    'Cine',
    'Acuario',
    'Universidad',
    'Faro',
    'Templo',
    'Isla',
    'Volcan',
    'Cascada',
    'Granja',
    'Palacio',
  ],
  Marcas: [
    'Nike',
    'Adidas',
    'Apple',
    'Samsung',
    'Toyota',
    'Honda',
    'Sony',
    'Nintendo',
    'Lego',
    'Pepsi',
    'Coca-Cola',
    'Starbucks',
    'Ikea',
    'Rolex',
    'Ferrari',
    'Puma',
    'Gucci',
    'Prada',
    'Zara',
    'Netflix',
    'Amazon',
    'Google',
    'Microsoft',
    'Xiaomi',
    'Hyundai',
    'Kia',
    'Shell',
    'Nestle',
    'Spotify',
    'Uber',
  ],
}

const GAME_STAGES = {
  setup: 'setup',
  reveal: 'reveal',
  timer: 'timer',
  summary: 'summary',
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const ROUND_TIMES = [1, 2, 3, 4, 5]
const REVEAL_THRESHOLD = 180
const SWIPE_PROGRESS_CURVE = 1.35

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function pickImpostorIndexes(playerCount, impostorCount) {
  const indexes = new Set()

  while (indexes.size < impostorCount) {
    indexes.add(Math.floor(Math.random() * playerCount))
  }

  return indexes
}

function createGame({ playerCount, impostorCount, category }) {
  const word = randomItem(CATEGORY_WORDS[category])
  const impostorIndexes = pickImpostorIndexes(playerCount, impostorCount)

  return Array.from({ length: playerCount }, (_, index) => ({
    id: index + 1,
    name: `Jugador ${index + 1}`,
    isImpostor: impostorIndexes.has(index),
    word,
    category,
  }))
}

function createDefaultNames(playerCount) {
  return Array.from({ length: playerCount }, (_, index) => `Jugador ${index + 1}`)
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function App() {
  const categories = useMemo(() => Object.keys(CATEGORY_WORDS), [])
  const [playerCount, setPlayerCount] = useState(6)
  const [impostorCount, setImpostorCount] = useState(1)
  const [roundMinutes, setRoundMinutes] = useState(3)
  const [category, setCategory] = useState(categories[0])
  const [playerNames, setPlayerNames] = useState(() => createDefaultNames(6))
  const [players, setPlayers] = useState([])
  const [stage, setStage] = useState(GAME_STAGES.setup)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasSeenRole, setHasSeenRole] = useState(false)
  const [votes, setVotes] = useState([])
  const [showVoteResult, setShowVoteResult] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(roundMinutes * 60)
  const [startingPlayerId, setStartingPlayerId] = useState(null)
  const startYRef = useRef(null)
  const swipeDistanceRef = useRef(0)
  const revealThreshold = REVEAL_THRESHOLD

  useEffect(() => {
    setImpostorCount((current) => clamp(current, 1, Math.min(3, playerCount - 1)))
  }, [playerCount])

  useEffect(() => {
    setPlayerNames((current) => {
      const nextNames = createDefaultNames(playerCount)

      return nextNames.map((fallback, index) => current[index]?.trim() || fallback)
    })
  }, [playerCount])

  useEffect(() => {
    if (stage !== GAME_STAGES.timer) {
      return undefined
    }

    if (remainingSeconds <= 0) {
      setStage(GAME_STAGES.summary)
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setRemainingSeconds((current) => current - 1)
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [remainingSeconds, stage])

  const currentPlayer = players[currentIndex]
  const canContinue = hasSeenRole

  function startGame() {
    const nextPlayers = createGame({ playerCount, impostorCount, category })
      .map((player, index) => ({
        ...player,
        name: playerNames[index]?.trim() || `Jugador ${index + 1}`,
      }))

    setPlayers(nextPlayers)
    setCurrentIndex(0)
    setHasSeenRole(false)
    setSwipeDistance(0)
    setVotes([])
    setShowVoteResult(false)
    setRemainingSeconds(roundMinutes * 60)
    setStartingPlayerId(null)
    swipeDistanceRef.current = 0
    setStage(GAME_STAGES.reveal)
  }

  function resetGame() {
    setPlayers([])
    setCurrentIndex(0)
    setHasSeenRole(false)
    setSwipeDistance(0)
    setVotes([])
    setShowVoteResult(false)
    setRemainingSeconds(roundMinutes * 60)
    setStartingPlayerId(null)
    swipeDistanceRef.current = 0
    setStage(GAME_STAGES.setup)
  }

  function updatePlayerName(index, value) {
    setPlayerNames((current) => current.map((name, nameIndex) => (nameIndex === index ? value : name)))
  }

  function toggleVote(playerId) {
    setVotes((current) => {
      if (current.includes(playerId)) {
        return current.filter((voteId) => voteId !== playerId)
      }

      if (current.length >= impostorCount) {
        return current
      }

      return [...current, playerId]
    })
  }

  function finishVoting() {
    if (votes.length !== impostorCount) {
      return
    }

    setShowVoteResult(true)
  }

  function handleStartSwipe(clientY) {
    startYRef.current = clientY
    setIsDragging(true)
  }

  function handleMoveSwipe(clientY) {
    if (!isDragging || startYRef.current === null) {
      return
    }

    const nextDistance = clamp(startYRef.current - clientY, 0, revealThreshold)
    swipeDistanceRef.current = nextDistance
    setSwipeDistance(nextDistance)
  }

  function finishSwipe() {
    if (!isDragging) {
      return
    }

    setIsDragging(false)

    if (swipeDistanceRef.current >= revealThreshold) {
      setHasSeenRole(true)
    }

    setSwipeDistance(0)
    swipeDistanceRef.current = 0
    startYRef.current = null
  }

  function goToNextPlayer() {
    if (!canContinue) {
      return
    }

    if (currentIndex === players.length - 1) {
      setStartingPlayerId(randomItem(players).id)
      setRemainingSeconds(roundMinutes * 60)
      setStage(GAME_STAGES.timer)
      return
    }

    setCurrentIndex((index) => index + 1)
    setHasSeenRole(false)
    setSwipeDistance(0)
    swipeDistanceRef.current = 0
  }

  function renderSetup() {
    return (
      <section className="panel setup-panel">
        <img className="hero-logo" src="/logoimpostor.png" alt="Logo de El Impostor" />
        <p className="intro">
          Configura la ronda, pasa el telefono y haz que cada jugador deslice hacia arriba para ver si
          recibe la palabra o le toca ser impostor.
        </p>

        <div className="config-grid">
          <label className="field">
            <span>Jugadores</span>
            <div className="stepper">
              <button type="button" onClick={() => setPlayerCount((value) => clamp(value - 1, 3, 12))}>
                -
              </button>
              <strong>{playerCount}</strong>
              <button type="button" onClick={() => setPlayerCount((value) => clamp(value + 1, 3, 12))}>
                +
              </button>
            </div>
          </label>

          <label className="field">
            <span>Impostores</span>
            <div className="stepper">
              <button
                type="button"
                onClick={() =>
                  setImpostorCount((value) => clamp(value - 1, 1, Math.min(3, playerCount - 1)))
                }
              >
                -
              </button>
              <strong>{impostorCount}</strong>
              <button
                type="button"
                onClick={() =>
                  setImpostorCount((value) => clamp(value + 1, 1, Math.min(3, playerCount - 1)))
                }
              >
                +
              </button>
            </div>
          </label>
        </div>

        <div className="field">
          <span>Categoria</span>
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={item === category ? 'category-pill active' : 'category-pill'}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <span>Tiempo de ronda</span>
          <div className="category-list">
            {ROUND_TIMES.map((minutes) => (
              <button
                key={minutes}
                type="button"
                className={minutes === roundMinutes ? 'category-pill active' : 'category-pill'}
                onClick={() => setRoundMinutes(minutes)}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <span>Nombres</span>
          <div className="name-list">
            {playerNames.map((name, index) => (
              <input
                key={index}
                className="name-input"
                type="text"
                value={name}
                maxLength={18}
                onChange={(event) => updatePlayerName(index, event.target.value)}
                placeholder={`Jugador ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button type="button" className="primary-button" onClick={startGame}>
          Empezar ronda
        </button>
      </section>
    )
  }

  function renderReveal() {
    const progress = Math.min(swipeDistance / revealThreshold, 1)
    const visualProgress = Math.pow(progress, SWIPE_PROGRESS_CURVE)
    const statusLabel = hasSeenRole
      ? 'Rol visto, ya puedes continuar'
      : isDragging
        ? 'Sigue deslizando hasta arriba'
        : 'Desliza hacia arriba'

    return (
      <section className="panel reveal-panel">
        <div className="player-badge">{currentIndex + 1}/{players.length}</div>

        <div
          className="reveal-card"
          onPointerDown={(event) => handleStartSwipe(event.clientY)}
          onPointerMove={(event) => handleMoveSwipe(event.clientY)}
          onPointerUp={finishSwipe}
          onPointerCancel={finishSwipe}
          onPointerLeave={finishSwipe}
        >
          <div className="reveal-content">
            <p className="card-label">Categoria: {currentPlayer.category}</p>
            <p className="reveal-player-name">{currentPlayer.name}</p>
            <h2>{currentPlayer.isImpostor ? 'Eres el impostor' : 'Tu palabra es'}</h2>
            {currentPlayer.isImpostor ? (
              <p className="role-copy">No recibes palabra. Mezclate con el grupo y descubre la respuesta.</p>
            ) : (
              <p className="word">{currentPlayer.word}</p>
            )}
          </div>

          <div
            className="reveal-cover"
            style={{
              transform: `translateY(${-visualProgress * 100}%)`,
            }}
          >
            <div className="reveal-shine" style={{ transform: `translateY(${100 - visualProgress * 100}%)` }} />
            <>
              <p className="card-label">Categoria: {currentPlayer.category}</p>
              <p className="reveal-player-name">{currentPlayer.name}</p>
              <h2>Desliza para descubrir tu rol</h2>
              <p className="swipe-copy">Mientras lo arrastras se ve. Al soltar, se tapa otra vez.</p>
              <div className="swipe-meter">
                <div className="swipe-meter-fill" style={{ height: `${visualProgress * 100}%` }} />
              </div>
              <div className="swipe-hint">
                <span>{statusLabel}</span>
                <strong>{Math.round(visualProgress * 100)}%</strong>
              </div>
            </>
          </div>
        </div>

        <button type="button" className="primary-button" onClick={goToNextPlayer} disabled={!canContinue}>
          {currentIndex === players.length - 1 ? 'Ir a votacion' : 'Continuar'}
        </button>

        <button type="button" className="ghost-button" onClick={resetGame}>
          Cancelar ronda
        </button>
      </section>
    )
  }

  function renderTimer() {
    const progress = remainingSeconds / (roundMinutes * 60)
    const startingPlayer = players.find((player) => player.id === startingPlayerId) ?? players[0]

    return (
      <section className="panel summary-panel">
        <div className="eyebrow">Tiempo de juego</div>
        <h2>La ronda esta activa</h2>
        <p className="intro">Hagan preguntas, acusen y esperen a que termine el tiempo para votar.</p>

        <div className="timer-ring">
          <div
            className="timer-ring-fill"
            style={{ transform: `scaleY(${Math.max(progress, 0)})` }}
          />
          <strong>{formatTime(remainingSeconds)}</strong>
        </div>

        <div className="summary-box">
          <span>Categoria elegida</span>
          <strong>{category}</strong>
        </div>

        <div className="summary-box">
          <span>Empieza</span>
          <strong>{startingPlayer?.name}</strong>
        </div>

        <button type="button" className="primary-button" onClick={() => setStage(GAME_STAGES.summary)}>
          Terminar antes e ir a votar
        </button>
      </section>
    )
  }

  function renderSummary() {
    const impostors = players.filter((player) => player.isImpostor)
    const guessedAll =
      votes.length === impostors.length && impostors.every((player) => votes.includes(player.id))

    return (
      <section className="panel summary-panel">
        <div className="eyebrow">Votacion final</div>
        <h2>Quien es el impostor</h2>
        <p className="intro">
          Selecciona {impostorCount === 1 ? 'al sospechoso' : `a los ${impostorCount} sospechosos`} sin
          mostrar la palabra de la ronda.
        </p>

        <div className="vote-list">
          {players.map((player) => (
            <button
              key={player.id}
              type="button"
              className={votes.includes(player.id) ? 'vote-card selected' : 'vote-card'}
              onClick={() => toggleVote(player.id)}
              disabled={!votes.includes(player.id) && votes.length >= impostorCount}
            >
              <span>Jugador</span>
              <strong>{player.name}</strong>
            </button>
          ))}
        </div>

        <div className="summary-box">
          <span>Votos elegidos</span>
          <strong>
            {votes.length}/{impostorCount}
          </strong>
        </div>

        {!showVoteResult ? (
          <button
            type="button"
            className="primary-button"
            onClick={finishVoting}
            disabled={votes.length !== impostorCount}
          >
            Confirmar votacion
          </button>
        ) : (
          <div className="result-box">
            <span>{guessedAll ? 'Acierto total' : 'No acertaron todos'}</span>
            <strong>{impostors.map((player) => player.name).join(', ')}</strong>
          </div>
        )}

        <button type="button" className="ghost-button" onClick={resetGame}>
          Nueva partida
        </button>
      </section>
    )
  }

  return (
    <main className="app-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      {stage === GAME_STAGES.setup && renderSetup()}
      {stage === GAME_STAGES.reveal && currentPlayer && renderReveal()}
      {stage === GAME_STAGES.timer && renderTimer()}
      {stage === GAME_STAGES.summary && renderSummary()}
    </main>
  )
}

export default App
