import { useContext } from 'react';
import { CurrentComponentContext } from '../App';

import Potion from '../images/purple-potion.png';
import Ghost from '../images/ghost.png';
import HandBone from '../images/hand-bones.png';
import Grave from '../images/grave.png';

import PBFragment from './ProgressBarFragment';


const ProgressBar = () => {
    const currentComponent = useContext(CurrentComponentContext);

    const componentName = [
        'WitchesLair',
        'Library',
        'Basement',
        'Graveyard',
        'Escaped'
    ];

    const getBackgroundColor = (currentComponent, componentName, index) => {
        if (currentComponent === componentName[index]) return 'progress-bar-half-color';
        if (componentName.indexOf(currentComponent) > index) return 'progress-bar-full-color';
        return '';
      };
    const getBackgroundColorLine = (currentComponent, componentName, index) => {
        if (currentComponent === componentName[index]) return 'progress-bar-full-color';
        if (componentName.indexOf(currentComponent) > index) return 'progress-bar-full-color';
        return '';
      };
    const setImageVisible = (currentComponent, componentName, index) => {
        if (currentComponent === componentName[index]) return 'progress-img-visible';
        if (componentName.indexOf(currentComponent) > index) return 'progress-img-visible';
        return '';
      };

    return (
        <div className="progress-bar">
            <PBFragment 
                img={Potion} 
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 0)} 
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 1)} 
                imgVisibility={setImageVisible(currentComponent, componentName, 1)}
            />

            <PBFragment 
                img={Ghost} 
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 1)}
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 2)} 
                imgVisibility={setImageVisible(currentComponent, componentName, 2)}
                imgPixels='42px'
            />

            <PBFragment 
                img={HandBone} 
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 2)} 
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 3)} 
                imgVisibility={setImageVisible(currentComponent, componentName, 3)}
            />
            <PBFragment 
                img={Grave} 
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 3)} 
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 4)} 
                imgVisibility={setImageVisible(currentComponent, componentName, 4)}
                imgPixels = '39px'
                lineDisplay='none'
            />
               
        </div>
  )
}

export default ProgressBar
