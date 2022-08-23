import { useAuth } from "../../hooks/use-auth";
const RoleGuard = (props) => {
  const { children, role } = props;
  const { user } = useAuth();

  if (user?.role !== role) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
