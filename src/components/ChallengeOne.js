import { useEffect, useState } from 'react'
import ImageEquationRow from "./ImageEquationRow"
import Story from "./Story"


const ChallengeOne = ({ onPass }) => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {

    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(220, 161, 12), rgb(79 39 25))';
    document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(79 39 25)";
    })

    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  });

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await fetch("https://turkeyver-backend-production.up.railway.app/api/stories/1");
        const data = await response.json();
        setStoryData(data);
      } catch (err) {
        console.error("An error occurred while fetching story:", err);
      }
    }

    fetchStory();
  }, []);


  return (
    <div className="main--witch">
      {storyData && <Story title={storyData.title} story={storyData.story} color="rgb(0,0,0,0.7)" />}
      <ImageEquationRow onPass={onPass} />
    </div>
  )
}

export default ChallengeOne
