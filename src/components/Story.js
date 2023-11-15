import { useState, useEffect } from 'react'

const Story = (props) => {

  const [storyData, setStoryData] = useState([])
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3; // Set the maximum number of retries
    const retryDelay = 2000; // Delay between retries in milliseconds
    async function fetchStory() {
      try {
        const response = await fetch(props.apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('try: ', retryCount)
        const data = await response.json();
        setStoryData(data);
      } catch (err) {
        console.error("An error occurred while fetching story:", err);
        if (retryCount < maxRetries) {
          setTimeout(fetchStory, retryDelay);
          retryCount++;
        }
      }
    }

    fetchStory();
  }, [props.apiUrl]);

  return (
    <div className="story-content" style={{ width: props.width, color: props.color }}>
      <h2>{storyData.title}</h2>
      <div>
        {storyData.story && storyData.story.map((paragraph, index) => (
          <>
            <p>{paragraph}</p>
            {index !== storyData.story.length - 1 && <br />}
          </>
        ))}
      </div>
    </div>
  )
}

export default Story
