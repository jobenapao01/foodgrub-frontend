import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import SkeletonPage from "@/components/SkeletonPage";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <SkeletonPage />;
  }

  if (!currentUser) {
    return <span>Unable to load User Profile</span>;
  }
  return (
    <UserProfileForm
      onSave={updateUser}
      isLoading={isUpdateLoading}
      currentUser={currentUser}
    />
  );
};

export default UserProfilePage;
