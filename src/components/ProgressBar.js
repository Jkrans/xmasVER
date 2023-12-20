import { useContext } from 'react';
import { CurrentComponentContext } from '../App';

import shape from '../images/card-icons/shape.png';
import tree from '../images/card-icons/tree.png';
import train from '../images/card-icons/train.png';
import clock from '../images/card-icons/clock.png';

import PBFragment from './ProgressBarFragment';


const ProgressBar = () => {
    const currentComponent = useContext(CurrentComponentContext); //

    const componentName = [
        'Kitchen',
        'Cage',
        'Enclosure',
        'CornMaze',
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
                img={shape}
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 0)}
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 1)}
                imgVisibility={setImageVisible(currentComponent, componentName, 1)}
                imgPixels="50px"
            />

            <PBFragment
                img={tree}
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 1)}
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 2)}
                imgVisibility={setImageVisible(currentComponent, componentName, 2)}
                imgPixels='50px'
            />

            <PBFragment
                img={train}
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 2)}
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 3)}
                imgVisibility={setImageVisible(currentComponent, componentName, 3)}
                imgPixels='50px'
            />
            <PBFragment
                img={clock}
                backgroundColorBubble={getBackgroundColor(currentComponent, componentName, 3)}
                backgroundColorLine={getBackgroundColorLine(currentComponent, componentName, 4)}
                imgVisibility={setImageVisible(currentComponent, componentName, 4)}
                imgPixels='50px'
                lineDisplay='none'
            />

        </div>
    )
}

export default ProgressBar
