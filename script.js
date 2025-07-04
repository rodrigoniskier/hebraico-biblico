// Variáveis globais
let modulesData = {};
let currentModule = null;
let currentType = null; // 'theoretical' ou 'practical'
let initialContent = null;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Salva o conteúdo inicial da página de boas-vindas
    initialContent = document.getElementById('main-content').innerHTML;
    loadAllModules();
    setupEventListeners();
});

// Carrega todos os módulos
async function loadAllModules() {
    try {
        showLoading();
        
        // Carrega todos os 14 módulos
        for (let i = 1; i <= 14; i++) {
            const moduleNumber = i.toString().padStart(2, '0');
            try {
                const response = await fetch(`data/modulo_${moduleNumber}.json`);
                if (response.ok) {
                    const moduleData = await response.json();
                    modulesData[moduleNumber] = moduleData;
                }
            } catch (error) {
                console.warn(`Erro ao carregar módulo ${moduleNumber}:`, error);
            }
        }
        
        populateNavigation();
        hideLoading();
        // Restaura a mensagem de boas-vindas
        document.getElementById('main-content').innerHTML = initialContent;

    } catch (error) {
        console.error('Erro ao carregar módulos:', error);
        showError('Erro ao carregar os módulos do curso.');
    }
}

// Popula a navegação com os módulos carregados
function populateNavigation() {
    const theoreticalNav = document.getElementById('theoretical-modules');
    const practicalNav = document.getElementById('practical-modules');
    const moduleCheckboxes = document.getElementById('module-checkboxes');
    
    theoreticalNav.innerHTML = '';
    practicalNav.innerHTML = '';
    moduleCheckboxes.innerHTML = '';
    
    Object.keys(modulesData).sort().forEach(moduleNumber => {
        const module = modulesData[moduleNumber];
        
        // Botão teórico
        const theoreticalBtn = createModuleButton(
            module.title,
            `theoretical-${moduleNumber}`,
            () => loadTheoreticalContent(moduleNumber)
        );
        theoreticalNav.appendChild(theoreticalBtn);
        
        // Botão prático
        const practicalBtn = createModuleButton(
            module.title,
            `practical-${moduleNumber}`,
            () => loadPracticalContent(moduleNumber)
        );
        practicalNav.appendChild(practicalBtn);
        
        // Checkbox para prova personalizada
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `module-${moduleNumber}`;
        checkbox.value = moduleNumber;
        
        const label = document.createElement('label');
        label.htmlFor = `module-${moduleNumber}`;
        label.textContent = `Módulo ${parseInt(moduleNumber)}: ${module.title}`;
        
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        moduleCheckboxes.appendChild(checkboxContainer);
    });
}

// Cria um botão de módulo
function createModuleButton(title, id, clickHandler) {
    const button = document.createElement('button');
    button.className = 'nav-button';
    button.id = id;
    button.textContent = `Módulo ${parseInt(id.split('-')[1])}: ${title}`;
    button.addEventListener('click', clickHandler);
    return button;
}

// Carrega conteúdo teórico
function loadTheoreticalContent(moduleNumber) {
    const module = modulesData[moduleNumber];
    if (!module) return;
    
    setActiveButton(`theoretical-${moduleNumber}`, 'theoretical');
    currentModule = moduleNumber;
    currentType = 'theoretical';
    
    const content = `
        <div class="fade-in">
            <h1>📖 ${module.title}</h1>
            <div class="module-content">
                ${module.content.html}
            </div>
        </div>
    `;
    
    document.getElementById('main-content').innerHTML = content;
}

// Carrega conteúdo prático
function loadPracticalContent(moduleNumber) {
    const module = modulesData[moduleNumber];
    if (!module) return;
    
    setActiveButton(`practical-${moduleNumber}`, 'practical');
    currentModule = moduleNumber;
    currentType = 'practical';
    
    let content = `
        <div class="fade-in">
            <h1>🎯 Prática: ${module.title}</h1>
    `;
    
    // Adiciona flashcards se existirem
    if (module.flashcards && module.flashcards.length > 0) {
        content += `
            <h2>💡 Flashcards</h2>
            <div class="flashcard-container">
        `;
        
        module.flashcards.forEach((flashcard, index) => {
            content += `
                <div class="flashcard" onclick="flipCard(this)">
                    <div class="flashcard-front">
                        <div class="hebrew-text">${flashcard.front}</div>
                    </div>
                    <div class="flashcard-back">
                        <div>${flashcard.back}</div>
                    </div>
                </div>
            `;
        });
        
        content += '</div>';
    }
    
    // Adiciona exercícios se existirem
    if (module.exercises && module.exercises.length > 0) {
        content += `
            <h2>✏️ Exercícios</h2>
            <div class="exercise-container">
        `;
        
        module.exercises.forEach((exercise, index) => {
            content += `
                <div class="exercise">
                    <h4>Questão ${index + 1}</h4>
                    <p>${exercise.question}</p>
                    <div class="exercise-options">
            `;
            
            exercise.options.forEach((option, optionIndex) => {
                content += `
                    <div class="exercise-option" onclick="selectOption(this, ${index}, ${optionIndex})">
                        <input type="radio" name="exercise-${index}" value="${optionIndex}">
                        <span>${option}</span>
                    </div>
                `;
            });
            
            content += `
                    </div>
                    <div class="exercise-feedback" id="feedback-${index}"></div>
                </div>
            `;
        });
        
        content += '</div>';
    }
    
    content += '</div>';
    
    document.getElementById('main-content').innerHTML = content;
}

