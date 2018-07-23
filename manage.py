from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, send, emit
from flask_script import Manager, Shell


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True
socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('json')
def handle_message(msg):
    emit('echoback_message', '我把一樣的話回傳給你 "' + str(msg) + '"', broadcast=True)


manager = Manager(app)


if __name__ == '__main__':
    socketio.run(app)
