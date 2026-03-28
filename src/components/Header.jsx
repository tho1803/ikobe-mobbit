import logoLight from '../assets/ikobe-logo-light-bg.png';

export default function Header() {
  return (
    <header className="app-header">
      <div className="ikobe-logo">
        <img src={logoLight} alt="IKOBE – Institut für Kompetenz und Begabung" className="logo-img" />
      </div>
      <span className="header-url">www.ikobe.de</span>
    </header>
  );
}
