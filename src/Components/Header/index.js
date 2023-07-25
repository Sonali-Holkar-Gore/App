import {Link} from 'react-router-dom'
import {NavbarContainer, WebsiteLogo} from '../../styledComponents'

const Header = () => (
  <NavbarContainer>
    <Link to="/">
      <WebsiteLogo
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </NavbarContainer>
)

export default Header
