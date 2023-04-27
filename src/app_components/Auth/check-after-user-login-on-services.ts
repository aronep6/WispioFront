import type { NavigateFunction } from "react-router-dom";
import type AuthenticationInterface from "../../app_common/Service/Authentication";
import { SnackbarServicesValues, SnackbarType, SnackbarElement } from "../../app_contexts/SnackbarService/interfaces";
import { AppRoutes } from "../../app_common/interfaces/AppRoutes";

const connected_user_snackbar_element: SnackbarElement = {
    type: SnackbarType.Success,
    title: "Vous êtes connecté !",
    message: `Connecté sur ${import.meta.env.VITE_APPLICATION_NAME} !`,
    duration: 5000,
};

const checkAfterUserLoginOnServices = async (
    auth: AuthenticationInterface,
    navigate: NavigateFunction,
    snackbarService: SnackbarServicesValues
): Promise<void> => {

    snackbarService.addSnackbarElement(connected_user_snackbar_element);
    
    // -- Check if the user email is verified
    const isEmailVerified = await auth.checkIfUserEmailIsVerified();

    if (!isEmailVerified) {
        const redirectUrl = AppRoutes.AuthAccountCheckup;
        return navigate(redirectUrl);
    }

    // -- Check if the user as a current plan selected
    const hasCurrentPlan = await auth.checkIfUserHasCurrentPlan();

    // -- Checking the current billing status of the user
    const billingIsActive = await auth.checkBillingStatus();

    if (!billingIsActive || !hasCurrentPlan) {
        const redirectUrl = AppRoutes.BillingSettingsSelectPlan;
        return navigate(redirectUrl);
    }

    // Do other checks here ...

    await auth.sleep(5000 * 5000 * 5000);

    // const checkForRegistrationRedirection = async (uid: string) => {
    //     try {
    //         const { claims } = await service.getCustomClaims();

    //         if (!claims) throw 'No custom claims found for this user';
    //         // Check if the user need to add professional email
    //         const params = new URLSearchParams(window.location.search);

    //         const flow = params.get('flow');

    //         if (flow === 'addProfessionnalEmail' && claims.userIsReadyToUse) {
    //             return navigate('/services/emails/create');
    //         }
    //         if (claims.userIsReadyToUse) return navigate('/app/dashboard');
    //         throw 'User is not ready to use';
    //     } catch (err) {
    //         inDev && console.log("Une erreur est survenue lors de la vérification de l'utilisateur connecté : ", err);
    //         // Redirect to the registration page
    //         navigate(`/auth/checkup?id=${uid}&isImperative=true&fallback=default&flow=default`);
    //         return;
    //     }
    // };
};

export default checkAfterUserLoginOnServices;