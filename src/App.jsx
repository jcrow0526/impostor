import { useEffect, useMemo, useRef, useState } from 'react'
import {
  firebaseEnabled,
  getRoomRef,
  getRoomPlayerRef,
  onValue,
  readRoomSnapshot,
  readRoomsSnapshot,
  remove,
  set,
  update,
} from './firebase'

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

const ONLINE_STAGES = {
  lobby: 'lobby',
  play: 'play',
  summary: 'summary',
}

const LOCAL_STORAGE_KEYS = {
  playerId: 'impostor-online-player-id',
  roomCode: 'impostor-online-room-code',
  playerName: 'impostor-online-player-name',
}

const ROUND_TIMES = [1, 2, 3, 4, 5]
const ROOM_TTLS = {
  lobby: 30 * 60 * 1000,
  play: 2 * 60 * 60 * 1000,
  summary: 30 * 60 * 1000,
}
const PLAY_MODES = {
  local: 'local',
  online: 'online',
}
const REVEAL_THRESHOLD = 180
const SWIPE_PROGRESS_CURVE = 1.35

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `player-${Math.random().toString(36).slice(2, 10)}`
}

function createRoomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

function pickImpostorIndexes(playerCount, impostorCount) {
  const indexes = new Set()

  while (indexes.size < impostorCount) {
    indexes.add(Math.floor(Math.random() * playerCount))
  }

  return indexes
}

function createDefaultNames(playerCount) {
  return Array.from({ length: playerCount }, (_, index) => `Jugador ${index + 1}`)
}

