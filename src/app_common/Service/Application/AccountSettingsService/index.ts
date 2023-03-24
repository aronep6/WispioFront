import Core from "../../Core";
import { updatePassword } from "firebase/auth";
import getFirebaseError from "./functions";
import { CallableFunctions } from "../../Core/interfaces";
class AccountSettingsService extends Core {
    constructor() {
        super();
    }

    // Security and privacy
    _security_updatePassword = async (
        password: string, 
        password_retype: string
    ): Promise<string> => {
        try {
            if (password !== password_retype) throw new Error('Password entries are different, please try again !');
            await updatePassword(this.getCurrentUser(), password);

            return 'Mot de passe mis à jour avec succès !';
        } catch (error: any) {
            const firebaseReadableError = getFirebaseError(error.message);
            throw new Error(firebaseReadableError);
        }
    }

    // Get billing informations (This.method is calling the API to get the billing informations)
    _billing_getBillingInformations = async (): Promise<any> => {
        try {
            return await this.fetchStrawberryAPI(CallableFunctions.GetBillingInformations, {})
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AccountSettingsService;