
const Footer = (props) => {

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer" style={{color: props.color}}>
      <div>
      {props.flaticonLinks.map((link, index) => (
        <a key={index} href={link.href} title={link.title} target='_blank'>
          {link.text}{index < props.flaticonLinks.length - 1 ? '/' : ''}
        </a> 
      ))}
      </div>
      <p style={{display: 'inline'}}>Icons created by {props.designers} - Flaticon</p>
      <p>Copyright © {currentYear} Jeremy Krans. All Rights Reserved.</p>       
      
    </div>
  )
}

export default Footer
