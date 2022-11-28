import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../graphql/mutation";

const useEditUser = () => {
  const [mutate, result] = useMutation(EDIT_USER);

  const editUser = async ({ profileName, pictureUrl }: { profileName: string, pictureUrl: string }) => {

    const variables = profileName && pictureUrl ?
      { profileName, pictureUrl }
      : profileName ? { profileName }
        : pictureUrl ? { pictureUrl }
          : null

    if (!variables) return

    const { data } = await mutate({ variables: variables })
    return data
  };

  return { editUser, result, loading: result.loading };
};

export default useEditUser