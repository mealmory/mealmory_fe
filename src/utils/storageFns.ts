const IV_LENGTH = 12;

const encryptWithAES = async (password: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SALT;
  if (secretKey) {
    const keyMaterial = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(secretKey)
    );
    const key = await crypto.subtle.importKey(
      "raw",
      keyMaterial,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      new TextEncoder().encode(password)
    );

    const ivAndCiphertext = new Uint8Array(iv.length + encrypted.byteLength);
    ivAndCiphertext.set(iv);
    ivAndCiphertext.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...Array.from(ivAndCiphertext)));
  }
  return;
};

const decryptWithAES = async (encryptedData: string) => {
  const secretKey = process.env.NEXT_PUBLIC_SALT;
  if (secretKey) {
    const encryptedBytes = Uint8Array.from(atob(encryptedData), (char) =>
      char.charCodeAt(0)
    );

    const iv = encryptedBytes.slice(0, IV_LENGTH);
    const ciphertext = encryptedBytes.slice(IV_LENGTH);

    const keyMaterial = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(secretKey)
    );

    const key = await crypto.subtle.importKey(
      "raw",
      keyMaterial,
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
    );

    try {
      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        ciphertext
      );

      return new TextDecoder().decode(decrypted);
    } catch (error) {
      return;
    }
  }
  return;
};

const hasWindow = typeof window !== "undefined";

export const storageGet = (key: string) => {
  if (hasWindow) {
    const storageData = localStorage.getItem(key);
    const result = storageData ? decryptWithAES(storageData) : undefined;
    return result;
  }
  return;
};

export const storageSet = (key: string, value: string) => {
  if (hasWindow) {
    encryptWithAES(value).then((res) => {
      if (res) localStorage.setItem(key, res);
    });
  }
};

export const storageRemove = (key: string) => {
  if (hasWindow) localStorage.removeItem(key);
};
