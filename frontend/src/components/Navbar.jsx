import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map((s) => s[0]).slice(0,2).join('') || 'U';

  return (
    <nav className="navbar">
      <div className="brand">
        <div className="logo" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9S3 16.97 3 12z" fill="white" opacity="0.06"/><path d="M7 12l3 3 7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="title">Coding Tutor</div>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',marginRight:8}}>
              <div style={{fontSize:12,color:'var(--muted)'}}>Signed in as</div>
              <div style={{fontSize:13,fontWeight:600,color:'#0f172a'}}>{user.name}</div>
            </div>
            <div className="avatar" aria-label={`Avatar for ${user.name}`}>{initials}</div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="logout-btn">Login</Link>
            <Link to="/register" className="logout-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
