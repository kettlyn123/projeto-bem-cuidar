// Mock Data
const MOCK_MEDICAMENTOS = [
    { id: 1, nome: "Dipirona", dosagem: "500mg", estoque: 120, status: "disponivel", imagem: "💊" },
    { id: 2, nome: "Amoxicilina", dosagem: "250mg", estoque: 0, status: "esgotado", imagem: "🧪" },
    { id: 3, nome: "Losartana", dosagem: "50mg", estoque: 45, status: "chegando", imagem: "💊" }
];

const MOCK_USER = {
    nome: "Maria Silva",
    ubs: "UBS Centro"
};

// State Management
let currentState = {
    currentScreen: 'first-screen',
    user: null
};

// Navigation Function
function navigate(screenId) {
    console.log(`Navigating to: ${screenId}`);
    
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));
    
    // Show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        currentState.currentScreen = screenId;
    }

    // Toggle bottom nav visibility and active state
    const bottomNav = document.getElementById('bottom-nav');
    const authScreens = ['first-screen', 'login', 'cadastro-passo-1', 'cadastro-passo-2'];
    
    if (authScreens.includes(screenId)) {
        bottomNav.classList.add('hidden');
    } else {
        bottomNav.classList.remove('hidden');
        
        // Update active nav item
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            // Check if the onclick contains the screenId
            if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(screenId)) {
                item.classList.add('active');
            }
        });
    }

    // Run screen-specific logic
    if (screenId === 'home') renderHome();
    if (screenId === 'busca-remedios') renderSearch();
}

// Render Functions
function renderHome() {
    const calendar = document.getElementById('calendar-strip');
    calendar.innerHTML = '';
    
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const dayCard = document.createElement('div');
        dayCard.className = `day-card ${i === 0 ? 'active' : ''}`;
        dayCard.innerHTML = `
            <span style="font-size: 0.8rem">${days[date.getDay()]}</span>
            <span style="font-weight: 700">${date.getDate()}</span>
        `;
        calendar.appendChild(dayCard);
    }

    const medList = document.getElementById('home-med-list');
    medList.innerHTML = MOCK_MEDICAMENTOS.map(med => `
        <div class="med-card" onclick="showDetail(${med.id})">
            <div style="font-size: 2rem; margin-right: 16px">${med.imagem}</div>
            <div class="med-info">
                <div style="font-weight: 700">${med.nome}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted)">${med.dosagem}</div>
            </div>
            <div class="med-status status-${med.status}">
                ${med.status.charAt(0).toUpperCase() + med.status.slice(1)}
            </div>
        </div>
    `).join('');
}

function renderSearch() {
    const results = document.getElementById('search-results');
    results.innerHTML = MOCK_MEDICAMENTOS.map(med => `
        <div class="med-card">
            <div style="font-size: 2rem; margin-right: 16px">${med.imagem}</div>
            <div class="med-info">
                <div style="font-weight: 700">${med.nome}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted)">${med.dosagem}</div>
            </div>
            <button class="btn btn-primary" style="width: auto; padding: 8px 16px; min-height: auto; margin: 0">Ver</button>
        </div>
    `).join('');
}

function showDetail(medId) {
    const med = MOCK_MEDICAMENTOS.find(m => m.id === medId);
    const container = document.getElementById('med-detail-content');
    
    container.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 5rem">${med.imagem}</div>
            <h2 style="margin-top: 10px">${med.nome}</h2>
            <p style="color: var(--text-muted)">${med.dosagem}</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 16px; margin-top: 20px;">
            <h3>Sobre o medicamento</h3>
            <p>Este medicamento é indicado para o tratamento de dores e febre. Consulte sempre seu médico na UBS vinculada.</p>
            <div style="margin-top: 20px;">
                <span class="med-status status-${med.status}">${med.status.toUpperCase()}</span>
            </div>
        </div>
        <button class="btn btn-primary" style="margin-top: 30px">Reservar na UBS</button>
    `;
    
    navigate('detalhe-remedio');
}

// Initial Navigation
document.addEventListener('DOMContentLoaded', () => {
    navigate('first-screen');
});
