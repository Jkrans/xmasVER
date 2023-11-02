

const Story = (props) => {
  return (
    <div className="story-content" style={{ width: props.width, color: props.color }}>
      <h2>{props.title}</h2>
      <div>
        {props.story && props.story.map((paragraph, index) => (
          <>
            <p>{paragraph}</p>
            {index !== props.story.length - 1 && <br />}
          </>
        ))}
      </div>
    </div>
  )
}

export default Story
