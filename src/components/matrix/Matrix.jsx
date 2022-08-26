import { Rainstream } from '../rainstream/Rainstream';
import './Matrix.scss';

export function Matrix(){

    function MatrixRain(){

        const streamCount = Math.floor(window.innerWidth / 15.6);

        return(
            <div style={{
                position:'fixed',
                top:0,
                left:0,
                bottom:0,
                right:0,
            
                display:'flex',
            
                backgroundColor:'black'
            }}>
                {new Array(streamCount).fill().map((_, i) => (<Rainstream key={i}></Rainstream>))}
            </div>
        );
    }

    return(
        MatrixRain()
    );
}