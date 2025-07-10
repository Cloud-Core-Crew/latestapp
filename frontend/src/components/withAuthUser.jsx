import { useAuth } from '../contexts/AuthContext';

export default function withAuthUser(Component) {
  return function WrapperComponent(props) {
    const { user } = useAuth();
    return <Component {...props} user={user} />;
  };
}
