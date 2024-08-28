const sounds = [
    { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    { key: 'Z', id: 'Kick-n\'-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

function App() {
    const [display, setDisplay ] = React.useState('');

    const playSound = (id) => {
        const audio = document.getElementById(id);
        audio.currentTime = 0;
        audio.play();
        setDisplay(id);
    };

    React.useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toUpperCase();
            const sound = sounds.find(sound => sound.key === key);
            if(sound) {
                playSound(sound.key)
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown',handleKeyPress);
        };
    }, []);

    return (
        <div id="drum-machine" className="container">
            <div id="display" className="text-center">{display}</div>
            <div className="row justify-content-center">
                {sounds.map(sound => (
                    <DrumPad 
                        key={sound.key}
                        sound={sound}
                        playSound={playSound}
                    />
                ))}
            </div>
        </div>
    ); 
}

function DrumPad({ sound, playSound }) {
    return (
        <div 
            className="drum-pad col-3"
            id={sound.id}
            onClick={() => playSound(sound.key)}
        >
            {sound.key}
            <audio className="clip" id={sound.key} src={sound.url}></audio>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))