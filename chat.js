// chat.js - simple client-side "AI" responder
(function(){
    const input = document.getElementById('inputBox');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');
    const chatArea = document.getElementById('chatArea');

    function appendMessage(text, who){
        const div = document.createElement('div');
        div.className = 'message ' + who;
        div.textContent = text;
        chatArea.appendChild(div);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    function generateResponse(msg){
        const m = msg.trim();
        if(!m) return "Escribe algo para que responda.";
        const low = m.toLowerCase();
        // simple pattern-based responses
        if(/hola|buenas|hey|hello/.test(low)) return '¡Hola! ¿En qué puedo ayudarte?';
        if(/adios|hasta luego|chao|nos vemos/.test(low)) return '¡Hasta luego! Si necesitas algo más, escribe aquí.';
        if(/[¿?]/.test(m)) return 'buena pregunta... te puedo ayudar si no entendes alguna cosa solo escribe (Que es este lugar) y te explico pero no puedo responder preguntas que no tengan que ver con este sitio.';
        if(/que se hace|que puedo hacer aca|que es este sitio/.test(low)) return 'En este lugar podes buscar libros o juegos para jugar, o simplemente charlar conmigo pero como soy una IA simple no tengo mucho para decir, pero si quieres puedo ayudarte a encontrar algo interesante para juegar.';
        if(/gracias|muchas gracias/.test(low)) return 'De nada — ¡me alegra ayudar!';
        if(/como te llamas|nombre/.test(low)) return 'No tengo un nombre propio, soy una IA simple integrada en esta página.';
        // fallback: echo with slight variation
        const responses = [
            'Mhm... ¿por qué dices eso?',
        ];
        return responses[Math.floor(Math.random()*responses.length)];
    }

    function send(){
        const text = input.value;
        if(!text.trim()) return;
        appendMessage(text, 'user');
        input.value = '';
        setTimeout(()=>{
            const reply = generateResponse(text);
            appendMessage(reply, 'bot');
        }, 600 + Math.random()*800); // simulate thinking
    }

    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            send();
        }
    });
    clearBtn.addEventListener('click', ()=>{
        chatArea.innerHTML = '';
        input.value = '';
        input.focus();
    });

    // welcome message
    appendMessage('Hola — soy una IA simple. Escribe en el cuadro y pulsa enviar (o Enter).', 'bot');
})();

