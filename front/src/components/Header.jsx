import { NavLink } from 'react-router-dom';
export default function Header() {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Books', href: '/books' },
    { label: 'Reservations', href: '/myreservations' },
    { label: 'Login', href: '/login' },
    { label: 'SignUp', href: '/signup' },
  ];
  return (
    <>
      <header className='bg-zinc-600 flex justify-between place-items-center h-16 px-8'>
        <div>
          <a href='/'>LOGO</a>
        </div>
        <nav>
          <ul className='flex gap-4'>
            {navLinks.map((link) => {
              return (
                <li key={link.href}>
                  <NavLink to={link.href}>{link.label}</NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}
