
const Footer = (props) => {

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer" style={{ color: props.color, marginTop: props.marginTop }}>
      <div>
        {props.flaticonLinks.map((link, index) => (
          <a key={index} href={link.href} title={link.title} target='_blank' rel="noreferrer" >
            {link.text}{index < props.flaticonLinks.length - 1 ? '/' : ''}
            <p style={{ display: 'inline' }}> Icon created by {props.designers} - Flaticon</p>
          </a>
        ))}
      </div>
      <p>Copyright © {currentYear} Jeremy Krans. All Rights Reserved.</p>

    </div>
  )
}
export default Footer
