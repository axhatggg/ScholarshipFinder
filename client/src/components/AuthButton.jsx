import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import axios from 'axios';

const AuthButton = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user to backend
      await axios.post('http://localhost:5000/api/users/login', {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      });

    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleLogin}>Sign in with Google</button>;
};
export default AuthButton;
