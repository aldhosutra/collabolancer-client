import { getAddressFromPublicKey } from "@liskhq/lisk-cryptography";

const store_account_get = (publicKey, store) => {
  let returned;
  try {
    returned = store.account.get(getAddressFromPublicKey(publicKey));
  } catch (err) {
    returned = store.account.getOrDefault(getAddressFromPublicKey(publicKey));
    returned.publicKey = returned.publicKey || publicKey;
  }
  return returned;
};

export default store_account_get;
