// Alfabeto hebraico
const hebrewAlphabet = [
    { letter: 'א', name: 'Alef' },
    { letter: 'ב', name: 'Bet' },
    { letter: 'ג', name: 'Gimel' },
    { letter: 'ד', name: 'Dalet' },
    { letter: 'ה', name: 'He' },
    { letter: 'ו', name: 'Vav' },
    { letter: 'ז', name: 'Zayin' },
    { letter: 'ח', name: 'Het' },
    { letter: 'ט', name: 'Tet' },
    { letter: 'י', name: 'Yod' },
    { letter: 'כ', name: 'Kaf' },
    { letter: 'ל', name: 'Lamed' },
    { letter: 'מ', name: 'Mem' },
    { letter: 'נ', name: 'Nun' },
    { letter: 'ס', name: 'Samekh' },
    { letter: 'ע', name: 'Ayin' },
    { letter: 'פ', name: 'Pe' },
    { letter: 'צ', name: 'Tsade' },
    { letter: 'ק', name: 'Qof' },
    { letter: 'ר', name: 'Resh' },
    { letter: 'ש', name: 'Shin' },
    { letter: 'ת', name: 'Tav' }
];

let lexiconData = {};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    createAlphabetNavigation();
    loadLexicon();
});

// Cria navegação alfabética
function createAlphabetNavigation() {
    const alphabetNav = document.getElementById('alphabet-nav');
    
    hebrewAlphabet.forEach(item => {
        const button = document.createElement('a');
        button.href = `#letter-${item.letter}`;
        button.className = 'alphabet-btn';
        button.textContent = item.letter;
        button.title = item.name;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToLetter(item.letter);
        });
        
        alphabetNav.appendChild(button);
    });
}

// Carrega dados do léxico
async function loadLexicon() {
    try {
        const response = await fetch('data/lexico_completo.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar léxico');
        }
        
        lexiconData = await response.json();
        renderLexicon();
        
    } catch (error) {
        console.error('Erro ao carregar léxico:', error);
        showError();
    }
}

// Renderiza o léxico
function renderLexicon() {
    const content = document.getElementById('lexicon-content');
    let html = '';
    
    hebrewAlphabet.forEach(item => {
        const letter = item.letter;
        const words = lexiconData[letter] || [];
        
        if (words.length > 0) {
            html += `
                <section class="letter-section" id="letter-${letter}">
                    <div class="letter-header">
                        <h2>${letter}</h2>
                        <p>${item.name} - ${words.length} palavra${words.length > 1 ? 's' : ''}</p>
                    </div>
                    <div class="words-grid">
            `;
            
            words.forEach(word => {
                html += `
                    <div class="word-entry">
                        <div class="hebrew-word">${word.hebrew}</div>
                        <div class="transliteration">${word.transliteration}</div>
                        <div class="grammar-info">${word.grammar}</div>
                        <div class="meaning">${word.meaning}</div>
                        <div class="frequency">Frequência: ${word.frequency}x</div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </section>
            `;
        }
    });
    
    content.innerHTML = html;
}

// Rola suavemente para uma letra
function scrollToLetter(letter) {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Destaca temporariamente a seção
        element.style.transform = 'scale(1.02)';
        element.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

// Mostra erro
function showError() {
    document.getElementById('lexicon-content').innerHTML = `
        <div style="text-align: center; padding: 3rem; background: var(--color-light); border-radius: var(--border-radius);">
            <h2 style="color: var(--color-danger); margin-bottom: 1rem;">❌ Erro ao Carregar Léxico</h2>
            <p>Não foi possível carregar os dados do léxico. Verifique sua conexão e tente novamente.</p>
            <button class="action-button" onclick="location.reload()" style="margin-top: 1rem;">
                🔄 Tentar Novamente
            </button>
        </div>
    `;
}

// Função de busca (pode ser implementada futuramente)
function searchWord(query) {
    // Implementação futura para busca de palavras
    console.log('Buscar:', query);
}

