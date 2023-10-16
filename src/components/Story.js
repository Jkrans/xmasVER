

const Story = (props) => {
  return (
    <div className="story-content" style={{width: props.width, color: props.color}}>
      <h2>{props.title}</h2>
      <p>{props.story}</p>
    </div>
  )
}

export default Story
