import * as SMS from 'expo-sms';

export default function useShare() {
  return {
    send: async (to, message) => {
      if (await SMS.isAvailableAsync()) {
        await SMS.sendSMSAsync(
          to,
          message
        );
      }
    }
  };
}
