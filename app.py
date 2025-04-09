from flask import Flask, render_template, request, jsonify, session
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage
from flask_session import Session
from datetime import timedelta
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)
Session(app)

# Initialize Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-lite",
    temperature=0.7,  # Controls randomness (0.0 to 1.0)
    max_output_tokens=2048
)

@app.route('/')
def home():
    # Initialize conversation if not exists
    if 'conversation' not in session:
        session['conversation'] = []
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Add user message to conversation history
        session['conversation'].append({
            'role': 'user',
            'content': user_message,
            'timestamp': datetime.now().isoformat()
        })
        
        # Prepare messages for the model
        messages = []
        for msg in session['conversation'][-6:]:  # Keep last 6 messages for context
            if msg['role'] == 'user':
                messages.append(HumanMessage(content=msg['content']))
            else:
                messages.append(AIMessage(content=msg['content']))
        
        # Get AI response
        ai_response = llm.invoke(messages)
        
        # Add AI response to conversation
        session['conversation'].append({
            'role': 'ai',
            'content': ai_response.content,
            'timestamp': datetime.now().isoformat()
        })
        session.modified = True
        
        return jsonify({
            'response': ai_response.content,
            'conversation_id': session.sid
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear', methods=['POST'])
def clear_chat():
    session['conversation'] = []
    session.modified = True
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)