// Define botão ativo
function setActiveButton(activeId, type) {
    // Remove active de todos os botões
    document.querySelectorAll('.nav-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adiciona active ao botão selecionado
    const activeButton = document.getElementById(activeId);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Vira flashcard
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Seleciona opção de exercício
function selectOption(optionElement, exerciseIndex, optionIndex) {
    const module = modulesData[currentModule];
    const exercise = module.exercises[exerciseIndex];
    
    // Marca a opção selecionada
    const radio = optionElement.querySelector('input[type="radio"]');
    radio.checked = true;
    
    // Remove seleção anterior
    const allOptions = optionElement.parentElement.querySelectorAll('.exercise-option');
    allOptions.forEach(opt => opt.style.backgroundColor = '');
    
    // Destaca opção selecionada
    optionElement.style.backgroundColor = '#e3f2fd';
    
    // Mostra feedback
    const feedbackElement = document.getElementById(`feedback-${exerciseIndex}`);
    const isCorrect = optionIndex === exercise.correct;
    
    feedbackElement.style.display = 'block';
    feedbackElement.className = `exercise-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    
    if (isCorrect) {
        feedbackElement.innerHTML = `
            <strong>✅ Correto!</strong><br>
            ${exercise.explanation}
        `;
    } else {
        feedbackElement.innerHTML = `
            <strong>❌ Incorreto.</strong><br>
            A resposta correta é: <strong>${exercise.options[exercise.correct]}</strong><br>
            ${exercise.explanation}
        `;
    }
}

// Configura event listeners
function setupEventListeners() {
    // Modal da prova personalizada
    const modal = document.getElementById('test-modal');
    const customTestBtn = document.getElementById('custom-test-btn');
    const closeModal = document.getElementById('close-modal');
    const generateTestBtn = document.getElementById('generate-test-btn');
    
    customTestBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    generateTestBtn.addEventListener('click', generateCustomTest);
}

// Gera prova personalizada
function generateCustomTest() {
    const selectedModules = [];
    const checkboxes = document.querySelectorAll('#module-checkboxes input[type="checkbox"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Por favor, selecione pelo menos um módulo.');
        return;
    }
    
    if (checkboxes.length > 5) {
        alert('Por favor, selecione no máximo 5 módulos.');
        return;
    }
    
    checkboxes.forEach(checkbox => {
        selectedModules.push(checkbox.value);
    });
    
    // Coleta exercícios difíceis dos módulos selecionados
    const testQuestions = [];
    
    selectedModules.forEach(moduleNumber => {
        const module = modulesData[moduleNumber];
        if (module && module.exercises) {
            const hardExercises = module.exercises.filter(ex => ex.difficulty === 'hard');
            hardExercises.forEach(exercise => {
                testQuestions.push({
                    ...exercise,
                    module: module.title,
                    moduleNumber: moduleNumber
                });
            });
        }
    });
    
    if (testQuestions.length === 0) {
        alert('Nenhum exercício difícil encontrado nos módulos selecionados.');
        return;
    }
    
    // Embaralha as questões
    shuffleArray(testQuestions);
    
    // Salva no localStorage
    localStorage.setItem('customTestData', JSON.stringify(testQuestions));
    
    // Abre a página da prova
    window.open('prova.html', '_blank');
    
    // Fecha o modal
    document.getElementById('test-modal').style.display = 'none';
    
    // Desmarca checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Embaralha array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Mostra loading
function showLoading() {
    document.getElementById('main-content').innerHTML = `
        <div class="loading">
            Carregando módulos...
        </div>
    `;
}

// Esconde loading
function hideLoading() {
    // O conteúdo será substituído quando um módulo for carregado
}

// Mostra erro
function showError(message) {
    document.getElementById('main-content').innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--color-danger);">
            <h2>❌ Erro</h2>
            <p>${message}</p>
            <button class="action-button" onclick="location.reload()">
                🔄 Tentar Novamente
            </button>
        </div>
    `;
}

// Funções utilitárias para formatação de texto hebraico
function formatHebrewText(text) {
    return `<span class="hebrew">${text}</span>`;
}

// Função para destacar texto importante
function highlightText(text, className = 'highlight') {
    return `<span class="${className}">${text}</span>`;
}
