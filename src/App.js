import { useState, useEffect, createContext } from 'react'
import './App.css';
import './Animate.css';
import './Train.css';
import Header from './components/Header'
import Footer from "./components/Footer"
import Enclosure from './components/ChallengeOne';
import CornMaze from './components/ChallengeTwo';
import Cage from './components/ChallengeThree';
import Countdown from './components/CountdownTimer';
import Start from './components/Start';
import Kitchen from './components/ChallengeFour';
import NoEscape from './components/NoEscape';
import Escaped from './components/Escaped';

function extractLinkToObject(link) {
  const hrefMatch = link.match(/href="(.*?)"/);
  const titleMatch = link.match(/title="(.*?)"/);
  let textMatch = link.match(/>(.*?)(?=\sicons)/);

  if (!hrefMatch || !titleMatch || !textMatch) {
    throw new Error('Invalid link format');
  }

  return {
    href: hrefMatch[1],
    title: titleMatch[1],
    text: textMatch[1].trim() // Trimming to remove potential extra spaces
  };
}

const flaticonLinks = [
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/turkey" title="turkey icons">Turkey icons created by Freepik - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/corn-cob" title="corn cob icons">Corn cob icons created by Vectorslab - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/pumpkin" title="pumpkin icons">Pumpkin icons created by Freepik - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/green-beans" title="green-beans icons">Green-beans icons created by AomAm - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/pumpkin-pie" title="pumpkin-pie icons">Pumpkin-pie icons created by amonrat rungreangfangsai - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/mashed-potatoes" title="mashed potatoes icons">Mashed potatoes icons created by juicy_fish - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-animated-icons/agriculture" title="agriculture animated icons">Scarecrow icons created by Freepik - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/medal" title="medal icons">Medal icons created by wanicon - Flaticon</a>'),
];

export const CurrentComponentContext = createContext();

function App() {
  const [showStart, setShowStart] = useState(false);
  const [showCornMaze, setShowCornMaze] = useState(false);
  const [showCage, setShowCage] = useState(false);
  const [showKitchen, setShowKitchen] = useState(false);
  const [showEscaped, setShowEscaped] = useState(false);
  const [showNoEscape, setShowNoEscape] = useState(false);
  const [showEnclosure, setShowEnclosure] = useState(false);
  const [transitionClass, setTransitionClass] = useState('fade-in');
  const [currentComponent, setCurrentComponent] = useState('Start');
  const [formattedTime, setFormattedTime] = useState("");

  const handleTimeUpdate = (time) => {
    setFormattedTime(time);
  };

  const setFadeTransition = (currentComponentName) => {
    setTransitionClass('fade-out');
    const timer = setTimeout(() => {
      setCurrentComponent(currentComponentName);
      window.scrollTo(0, 0);
      setTransitionClass('fade-in');
    }, 2000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    if (showEnclosure) {
      setFadeTransition('Enclosure');
    }
    else if (showCornMaze) {
      setFadeTransition('CornMaze');
    }
    else if (showCage) {
      setFadeTransition('Cage');
    }
    else if (showKitchen) {
      setFadeTransition('Kitchen');
    }
    else if (showEscaped) {
      setFadeTransition('Escaped');
    }
    else if (showNoEscape) {
      setFadeTransition('NoEscape');
    }
    else if (showStart) {
      setFadeTransition('Start');
    }
  }, [showStart, showEnclosure, showCornMaze, showCage, showKitchen, showEscaped, showNoEscape]);

  const handlePass = (setFalse, setTrue) => {
    console.log('sup')
    setFalse();
    setTrue();
  }

  const handleCountdownEnd = (setTrue) => {
    setShowEnclosure(false);
    setShowCornMaze(false);
    setShowCage(false);
    setShowKitchen(false);
    setFadeTransition('NoEscape');
    setTrue();
  }

  return (
    <div className="App">
      {currentComponent !== 'Start' && currentComponent !== 'NoEscape' && (
        <>
          <CurrentComponentContext.Provider value={currentComponent}>
            <Header />
          </CurrentComponentContext.Provider>
          {currentComponent !== 'Escaped' && (
            <Countdown onTimeUpdate={handleTimeUpdate} onCountdownEnd={() => handleCountdownEnd(() => setShowNoEscape(true))} />
          )}

        </>
      )}

      <div className={`${transitionClass}`}>
        {currentComponent === 'Start' && <Start onPass={() => handlePass(() => setShowStart(false), () => setShowCornMaze(true))} />}
        {currentComponent === 'Enclosure' && <Enclosure onPass={() => handlePass(() => setShowEnclosure(false), () => setShowCornMaze(true))} />}
        {currentComponent === 'CornMaze' && <CornMaze onPass={() => handlePass(() => setShowCornMaze(false), () => setShowCage(true))} />}
        {currentComponent === 'Cage' && <Cage onPass={() => handlePass(() => setShowCage(false), () => setShowKitchen(true))} />}
        {currentComponent === 'Kitchen' && <Kitchen onPass={() => handlePass(() => setShowKitchen(false), () => setShowEscaped(true))} />}
        {currentComponent === 'Escaped' && <Escaped formattedTime={formattedTime} />}
        {currentComponent === 'NoEscape' && <NoEscape onPass={() => handlePass(() => setShowNoEscape(false), () => setShowStart(true))} />}
      </div>


      {currentComponent === 'Start' && (
        <Footer
          flaticonLinks={flaticonLinks}
          designers='Jack Krans, Freepik, Wanicon, Juicy_Fish, Amonrat, AomAm, and Vectorslab'
          marginTop="0"
        />
      )}

      {currentComponent !== 'Start' && (
        <Footer
          flaticonLinks={flaticonLinks}
          designers='Jack Krans, Freepik, Wanicon, Juicy_Fish, Amonrat, AomAm, and Vectorslab'
          marginTop="10rem"
        />
      )}


    </div>
  );
}

export default App;
