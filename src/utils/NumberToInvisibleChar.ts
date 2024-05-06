export default class NumberToInvisibleChar {
  private static _chars: string[] = [
      "\u{e0070}",
      "\u{e0071}",
      "\u{e0072}",
      "\u{e0073}",
      "\u{e0074}",
      "\u{e0075}",
      "\u{e0076}",
      "\u{e0077}",
      "\u{e0078}",
      "\u{e0079}"
  ];

  public static translate(num: number | string): string {
      if (typeof num === 'number') {
          if (num < 0 || num > 9) {
              throw new Error("Le nombre doit être compris entre 0 et 9.");
          }
          return this._chars[num];
      }

      // Si c'est un string
      let result = '';
      for (let char of num) {
          const digit = parseInt(char);
          if (isNaN(digit) || digit < 0 || digit > 9) {
              throw new Error(`Le caractère '${char}' n'est pas un chiffre valide ou est en dehors de la plage 0-9.`);
          }
          result += this._chars[digit];
      }
      return result;
  }
}