function createLocalGame({ playerCount, impostorCount, category }) {
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

function buildOnlineRound(players, config) {
  const playerList = [...players].sort((a, b) => (a.joinedAt ?? 0) - (b.joinedAt ?? 0))
  const word = randomItem(CATEGORY_WORDS[config.category])
  const impostorIndexes = pickImpostorIndexes(playerList.length, config.impostorCount)
  const revealOrder = playerList.map((player) => player.id)
  const playerUpdates = {}

  playerList.forEach((player, index) => {
    const isImpostor = impostorIndexes.has(index)

    playerUpdates[`players/${player.id}/isImpostor`] = isImpostor
    playerUpdates[`players/${player.id}/secretWord`] = isImpostor ? '' : word
    playerUpdates[`players/${player.id}/roundCategory`] = config.category
  })

  return {
    playerUpdates,
    game: {
      category: config.category,
      word,
      revealOrder,
      revealIndex: 0,
      turnIndex: 0,
      startedAt: Date.now(),
      endsAt: null,
      resultRevealed: false,
      voteReadyBy: {},
      votesByPlayer: {},
    },
  }
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(totalSeconds, 0)
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function normalizePlayers(playersMap) {
  return Object.values(playersMap ?? {}).sort((a, b) => (a.joinedAt ?? 0) - (b.joinedAt ?? 0))
}

function canRevealOnlineResult(room) {
  return Boolean(room?.game?.votesByPlayer) && Object.keys(room.game.votesByPlayer).length > 0
}

function buildVoteTotals(votesByPlayer) {
  const totals = {}

  Object.values(votesByPlayer ?? {}).forEach((votes) => {
    if (!Array.isArray(votes)) {
      return
    }

    votes.forEach((playerId) => {
      totals[playerId] = (totals[playerId] ?? 0) + 1
    })
  })

  return totals
}

function getRoomExpiry(status, now = Date.now()) {
  return now + (ROOM_TTLS[status] ?? ROOM_TTLS.lobby)
}

function createRoomMeta(status, now = Date.now()) {
  return {
    lastActivityAt: now,
    expiresAt: getRoomExpiry(status, now),
  }
}

function isRoomExpired(room, now = Date.now()) {
  return Boolean(room?.expiresAt) && room.expiresAt <= now
}

function getRoomCodeFromUrl() {
  return new URLSearchParams(window.location.search).get('room')?.trim().toUpperCase() || ''
}

function setInviteRoomInUrl(roomCode) {
  const nextUrl = new URL(window.location.href)

  if (roomCode) {
    nextUrl.searchParams.set('room', roomCode)
  } else {
    nextUrl.searchParams.delete('room')
  }

  window.history.replaceState({}, '', nextUrl)
}

function App() {
  const categories = useMemo(() => Object.keys(CATEGORY_WORDS), [])
  const [playMode, setPlayMode] = useState(PLAY_MODES.local)
  const inviteRoomCode = getRoomCodeFromUrl()

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

  const [onlineName, setOnlineName] = useState(
    () => window.localStorage.getItem(LOCAL_STORAGE_KEYS.playerName) || '',
  )
  const [onlineRoomCode, setOnlineRoomCode] = useState(
    () => window.localStorage.getItem(LOCAL_STORAGE_KEYS.roomCode) || '',
  )
  const [joinRoomCode, setJoinRoomCode] = useState(inviteRoomCode)
  const [onlineRoom, setOnlineRoom] = useState(null)
  const [onlineError, setOnlineError] = useState('')
  const [onlineInfo, setOnlineInfo] = useState('')
  const [onlineLoading, setOnlineLoading] = useState(false)
  const [onlineVotes, setOnlineVotes] = useState([])
  const [onlineNow, setOnlineNow] = useState(Date.now())

  const playerIdRef = useRef(window.localStorage.getItem(LOCAL_STORAGE_KEYS.playerId) || createId())
  const startYRef = useRef(null)
  const swipeDistanceRef = useRef(0)

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.playerId, playerIdRef.current)
  }, [])

  useEffect(() => {
    if (inviteRoomCode) {
      setPlayMode(PLAY_MODES.online)
      setJoinRoomCode(inviteRoomCode)
    }
  }, [inviteRoomCode])

  useEffect(() => {
    if (!inviteRoomCode || !onlineRoomCode || inviteRoomCode === onlineRoomCode) {
      return
    }

    cleanupPlayerSession(onlineRoomCode, { clearUrl: false, nextJoinCode: inviteRoomCode }).catch(() => {})
  }, [inviteRoomCode, onlineRoomCode])

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

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.playerName, onlineName)
  }, [onlineName])

  useEffect(() => {
    if (!onlineRoomCode || !firebaseEnabled) {
      setOnlineRoom(null)
      return undefined
    }

    const roomRef = getRoomRef(onlineRoomCode)
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomValue = snapshot.val()

      if (!roomValue) {
        setOnlineRoom(null)
        setOnlineError('La sala ya no existe.')
        return
      }

      if (isRoomExpired(roomValue)) {
        remove(getRoomRef(onlineRoomCode)).catch(() => {})
        setOnlineRoom(null)
        setOnlineRoomCode('')
        setOnlineError('La sala expiro.')
        return
      }

      setOnlineRoom(roomValue)
      setOnlineError('')
    })

    return unsubscribe
  }, [onlineRoomCode])

  useEffect(() => {
    if (!onlineRoomCode) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.roomCode)
      return
    }

    window.localStorage.setItem(LOCAL_STORAGE_KEYS.roomCode, onlineRoomCode)
    setInviteRoomInUrl(onlineRoomCode)
  }, [onlineRoomCode])

  useEffect(() => {
    const myVotes = onlineRoom?.game?.votesByPlayer?.[playerIdRef.current]
    setOnlineVotes(Array.isArray(myVotes) ? myVotes : [])
  }, [onlineRoom?.game?.votesByPlayer])

  useEffect(() => {
    if (onlineRoom?.status !== ONLINE_STAGES.play) {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setOnlineNow(Date.now())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [onlineRoom?.status])

  useEffect(() => {
    if (
      onlineRoom?.status === ONLINE_STAGES.play &&
      onlineRoom?.hostId === playerIdRef.current &&
      onlineRoom?.game?.endsAt &&
      onlineNow >= onlineRoom.game.endsAt
    ) {
      update(getRoomRef(onlineRoomCode), { status: ONLINE_STAGES.summary }).catch(() => {})
    }
  }, [onlineNow, onlineRoom, onlineRoomCode])

  useEffect(() => {
    const hostMissing =
      onlineRoom &&
      onlineRoom.hostId &&
      !(onlineRoom.players ?? {})[onlineRoom.hostId] &&
      playerIdRef.current === normalizePlayers(onlineRoom.players)[0]?.id

    if (!hostMissing) {
      return
    }

    update(getRoomRef(onlineRoomCode), { hostId: playerIdRef.current }).catch(() => {})
  }, [onlineRoom, onlineRoomCode])

  useEffect(() => {
    if (!firebaseEnabled || !onlineRoomCode || !onlineRoom) {
      return
    }

    const currentPlayer = onlineRoom.players?.[playerIdRef.current]

    if (currentPlayer) {
      return
    }

    update(getRoomRef(onlineRoomCode), {
      [`players/${playerIdRef.current}`]: {
        id: playerIdRef.current,
        name: onlineName.trim() || 'Jugador',
        joinedAt: Date.now(),
      },
    }).catch(() => {})
  }, [onlineName, onlineRoom, onlineRoomCode])

  const currentPlayer = players[currentIndex]
  const canContinue = hasSeenRole

  const onlinePlayers = normalizePlayers(onlineRoom?.players)
  const myOnlinePlayer = onlinePlayers.find((player) => player.id === playerIdRef.current)
  const isOnlineHost = onlineRoom?.hostId === playerIdRef.current
  const onlineConfig = onlineRoom?.config ?? { category, impostorCount, roundMinutes }
  const onlineTurnPlayerId =
    onlineRoom?.game?.revealOrder?.[onlineRoom?.game?.turnIndex ?? 0] ?? onlinePlayers[0]?.id
  const onlineTurnPlayer = onlinePlayers.find((player) => player.id === onlineTurnPlayerId)
  const onlineRemainingSeconds = Math.ceil(
    ((onlineRoom?.game?.endsAt ?? onlineNow) - onlineNow) / 1000,
  )
  const onlineImpostors = onlinePlayers.filter((player) => player.isImpostor)
  const onlineVoteReadyCount = Object.keys(onlineRoom?.game?.voteReadyBy ?? {}).length
  const onlineVoteThreshold = Math.floor(onlinePlayers.length / 2) + 1
  const iAmReadyForVote = Boolean(onlineRoom?.game?.voteReadyBy?.[playerIdRef.current])
  const onlineVoteTotals = buildVoteTotals(onlineRoom?.game?.votesByPlayer)
  const onlineMajorityThreshold = Math.floor(onlinePlayers.length / 2) + 1
  const autoSelectedPlayerIds = onlinePlayers
    .filter((player) => (onlineVoteTotals[player.id] ?? 0) >= onlineMajorityThreshold)
    .map((player) => player.id)

  useEffect(() => {
    if (
      onlineRoom?.status === ONLINE_STAGES.play &&
      onlineVoteReadyCount >= onlineVoteThreshold &&
      onlineVoteThreshold > 0
    ) {
      update(getRoomRef(onlineRoomCode), {
        status: ONLINE_STAGES.summary,
        ...createRoomMeta(ONLINE_STAGES.summary),
      }).catch(() => {})
    }
  }, [onlineRoom?.status, onlineRoomCode, onlineVoteReadyCount, onlineVoteThreshold])

  useEffect(() => {
    if (
      onlineRoom?.status === ONLINE_STAGES.summary &&
      autoSelectedPlayerIds.length > 0 &&
      !onlineRoom?.game?.resultRevealed
    ) {
      update(getRoomRef(onlineRoomCode), {
        ...createRoomMeta(ONLINE_STAGES.summary),
        'game/resultRevealed': true,
      }).catch(() => {})
    }
  }, [autoSelectedPlayerIds.length, onlineRoom?.game?.resultRevealed, onlineRoom?.status, onlineRoomCode])

  function startGame() {
    const nextPlayers = createLocalGame({ playerCount, impostorCount, category }).map((player, index) => ({
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
        return [...current.slice(1), playerId]
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

    const nextDistance = clamp(startYRef.current - clientY, 0, REVEAL_THRESHOLD)
    swipeDistanceRef.current = nextDistance
    setSwipeDistance(nextDistance)
  }

  function finishSwipe() {
    if (!isDragging) {
      return
    }

    setIsDragging(false)

    if (swipeDistanceRef.current >= REVEAL_THRESHOLD) {
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

  async function createOnlineRoom() {
    if (!firebaseEnabled) {
      setOnlineError('Falta configurar Firebase para habilitar las salas online.')
      return
    }

    const trimmedName = onlineName.trim() || 'Anfitrion'
    const roomCode = createRoomCode()
    const now = Date.now()

    setOnlineLoading(true)
    setOnlineError('')

    try {
      await cleanupExpiredRooms()
      await set(getRoomRef(roomCode), {
        hostId: playerIdRef.current,
        status: ONLINE_STAGES.lobby,
        createdAt: now,
        ...createRoomMeta(ONLINE_STAGES.lobby, now),
        config: {
          category,
          impostorCount,
          roundMinutes,
        },
        players: {
          [playerIdRef.current]: {
            id: playerIdRef.current,
            name: trimmedName,
            joinedAt: now,
          },
        },
        game: null,
      })

      setOnlineRoomCode(roomCode)
      setJoinRoomCode(roomCode)
      setOnlineInfo('')
    } catch (error) {
      setOnlineError('No se pudo crear la sala.')
    } finally {
      setOnlineLoading(false)
    }
  }

  async function joinOnlineRoom(roomCodeOverride = joinRoomCode) {
    if (!firebaseEnabled) {
      setOnlineError('Falta configurar Firebase para habilitar las salas online.')
      return
    }

    const roomCode = roomCodeOverride.trim().toUpperCase()
    const trimmedName = onlineName.trim() || 'Jugador'

    if (!roomCode) {
      setOnlineError('Escribe un codigo de sala.')
      return
    }

    setOnlineLoading(true)
    setOnlineError('')

    try {
      if (onlineRoomCode && onlineRoomCode !== roomCode) {
        await cleanupPlayerSession(onlineRoomCode, { clearUrl: false, nextJoinCode: roomCode })
      }

      await cleanupExpiredRooms()
      const snapshot = await readRoomSnapshot(roomCode)

      if (!snapshot.exists()) {
        setOnlineError('La sala no existe.')
        return
      }

      const room = snapshot.val()

      if (isRoomExpired(room)) {
        await remove(getRoomRef(roomCode))
        setOnlineError('La sala expiro.')
        return
      }

      if (room.status !== ONLINE_STAGES.lobby) {
        setOnlineError('La partida ya empezo. Entra antes de iniciar.')
        return
      }

      await update(getRoomRef(roomCode), {
        ...createRoomMeta(ONLINE_STAGES.lobby),
        [`players/${playerIdRef.current}`]: {
          id: playerIdRef.current,
          name: trimmedName,
          joinedAt: room.players?.[playerIdRef.current]?.joinedAt ?? Date.now(),
        },
      })

      setOnlineRoomCode(roomCode)
      setOnlineInfo('')
    } catch (error) {
      setOnlineError('No se pudo entrar a la sala.')
    } finally {
      setOnlineLoading(false)
    }
  }

  async function cleanupPlayerSession(roomCodeToLeave, options = {}) {
    const { clearUrl = true, nextJoinCode = '' } = options

    if (!roomCodeToLeave || !firebaseEnabled) {
      setOnlineRoomCode('')
      setOnlineRoom(null)
      if (nextJoinCode !== undefined) {
        setJoinRoomCode(nextJoinCode)
      }
      return
    }

    try {
      await remove(getRoomPlayerRef(roomCodeToLeave, playerIdRef.current))
      const roomSnapshot = await readRoomSnapshot(roomCodeToLeave)

      if (roomSnapshot.exists()) {
        const room = roomSnapshot.val()
        const remainingPlayers = normalizePlayers(room.players)

        if (remainingPlayers.length === 0) {
          await remove(getRoomRef(roomCodeToLeave))
        } else {
          await update(getRoomRef(roomCodeToLeave), {
            ...createRoomMeta(room.status ?? ONLINE_STAGES.lobby),
          })
        }
      }
    } catch (error) {
      // Ignore room cleanup errors on room switch.
    }

    setOnlineRoomCode('')
    setOnlineRoom(null)
    setJoinRoomCode(nextJoinCode)
    setOnlineVotes([])
    setOnlineInfo('')

    if (clearUrl) {
      setInviteRoomInUrl('')
    }
  }

  async function leaveOnlineRoom() {
    if (!onlineRoomCode || !firebaseEnabled) {
      setOnlineRoomCode('')
      setOnlineRoom(null)
      return
    }

    await cleanupPlayerSession(onlineRoomCode, { clearUrl: true, nextJoinCode: '' })
  }

  async function updateOnlineConfig(nextConfig) {
    if (!isOnlineHost || !onlineRoomCode) {
      return
    }

    try {
      await update(getRoomRef(onlineRoomCode), {
        ...createRoomMeta(ONLINE_STAGES.lobby),
        config: {
          ...onlineConfig,
          ...nextConfig,
        },
      })
    } catch (error) {
      setOnlineError('No se pudo guardar la configuracion.')
    }
  }

  async function startOnlineGame() {
    if (!isOnlineHost || !onlineRoomCode || onlinePlayers.length < 3) {
      return
    }

    const cappedImpostors = clamp(onlineConfig.impostorCount, 1, Math.min(3, onlinePlayers.length - 1))
    const nextConfig = { ...onlineConfig, impostorCount: cappedImpostors }
    const round = buildOnlineRound(onlinePlayers, nextConfig)
    const now = Date.now()

    try {
      await update(getRoomRef(onlineRoomCode), {
        status: ONLINE_STAGES.play,
        ...createRoomMeta(ONLINE_STAGES.play, now),
        config: nextConfig,
        game: {
          ...round.game,
          endsAt: now + nextConfig.roundMinutes * 60 * 1000,
        },
        ...round.playerUpdates,
      })
    } catch (error) {
      setOnlineError('No se pudo iniciar la partida.')
    }
  }

  async function advanceOnlineTurn() {
    if (!onlineRoomCode || !onlineRoom?.game?.revealOrder?.length) {
      return
    }

    const canAdvance = isOnlineHost || playerIdRef.current === onlineTurnPlayerId

    if (!canAdvance) {
      return
    }

    try {
      await update(getRoomRef(onlineRoomCode), {
        ...createRoomMeta(ONLINE_STAGES.play),
        'game/turnIndex':
          ((onlineRoom?.game?.turnIndex ?? 0) + 1) % (onlineRoom?.game?.revealOrder?.length ?? 1),
      })
    } catch (error) {
      setOnlineError('No se pudo cambiar el turno.')
    }
  }

  async function toggleVoteReady() {
    if (!onlineRoomCode || onlineRoom?.status !== ONLINE_STAGES.play) {
      return
    }

    try {
      await update(getRoomRef(onlineRoomCode), {
        ...createRoomMeta(ONLINE_STAGES.play),
        [`game/voteReadyBy/${playerIdRef.current}`]: iAmReadyForVote ? null : true,
      })
    } catch (error) {
      setOnlineError('No se pudo actualizar tu voto para ir a votacion.')
    }
  }

  async function restartOnlineGame() {
    if (!isOnlineHost || !onlineRoomCode) {
      return
    }

    const resetUpdates = {
      status: ONLINE_STAGES.lobby,
      game: null,
      ...createRoomMeta(ONLINE_STAGES.lobby),
    }

    onlinePlayers.forEach((player) => {
      resetUpdates[`players/${player.id}/isImpostor`] = null
      resetUpdates[`players/${player.id}/secretWord`] = null
      resetUpdates[`players/${player.id}/roundCategory`] = null
    })

    try {
      await update(getRoomRef(onlineRoomCode), resetUpdates)
    } catch (error) {
      setOnlineError('No se pudo volver al lobby.')
    }
  }

  async function saveOnlineVotes(nextVotes) {
    if (!onlineRoomCode) {
      return
    }

    try {
      await update(getRoomRef(onlineRoomCode), {
        ...createRoomMeta(ONLINE_STAGES.summary),
        [`game/votesByPlayer/${playerIdRef.current}`]: nextVotes,
      })
    } catch (error) {
      setOnlineError('No se pudieron guardar tus votos.')
    }
  }

  async function toggleOnlineVote(playerId) {
    const maxVotes = onlineConfig.impostorCount
    let nextVotes

    if (onlineVotes.includes(playerId)) {
      nextVotes = onlineVotes.filter((voteId) => voteId !== playerId)
    } else if (onlineVotes.length >= maxVotes) {
      nextVotes = [...onlineVotes.slice(1), playerId]
    } else {
      nextVotes = [...onlineVotes, playerId]
    }

    setOnlineVotes(nextVotes)
    await saveOnlineVotes(nextVotes)
  }

  async function revealOnlineResults() {
    if (!isOnlineHost || !onlineRoomCode || !canRevealOnlineResult(onlineRoom)) {
      return
    }

    try {
      await update(getRoomRef(onlineRoomCode), {
        ...createRoomMeta(ONLINE_STAGES.summary),
        'game/resultRevealed': true,
      })
    } catch (error) {
      setOnlineError('No se pudo mostrar el resultado.')
    }
  }

  async function shareInviteLink() {
    if (!onlineRoomCode) {
      return
    }

    const inviteUrl = new URL(window.location.origin)
    inviteUrl.searchParams.set('room', onlineRoomCode)
    const shareData = {
      title: 'Invitacion a sala de Impostor',
      text: `Entra a mi sala ${onlineRoomCode} y pon tu nombre para jugar.`,
      url: inviteUrl.toString(),
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(inviteUrl.toString())
      }

      setOnlineInfo('Link de invitacion listo para compartir.')
      setOnlineError('')
    } catch (error) {
      setOnlineError('No se pudo compartir el link de invitacion.')
    }
  }

  async function cleanupExpiredRooms() {
    if (!firebaseEnabled) {
      return
    }

    try {
      const snapshot = await readRoomsSnapshot()

      if (!snapshot.exists()) {
        return
      }

      const rooms = snapshot.val() ?? {}
      const now = Date.now()

      await Promise.all(
        Object.entries(rooms).map(async ([code, room]) => {
          const hasPlayers = normalizePlayers(room.players).length > 0

          if (!hasPlayers || isRoomExpired(room, now)) {
            await remove(getRoomRef(code))
          }
        }),
      )
    } catch (error) {
      // Cleanup is best-effort only.
    }
  }

  function renderModeSelector() {
    return (
      <div className="mode-switch">
        {Object.values(PLAY_MODES).map((mode) => (
          <button
            key={mode}
            type="button"
            className={playMode === mode ? 'category-pill active' : 'category-pill'}
            onClick={() => setPlayMode(mode)}
          >
            {mode === PLAY_MODES.local ? 'Presencial' : 'Online'}
          </button>
        ))}
      </div>
    )
  }

  function renderLocalSetup() {
    return (
      <>
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
      </>
    )
  }

  function renderOnlineSetup() {
    const isInsideRoom = Boolean(onlineRoomCode)
    const isInviteFlow = Boolean(joinRoomCode) && !isInsideRoom

    return (
      <>
        {!isInsideRoom && (
          <>
            <p className="intro">
              {isInviteFlow
                ? `Te invitaron a la sala ${joinRoomCode}. Solo pon tu nombre para entrar.`
                : 'Crea una sala, comparte el codigo y jueguen cada uno desde su celular o laptop mientras hablan por videollamada. La app solo sincroniza roles, ronda y turnos.'}
            </p>

            <div className="field">
              <span>Tu nombre</span>
              <input
                className="name-input"
                type="text"
                value={onlineName}
                maxLength={18}
                onChange={(event) => setOnlineName(event.target.value)}
                placeholder="Tu nombre"
              />
            </div>
          </>
        )}

        {!firebaseEnabled && (
          <div className="notice-box warning-box">
            Falta configurar Firebase. Agrega las variables `VITE_FIREBASE_API_KEY`,
            `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_DATABASE_URL`, `VITE_FIREBASE_PROJECT_ID`,
            `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID` y
            `VITE_FIREBASE_APP_ID`.
          </div>
        )}

        {!onlineRoomCode ? (
          <>
            {isInviteFlow ? (
              <button
                type="button"
                className="primary-button"
                onClick={() => joinOnlineRoom(joinRoomCode)}
                disabled={onlineLoading}
              >
                Entrar con invitacion
              </button>
            ) : (
              <>
                <button type="button" className="primary-button" onClick={createOnlineRoom} disabled={onlineLoading}>
                  Crear sala
                </button>

                <div className="join-row">
                  <input
                    className="name-input"
                    type="text"
                    value={joinRoomCode}
                    maxLength={6}
                    onChange={(event) => setJoinRoomCode(event.target.value.toUpperCase())}
                    placeholder="Codigo"
                  />
                  <button
                    type="button"
                    className="ghost-button inline-button"
                    onClick={() => joinOnlineRoom(joinRoomCode)}
                    disabled={onlineLoading}
                  >
                    Entrar
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          renderOnlineRoom()
        )}

        {onlineInfo && <div className="notice-box">{onlineInfo}</div>}
        {onlineError && <div className="notice-box error-box">{onlineError}</div>}
      </>
    )
  }

  function renderSetup() {
    const shouldShowModeSelector = !(playMode === PLAY_MODES.online && onlineRoomCode)

    return (
      <section className="panel setup-panel">
        <img className="hero-logo" src="/logoimpostor.png" alt="Logo de El Impostor" />
        {shouldShowModeSelector && renderModeSelector()}
        {playMode === PLAY_MODES.local ? renderLocalSetup() : renderOnlineSetup()}
      </section>
    )
  }

  function renderReveal() {
    const progress = Math.min(swipeDistance / REVEAL_THRESHOLD, 1)
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
          <div className="timer-ring-fill" style={{ transform: `scaleY(${Math.max(progress, 0)})` }} />
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

  function renderOnlineRoom() {
    const status = onlineRoom?.status ?? ONLINE_STAGES.lobby

    return (
      <section className="online-room">
        <div className="summary-box room-code-box">
          <span>Codigo de invitacion</span>
          <strong>{onlineRoomCode}</strong>
        </div>

        <button type="button" className="ghost-button" onClick={shareInviteLink}>
          Compartir link de invitacion
        </button>

        {status === ONLINE_STAGES.lobby && renderOnlineLobby()}
        {status === ONLINE_STAGES.play && renderOnlinePlay()}
        {status === ONLINE_STAGES.summary && renderOnlineSummary()}

        <button type="button" className="ghost-button" onClick={leaveOnlineRoom}>
          Salir de la sala
        </button>
      </section>
    )
  }

  function renderOnlineLobby() {
    return (
      <>
        <p className="intro">
          Entren todos a la sala antes de empezar. El anfitrion define la categoria, tiempo e impostores.
        </p>

        <div className="field">
          <span>Jugadores conectados</span>
          <div className="online-player-list">
            {onlinePlayers.map((player) => (
              <div key={player.id} className="online-player-card">
                <strong>{player.name}</strong>
                <span>{player.id === onlineRoom?.hostId ? 'Anfitrion' : 'Listo'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="config-grid">
          <label className="field">
            <span>Impostores</span>
            <div className="stepper">
              <button
                type="button"
                onClick={() =>
                  updateOnlineConfig({
                    impostorCount: clamp(
                      onlineConfig.impostorCount - 1,
                      1,
                      Math.min(3, Math.max(1, onlinePlayers.length - 1)),
                    ),
                  })
                }
                disabled={!isOnlineHost}
              >
                -
              </button>
              <strong>{onlineConfig.impostorCount}</strong>
              <button
                type="button"
                onClick={() =>
                  updateOnlineConfig({
                    impostorCount: clamp(
                      onlineConfig.impostorCount + 1,
                      1,
                      Math.min(3, Math.max(1, onlinePlayers.length - 1)),
                    ),
                  })
                }
                disabled={!isOnlineHost}
              >
                +
              </button>
            </div>
          </label>

          <label className="field">
            <span>Tiempo</span>
            <div className="category-list compact-list">
              {ROUND_TIMES.map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  className={minutes === onlineConfig.roundMinutes ? 'category-pill active' : 'category-pill'}
                  onClick={() => updateOnlineConfig({ roundMinutes: minutes })}
                  disabled={!isOnlineHost}
                >
                  {minutes} min
                </button>
              ))}
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
                className={item === onlineConfig.category ? 'category-pill active' : 'category-pill'}
                onClick={() => updateOnlineConfig({ category: item })}
                disabled={!isOnlineHost}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {isOnlineHost ? (
          <button type="button" className="primary-button" onClick={startOnlineGame} disabled={onlinePlayers.length < 3}>
            Iniciar partida online
          </button>
        ) : (
          <div className="notice-box">Esperando a que el anfitrion inicie la ronda.</div>
        )}
      </>
    )
  }

  function renderOnlinePlay() {
    const canAdvanceTurn = isOnlineHost || playerIdRef.current === onlineTurnPlayerId
    const totalDuration = Math.max(onlineConfig.roundMinutes * 60, 1)
    const progress = clamp(onlineRemainingSeconds / totalDuration, 0, 1)
    const myRoleTitle = myOnlinePlayer?.isImpostor ? 'Eres el impostor' : 'Tu palabra es'
    const myRoleValue = myOnlinePlayer?.isImpostor ? 'Sin palabra' : myOnlinePlayer?.secretWord || 'Sin palabra'

    return (
      <>
        <div className="eyebrow">Ronda en vivo</div>
        <h2>{onlineTurnPlayer ? `Turno de ${onlineTurnPlayer.name}` : 'Esperando turno'}</h2>
        <p className="intro">
          Todos ven los roles desde el inicio. Esta pantalla sincroniza el turno y el tiempo restante en vivo.
        </p>

        <div className="reveal-card online-role-card">
          <div className="reveal-content online-role-content">
            <p className="card-label">Categoria: {myOnlinePlayer?.roundCategory ?? onlineConfig.category}</p>
            <p className="reveal-player-name">{myOnlinePlayer?.name ?? 'Jugador'}</p>
            <h2>{myRoleTitle}</h2>
            {myOnlinePlayer?.isImpostor ? (
              <p className="role-copy">
                No recibes palabra. Escucha al grupo, improvisa bien y evita que te descubran.
              </p>
            ) : (
              <p className="word">{myRoleValue}</p>
            )}
          </div>
        </div>

        <div className="timer-ring">
          <div className="timer-ring-fill" style={{ transform: `scaleY(${progress})` }} />
          <strong>{formatTime(onlineRemainingSeconds)}</strong>
        </div>

        <div className="turn-strip">
          {onlinePlayers.map((player) => (
            <div key={player.id} className={player.id === onlineTurnPlayerId ? 'turn-pill active' : 'turn-pill'}>
              {player.name}
            </div>
          ))}
        </div>

        <div className="summary-box">
          <span>Listos para votar</span>
          <strong>
            {onlineVoteReadyCount}/{onlineVoteThreshold}
          </strong>
        </div>

        <button type="button" className="primary-button" onClick={advanceOnlineTurn} disabled={!canAdvanceTurn}>
          Siguiente turno
        </button>

        <button type="button" className="ghost-button" onClick={toggleVoteReady}>
          {iAmReadyForVote ? 'Ya no quiero votar' : 'Quiero ir a votacion'}
        </button>
      </>
    )
  }

  function renderOnlineSummary() {
    const guessedAll =
      onlineVotes.length === onlineImpostors.length &&
      onlineImpostors.every((player) => onlineVotes.includes(player.id))
    const hasMajoritySelection = autoSelectedPlayerIds.length > 0

    return (
      <>
        <div className="eyebrow">Votacion sincronizada</div>
        <h2>Marquen a los sospechosos</h2>
        <p className="intro">
          Cada tarjeta muestra cuantas personas votaron por ese jugador. Si alguien llega a mayoria, queda marcado.
        </p>

        <div className="vote-list">
          {onlinePlayers.map((player) => (
            <button
              key={player.id}
              type="button"
              className={
                onlineVotes.includes(player.id) || autoSelectedPlayerIds.includes(player.id)
                  ? 'vote-card selected'
                  : 'vote-card'
              }
              onClick={() => toggleOnlineVote(player.id)}
              disabled={hasMajoritySelection}
            >
              <span>{onlineVoteTotals[player.id] ?? 0} votos</span>
              <strong>{player.name}</strong>
            </button>
          ))}
        </div>

        <div className="summary-box">
          <span>Tus votos</span>
          <strong>
            {onlineVotes.length}/{onlineConfig.impostorCount}
          </strong>
        </div>

        <div className="summary-box">
          <span>Mayoria necesaria</span>
          <strong>{onlineMajorityThreshold}</strong>
        </div>

        {hasMajoritySelection && (
          <div className="result-box">
            <span>Seleccionado por mayoria</span>
            <strong>
              {onlinePlayers
                .filter((player) => autoSelectedPlayerIds.includes(player.id))
                .map((player) => player.name)
                .join(', ')}
            </strong>
          </div>
        )}

        {onlineRoom?.game?.resultRevealed && (
          <div className="result-box">
            <span>{guessedAll ? 'Tu voto acerto' : 'Tu voto no encontro a todos'}</span>
            <strong>{onlineImpostors.map((player) => player.name).join(', ') || 'Sin impostores'}</strong>
          </div>
        )}

        {isOnlineHost && !onlineRoom?.game?.resultRevealed && !hasMajoritySelection && (
          <button
            type="button"
            className="primary-button"
            onClick={revealOnlineResults}
            disabled={!canRevealOnlineResult(onlineRoom)}
          >
            Mostrar resultado
          </button>
        )}

        {isOnlineHost && (
          <button type="button" className="ghost-button" onClick={restartOnlineGame}>
            Volver al lobby
          </button>
        )}
      </>
    )
  }

  return (
    <main className="app-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      {stage === GAME_STAGES.setup && renderSetup()}
      {playMode === PLAY_MODES.local && stage === GAME_STAGES.reveal && currentPlayer && renderReveal()}
      {playMode === PLAY_MODES.local && stage === GAME_STAGES.timer && renderTimer()}
      {playMode === PLAY_MODES.local && stage === GAME_STAGES.summary && renderSummary()}
    </main>
  )
}

export default App
