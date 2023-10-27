import { useState, useEffect, createContext } from 'react'
import './App.css';
import Header from './components/Header'
import Footer from "./components/Footer"
import WitchesLair from './components/WitchesLair';
import Library from './components/Library';
import Basement from './components/Basement';
import Countdown from './components/CountdownTimer';
import Start from './components/Start';
import Graveyard from './components/Graveyard';
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
  { href: 'https://www.flaticon.com/free-icons/potion', title: 'potion icons', text: 'Potion' },
  { href: 'https://www.flaticon.com/free-icons/halloween', title: 'halloween icons', text: 'Halloween' },
  { href: 'https://www.flaticon.com/free-icons/spider', title: 'spider icons', text: 'Spider' },
  { href: 'https://www.flaticon.com/free-icons/ghost', title: 'ghost icons', text: 'Ghost' },
  { href: 'https://www.flaticon.com/free-icons/hand-bones', title: 'hand bones icons', text: 'Hand bones' },
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/haunted-house" title="haunted house icons">Haunted house icons created by designbydai - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/disease" title="disease icons">Gravestone icons created by kerismaker - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/headstone" title="headstone icons">Headstone icons created by Tempo_doloe - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/skeleton" title="skeleton icons">Reaper icons created by Freepik - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/cloak" title="cloak icons">Cloak icons created by wanicon - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-icons/entrance" title="entrance icons">Gate icons created by Eucalyp - Flaticon</a>'),
  extractLinkToObject('<a href="https://www.flaticon.com/free-animated-icons/pumpkin" title="pumpkin animated icons">Pumpkin icons created by Freepik - Flaticon</a>'),
  { href: '', title: 'frank icon', text: 'Frank' },
];

export const CurrentComponentContext = createContext();

function App() {
  const [showStart, setShowStart] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showBasement, setShowBasement] = useState(false);
  const [showGraveyard, setShowGraveyard] = useState(false);
  const [showEscaped, setShowEscaped] = useState(false);
  const [showNoEscape, setShowNoEscape] = useState(false);
  const [showWitchesLair, setShowWitchesLair] = useState(false);
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
    if (showWitchesLair) {
      setFadeTransition('WitchesLair');
    }
    else if (showLibrary) {
      setFadeTransition('Library');
    }
    else if (showBasement) {
      setFadeTransition('Basement');
    }
    else if (showGraveyard) {
      setFadeTransition('Graveyard');
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
  }, [showStart, showWitchesLair, showLibrary, showBasement, showGraveyard, showEscaped, showNoEscape]);

  const handlePass = (setFalse, setTrue) => {
    console.log('sup')
    setFalse();
    setTrue();
  }

  const handleCountdownEnd = (setTrue) => {
    setShowWitchesLair(false);
    setShowLibrary(false);
    setShowBasement(false);
    setShowGraveyard(false);
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
        {currentComponent === 'Start' && <Start onPass={() => handlePass(() => setShowStart(false), () => setShowWitchesLair(true))} />}
        {currentComponent === 'WitchesLair' && <WitchesLair onPass={() => handlePass(() => setShowWitchesLair(false), () => setShowLibrary(true))} />}
        {currentComponent === 'Library' && <Library onPass={() => handlePass(() => setShowLibrary(false), () => setShowBasement(true))} />}
        {currentComponent === 'Basement' && <Basement onPass={() => handlePass(() => setShowBasement(false), () => setShowGraveyard(true))} />}
        {currentComponent === 'Graveyard' && <Graveyard onPass={() => handlePass(() => setShowGraveyard(false), () => setShowEscaped(true))} />}
        {currentComponent === 'Escaped' && <Escaped formattedTime={formattedTime} />}
        {currentComponent === 'NoEscape' && <NoEscape onPass={() => handlePass(() => setShowNoEscape(false), () => setShowStart(true))} />}
      </div>

      <Footer flaticonLinks={flaticonLinks} designers='Jack Krans, Freepik, Jesus Chavarria, Tempo_doloe, Wanicon, Eucalyp, and designbydai' />
    </div>
  );
}

export default App;
