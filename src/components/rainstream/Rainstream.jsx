import useInterval from '@use-it/interval';
import { useState } from 'react';
import './Rainstream.scss';

export function Rainstream(){

    const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;
    const STREAM_MUTATION_ODDS = 0.02;


    const MIN_STREAM_SIZE = 15;
    const MAX_STREAM_SIZE = 50;

    function getRandInRange(min, max){

        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandChar(){

        return VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));
    }

    function genRandStream(){
        return new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE)) // [empty, empty, empty]
            .fill() // [undefined, undefined, undefined]
            .map(_ => getRandChar()); // [a, 7, !]
    }

    function getMutatedStream(stream){
        const newStream = [];

        for(let i = 1; i < stream.length; i++){
            if(Math.random() < STREAM_MUTATION_ODDS){
                newStream.push(getRandChar());
            }
            else{
                newStream.push(stream[i]);
            }
        }

        newStream.push(getRandChar());
        return newStream;
    }


    const [stream, setStream] = useState(genRandStream());
    const [topMargin, setTopMargin] = useState(stream.length * -50);
    

    useInterval(() => {
        if(topMargin > window.innerHeight){
            setTopMargin(stream.length * -50);
        }
        else{
            setTopMargin(topMargin + 29);
            setStream(getMutatedStream);
        }
        
    }, 100);



    return(
        <div style={{marginTop: topMargin,}}>
            {stream.map((char, index) => <p className="character" key={index}
            
                style={{
                    color: index === stream.length -1 ? '#fff' : undefined,
                    opacity: index < 6 ? 0.1 + index * 0.15 : 1,
                    textShadow: index === stream.length -1 ? '0px 0px 20px rgba(255,255,255,1)' : undefined,
                    marinTop: -12
                }}

            >{char}</p>)}
        </div>
    );
}