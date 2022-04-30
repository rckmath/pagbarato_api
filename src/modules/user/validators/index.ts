export const emailValidation = (email: string): string | null => {
  //#region Inner functions
  function emptyOrTooLarge(str: string, maxSize: number): boolean {
    if (!str || str.length > maxSize) return true;

    return false;
  }

  function nonConformant(email: string): boolean {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    return !emailRegex.test(email);
  }

  function somePartIsTooLargeIn(domain: string): boolean {
    const maxPartSize = 63;
    const domainParts = domain.split('.');
    return domainParts.some(function (part) {
      return part.length > maxPartSize;
    });
  }
  //#endregion

  email = email.toLowerCase();

  const maxEmailSize = 320;

  if (emptyOrTooLarge(email, maxEmailSize) || nonConformant(email)) return null;

  const [local, domain] = email.split('@');
  const maxLocalSize = 64;
  const maxDomainSize = 255;

  if (emptyOrTooLarge(local, maxLocalSize) || emptyOrTooLarge(domain, maxDomainSize)) return null;

  if (somePartIsTooLargeIn(domain)) return null;

  return email;
};

export const passwordValidation = (password: string): string | null => {
  //#region Inner functions
  const noNumberIn = (password: string) => !/\d/.test(password);
  const tooShort = (password: string) => password.length < 6;
  //#endregion

  if (!password) {
    return null;
  }

  if (noNumberIn(password) || tooShort(password)) {
    return null;
  }

  return password;
};
