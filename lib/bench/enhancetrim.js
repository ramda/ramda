

  static trimFix(rstring, string) {

    /* var i,j used for loop*/

    let i;
    let j;
    let l = 0;
    let m = 0;

    /* extracting char from string*/

    let k;

    /* newstring extract char that need not to be remoived from left end
    newstring2 extract char that need not to be remove from right end*/
    
    let newString = "";
    let newString2 = "";

    /* map object used for setting all chars to 1 and char need to removed to 0*/

    let checker = {};

    /* initially setting checker to 1 for all characters*/

    for (j = 0; j < string.length; j++) {
      {
        k = string.charAt(j).toString();
       // console.log(k,typeof k,checker[k]);
        checker[k] = 1;
      }
    }

/* setting character need to be removed to 0*/

    for (j = 0; j < rstring.length; j++) {
      {
        k = rstring.charAt(j).toString();
        checker[k] = 0;
      }
    }

/* moving pointer to left end of string till a alphabet is detected or string ends*/

    for (
      i = 0;
      i < string.length &&
      !(
        ((c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
          string.charAt(i)
        ) >= 65 &&
          (c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
            string.charAt(i)
          ) <= 90) ||
        ((c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
          string.charAt(i)
        ) >= 97 &&
          (c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
            string.charAt(i)
          ) <= 122)
      );
      i++
    ) {
      {
        k = string.charAt(i).toString();
        if (((m, k) => (m[k] === undefined ? null : m[k]))(checker, k) === 1)
          newString = newString + string.charAt(i);
        l = i;
      }
    }

    /* moving right end of string till alphabet is encountered or string ends*/


    for (
      i = string.length - 1;
      i >= 0 &&
      !(
        ((c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
          string.charAt(i)
        ) >= 65 &&
          (c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
            string.charAt(i)
          ) <= 90) ||
        ((c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
          string.charAt(i)
        ) >= 97 &&
          (c => (c.charCodeAt == null ? c : c.charCodeAt(0)))(
            string.charAt(i)
          ) <= 122)
      );
      i--
    ) {
      {
        k = string.charAt(i).toString();
        if (((m, k) => (m[k] === undefined ? null : m[k]))(checker, k) === 1)
          newString2 = newString2 + string.charAt(i);
        m = i;
      }

    }

    /* reversing string of second end*/

    newString2 = newString2.split("").reverse().join("");
      //console.log(newString2);

     /* combining original string*/

    for (i = l + 1; i <= m - 1; i++) {
      newString = newString + string.charAt(i);
    }

    /* returning the original string*/


    return newString + newString2;
  }
}
