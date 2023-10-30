import { useEffect, useState } from 'react'
import ImageEquationRow from "./ImageEquationRow"
import Story from "./Story"

// const story = [
//   "As you strut around your enclosure, you overhear the farmer chatting with his family. \"This one's gotten nice and plump,\" he points right at you, \"I reckon they’ll be the star of our Thanksgiving table!\" Panic surges through your feathers; it's clear you're slated to be the main course. You've got to make a plan and fast.",
//   <br />, <br />,
//   "Your eyes dart to the gate of your enclosure. It's locked with a peculiar mechanism featuring a set of icons: a corn cob, a pumpkin, green beans, mashed potatoes, and a pie. Next to the lock, a sign reads, \"Enter the coded values for the image to unlock.\" Below that there are more instructions that state \"The code will reset each day for security purposes by the farmer. If you need to get out, you can solve the equations below.\"",
//   <br />, <br />,
//   "You smirk to yourself. They clearly underestimated They underestimated this \"Bird Brain\" when they devised this \"turkey-proof plan\". They'll soon find out just how clever a turkey can be. It's time to hatch your plan and fly the coop.",
// ]



const WitchesLair = ({ onPass }) => {
  const [storyData, setStoryData] = useState(null);

  useEffect(() => {

    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(220, 161, 12), rgb(79 39 25))';
    document.getElementsByClassName('header--h1')[0].style.color = 'rgb(45, 0, 60)';

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
        console.log("Story Data:", data);
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

export default WitchesLair
