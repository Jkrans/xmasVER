import { useEffect } from 'react'
import ImageEquationRow from "./ImageEquationRow"
import Story from "./Story"

const story = [
  "As you step into the haunted mansion, the heavy doors slowly open with a soft creak. The hallway inside is dim, but there's a cool, glowing light coming from a room further down. Super curious, you decide to check it out. The hallway is kind of spooky, with old pictures on the walls and the eyes in them feel like they're watching you. Before you know it, you've walked into another room and—snap!—the door behind you closes all on its own. Whoa! This room is way different. It's a bit dark, there are spiderwebs everywhere, and those glowing bottles? They're here too. And they're kinda... buzzing? Yup, you've figured it out. This has to be the witched lair! And when you try to leave, you feel all wobbly and weird. Uh-oh, looks like that witch set up a sneaky spell to keep you here.",
  <br />, <br />,
  "Then you see it—an old piece of paper on a wooden table. Aha! The paper has some numbers and clues written down, and you have a gut feeling that working this out is the key to figuring out the perfect mix of special ingredients to break the witch's spell. Your eyes quickly scan the room, taking in shelves filled with bizarre items like \"Eyeball of Man\" and \"Zombie Fingers.\" You're sure that unlocking these clues is your only ticket out of this spooky place.",
  <br />, <br />,
  "You're running out of time. You grab a pencil and some scrap paper, and start doing the math as fast as you can. Every second counts. If you don't hurry, you might be stuck here forever. But don't worry, you're going to work hard, stay persistent, and you can totally do this. So solve that problem and make the potion to gain your strength and get out of here!",
]



const WitchesLair = ({ onPass }) => {
  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(0, 100, 50), rgb(117, 0, 180))';
    document.getElementsByClassName('header--h1')[0].style.color = 'rgb(45, 0, 60)';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(117, 0, 180)";
    })


    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  });
  return (
    <div className="main--witch">
      <Story title="Witch's Lair" story={story} color="rgb(0,0,0,0.7)" />
      <ImageEquationRow onPass={onPass} />

    </div>
  )
}

export default WitchesLair
