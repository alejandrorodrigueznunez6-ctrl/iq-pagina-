// Desplazamiento
function scrollToSec(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* ==========================================
   1. ASISTENTE VIRTUAL LÉXICO
   ========================================== */
const dictionary = {
  "neuroplasticidad": "Capacidad del cerebro para estructurar y reorganizar sus conexiones sinápticas en respuesta al aprendizaje continuo.",
  "mielina": "Sustancia que recubre las fibras nerviosas aumentando la velocidad de transmisión de los impulsos eléctricos interneuronales.",
  "cognicion": "Proceso mental de adquirir, procesar y almacenar información mediante la percepción y el razonamiento.",
  "sinapsis": "Unión funcional entre dos neuronas que permite la transmisión de señales químicas o eléctricas.",
  "hipocampo": "Región clave del cerebro involucrada en la formación de recuerdos a largo plazo y la navegación espacial.",
  "iq": "Coeficiente Intelectual; evaluación estandarizada que mide la inteligencia fluida y la memoria de trabajo.",
  "metacognicion": "La capacidad de reflexionar y regular nuestros propios procesos de pensamiento.",
  "bdnf": "Factor Neurotrófico Derivado del Cerebro; proteína que promueve la supervivencia y crecimiento de nuevas neuronas."
};

function searchWord() {
  const input = document.getElementById('va-input').value.toLowerCase().trim();
  const resBox = document.getElementById('va-result');

  if (dictionary[input]) {
    resBox.innerHTML = `<span style="color: var(--success)"><strong>${input.toUpperCase()}:</strong> ${dictionary[input]}</span>`;
  } else {
    resBox.innerHTML = `<span style="color: var(--danger)">Palabra no encontrada en el glosario base. Intenta buscar términos como: <i>Neuroplasticidad, Mielina, Cognición, Sinapsis, BDNF o Hipocampo.</i></span>`;
  }
}

/* ==========================================
   2. JUEGO DE MEMORIA DE SECUENCIA ESPACIAL
   ========================================== */
let gameSeq = [];
let userSeq = [];
let level = 0;
let isPlaying = false;

function startMemoryGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  isPlaying = true;
  document.getElementById('game-status').innerText = 'Observa la secuencia...';
  nextRound();
}

function nextRound() {
  userSeq = [];
  level++;
  document.getElementById('game-level').innerText = `Nivel: ${level}`;
  gameSeq.push(Math.floor(Math.random() * 4));
  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    flashPad(gameSeq[i]);
    i++;
    if (i >= gameSeq.length) {
      clearInterval(interval);
      document.getElementById('game-status').innerText = '¡Tu turno!';
    }
  }, 600);
}

function flashPad(idx) {
  const pad = document.getElementById(`pad-${idx}`);
  pad.classList.add('active');
  setTimeout(() => pad.classList.remove('active'), 300);
}

function userSelect(idx) {
  if (!isPlaying) return;

  flashPad(idx);
  userSeq.push(idx);

  const currentIdx = userSeq.length - 1;
  if (userSeq[currentIdx] !== gameSeq[currentIdx]) {
    document.getElementById('game-status').innerText = '❌ Secuencia errónea. ¡Presiona "Iniciar Reto" para volver a intentarlo!';
    isPlaying = false;
    return;
  }

  if (userSeq.length === gameSeq.length) {
    document.getElementById('game-status').innerText = '✅ ¡Secuencia correcta! Avanzando...';
    setTimeout(nextRound, 1000);
  }
}

/* ==========================================
   3. QUIZ DE RAZONAMIENTO LÓGICO
   ========================================== */
function checkQuiz(answer) {
  const status = document.getElementById('quiz-status');
  if (answer === 3) {
    status.style.color = 'var(--success)';
    status.innerText = '✅ ¡Correcto! Si 3 impresoras tardan 3 minutos en hacer 3 páginas, significa que a cada impresora le toma 3 minutos hacer 1 página. Por lo tanto, 100 impresoras trabajando en paralelo tardarán los mismos 3 minutos en hacer 100 páginas.';
  } else {
    status.style.color = 'var(--danger)';
    status.innerText = '❌ Incorrecto. Analiza el ritmo individual de cada impresora.';
  }
}

/* ==========================================
   4. ACTIVIDAD DE FLUIDEZ VERBAL
   ========================================== */
function checkInversion() {
  const target = document.getElementById('target-word').innerText;
  const userInput = document.getElementById('user-invert').value.toUpperCase().trim();
  const status = document.getElementById('invert-status');

  const expected = target.split('').reverse().join('');

  if (userInput === expected) {
    status.style.color = 'var(--success)';
    status.innerText = '✅ ¡Excelente! Has invertido correctamente la palabra en tu mente.';
  } else {
    status.style.color = 'var(--danger)';
    status.innerText = `❌ Intenta de nuevo. La inversión esperada es: ${expected}`;
  }
}