// Variáveis globais
let testQuestions = [];
let userAnswers = {};
let testStartTime = null;
let testEndTime = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadTestData();
});

// Carrega dados da prova do localStorage
function loadTestData() {
    try {
        const testData = localStorage.getItem('customTestData');
        
        if (!testData) {
            showError('Nenhuma prova foi configurada. Retorne à página principal para criar uma prova.');
            return;
        }
        
        testQuestions = JSON.parse(testData);
        
        if (testQuestions.length === 0) {
            showError('Nenhuma questão foi encontrada para esta prova.');
            return;
        }
        
        testStartTime = new Date();
        renderTest();
        
    } catch (error) {
        console.error('Erro ao carregar dados da prova:', error);
        showError('Erro ao carregar os dados da prova.');
    }
}

// Renderiza a prova
function renderTest() {
    const content = document.getElementById('test-content');
    
    let html = `
        <div class="test-info">
            <h3>📋 Informações da Prova</h3>
            <p><strong>Total de questões:</strong> ${testQuestions.length}</p>
            <p><strong>Módulos incluídos:</strong> ${getIncludedModules()}</p>
            <p><strong>Tempo estimado:</strong> ${Math.ceil(testQuestions.length * 2)} minutos</p>
            <p style="margin-top: 1rem; font-style: italic;">
                💡 <strong>Dica:</strong> Leia cada questão com atenção e selecione a melhor resposta. 
                Você pode revisar suas respostas antes de submeter.
            </p>
        </div>
        
        <form id="test-form">
    `;
    
    testQuestions.forEach((question, index) => {
        html += `
            <div class="test-question">
                <div class="question-header">
                    <span class="question-number">Questão ${index + 1}</span>
                    <span class="question-module">Módulo: ${question.module}</span>
                </div>
                
                <div class="question-text">${question.question}</div>
                
                <div class="test-options">
        `;
        
        question.options.forEach((option, optionIndex) => {
            html += `
                <div class="test-option" onclick="selectTestOption(this, ${index}, ${optionIndex})">
                    <input type="radio" name="question-${index}" value="${optionIndex}" id="q${index}-opt${optionIndex}">
                    <label for="q${index}-opt${optionIndex}">${option}</label>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    html += `
        </form>
        
        <div class="submit-section">
            <p style="margin-bottom: 1rem;">
                <strong>Questões respondidas:</strong> 
                <span id="answered-count">0</span> de ${testQuestions.length}
            </p>
            <button class="submit-button" id="submit-test" onclick="submitTest()" disabled>
                📝 Submeter Prova
            </button>
        </div>
        
        <div class="results-section" id="results-section">
            <!-- Resultados serão exibidos aqui -->
        </div>
    `;
    
    content.innerHTML = html;
}

// Seleciona opção da prova
function selectTestOption(optionElement, questionIndex, optionIndex) {
    // Remove seleção anterior da questão
    const questionContainer = optionElement.parentElement;
    questionContainer.querySelectorAll('.test-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Adiciona seleção à opção clicada
    optionElement.classList.add('selected');
    
    // Marca o radio button
    const radio = optionElement.querySelector('input[type="radio"]');
    radio.checked = true;
    
    // Salva a resposta
    userAnswers[questionIndex] = optionIndex;
    
    // Atualiza contador de questões respondidas
    updateAnsweredCount();
    
    // Habilita botão de submissão se todas as questões foram respondidas
    checkSubmitButton();
}

// Atualiza contador de questões respondidas
function updateAnsweredCount() {
    const answeredCount = Object.keys(userAnswers).length;
    document.getElementById('answered-count').textContent = answeredCount;
}

// Verifica se pode habilitar botão de submissão
function checkSubmitButton() {
    const submitButton = document.getElementById('submit-test');
    const allAnswered = Object.keys(userAnswers).length === testQuestions.length;
    
    submitButton.disabled = !allAnswered;
    
    if (allAnswered) {
        submitButton.textContent = '🎯 Submeter Prova';
        submitButton.style.background = 'var(--color-success)';
    }
}

// Submete a prova
function submitTest() {
    if (Object.keys(userAnswers).length !== testQuestions.length) {
        alert('Por favor, responda todas as questões antes de submeter.');
        return;
    }
    
    testEndTime = new Date();
    
    // Confirma submissão
    if (!confirm('Tem certeza que deseja submeter a prova? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    // Calcula resultados
    const results = calculateResults();
    
    // Exibe resultados
    displayResults(results);
    
    // Esconde formulário
    document.getElementById('test-form').style.display = 'none';
    document.querySelector('.submit-section').style.display = 'none';
}

// Calcula resultados da prova
function calculateResults() {
    let correctAnswers = 0;
    const questionResults = [];
    
    testQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        if (isCorrect) {
            correctAnswers++;
        }
        
        questionResults.push({
            question: question.question,
            module: question.module,
            userAnswer: userAnswer,
            correctAnswer: question.correct,
            isCorrect: isCorrect,
            options: question.options,
            explanation: question.explanation
        });
    });
    
    const totalQuestions = testQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const testDuration = Math.round((testEndTime - testStartTime) / 1000 / 60); // em minutos
    
    return {
        correctAnswers,
        totalQuestions,
        percentage,
        testDuration,
        questionResults
    };
}

// Exibe resultados
function displayResults(results) {
    const resultsSection = document.getElementById('results-section');
    
    // Determina classe de score baseada na porcentagem
    let scoreClass = 'score-needs-improvement';
    let scoreMessage = 'Continue estudando!';
    let scoreIcon = '📚';
    
    if (results.percentage >= 80) {
        scoreClass = 'score-excellent';
        scoreMessage = 'Excelente desempenho!';
        scoreIcon = '🏆';
    } else if (results.percentage >= 60) {
        scoreClass = 'score-good';
        scoreMessage = 'Bom desempenho!';
        scoreIcon = '👍';
    }
    
    let html = `
        <h2 style="text-align: center; margin-bottom: 2rem; color: var(--color-primary);">
            📊 Resultados da Prova
        </h2>
        
        <div class="score-display ${scoreClass}">
            <div style="font-size: 4rem; margin-bottom: 1rem;">${scoreIcon}</div>
            <div class="score-number">${results.correctAnswers}/${results.totalQuestions}</div>
            <div class="score-percentage">${results.percentage}%</div>
            <div style="font-size: 1.2rem; margin-top: 1rem; font-weight: 600;">
                ${scoreMessage}
            </div>
            <div style="font-size: 1rem; margin-top: 0.5rem; opacity: 0.8;">
                Tempo gasto: ${results.testDuration} minuto${results.testDuration !== 1 ? 's' : ''}
            </div>
        </div>
        
        <div class="answer-review">
            <h3 style="margin-bottom: 1.5rem; color: var(--color-primary);">
                📝 Revisão Detalhada
            </h3>
    `;
    
    results.questionResults.forEach((result, index) => {
        const statusClass = result.isCorrect ? 'correct' : 'incorrect';
        const statusText = result.isCorrect ? '✅ CORRETO' : '❌ INCORRETO';
        
        html += `
            <div class="review-question ${statusClass}">
                <div class="review-header">
                    <span class="review-status ${statusClass}">${statusText}</span>
                    <span style="font-size: 0.9rem; color: #666;">
                        Questão ${index + 1} - ${result.module}
                    </span>
                </div>
                
                <div style="margin-bottom: 1rem; font-weight: 500;">
                    ${result.question}
                </div>
                
                <div class="user-answer">
                    <strong>Sua resposta:</strong> ${result.options[result.userAnswer]}
                </div>
        `;
        
        if (!result.isCorrect) {
            html += `
                <div class="correct-answer">
                    <strong>Resposta correta:</strong> ${result.options[result.correctAnswer]}
                </div>
            `;
        }
        
        html += `
                <div class="explanation">
                    <strong>Explicação:</strong> ${result.explanation}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // Adiciona recomendações de estudo
    if (results.percentage < 80) {
        const weakModules = getWeakModules(results.questionResults);
        if (weakModules.length > 0) {
            html += `
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: var(--border-radius); padding: var(--spacing-lg); margin-top: var(--spacing-xl);">
                    <h4 style="color: #856404; margin-bottom: 1rem;">💡 Recomendações de Estudo</h4>
                    <p style="margin-bottom: 1rem;">Com base nos seus resultados, recomendamos revisar os seguintes módulos:</p>
                    <ul style="margin-left: 2rem; color: #856404;">
                        ${weakModules.map(module => `<li>${module}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }
    
    resultsSection.innerHTML = html;
    resultsSection.style.display = 'block';
    
    // Rola para os resultados
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Identifica módulos com mais erros
function getWeakModules(questionResults) {
    const moduleErrors = {};
    
    questionResults.forEach(result => {
        if (!result.isCorrect) {
            moduleErrors[result.module] = (moduleErrors[result.module] || 0) + 1;
        }
    });
    
    return Object.keys(moduleErrors)
        .sort((a, b) => moduleErrors[b] - moduleErrors[a])
        .slice(0, 3); // Top 3 módulos com mais erros
}

// Obtém módulos incluídos na prova
function getIncludedModules() {
    const modules = [...new Set(testQuestions.map(q => q.module))];
    return modules.join(', ');
}

// Mostra erro
function showError(message) {
    document.getElementById('test-content').innerHTML = `
        <div style="text-align: center; padding: 3rem; background: var(--color-light); border-radius: var(--border-radius);">
            <h2 style="color: var(--color-danger); margin-bottom: 1rem;">❌ Erro</h2>
            <p style="margin-bottom: 2rem;">${message}</p>
            <a href="index.html" class="action-button">
                🏠 Voltar ao Curso
            </a>
        </div>
    `;
}

// Função para imprimir resultados (opcional)
function printResults() {
    window.print();
}

// Limpa dados da prova do localStorage quando a página é fechada
window.addEventListener('beforeunload', function() {
    // Opcional: manter dados para permitir revisão posterior
    // localStorage.removeItem('customTestData');
});

