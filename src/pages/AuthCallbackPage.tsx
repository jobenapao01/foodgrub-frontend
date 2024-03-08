import { useEffect, useRef } from "react";
import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import SkeletonPage from "@/components/SkeletonPage";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({
        auth0Id: user.sub,
        email: user.email,
      });
      hasCreatedUser.current = true;
    }

    navigate("/");
  }, [createUser, navigate, user]);

  return (
    <>
      <SkeletonPage />
    </>
  );
};

export default AuthCallbackPage;
