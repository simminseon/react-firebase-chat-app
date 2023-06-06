import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/actions/user_action';

function ChatPage() {
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogOutClick = () => {
    auth.signOut();
    navigate('/');
  };
  return (
    <div>
      <button onClick={onLogOutClick}>Log Out</button>
    </div>
  );
}

export default ChatPage;
