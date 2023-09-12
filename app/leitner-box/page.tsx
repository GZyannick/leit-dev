const leitnerBox = () => {
    return ( <div> 
        leitner box
    </div> );
}
 
export default leitnerBox;

/*
 * donc une leitner box est comme un array a 2 dimension
 * chaque array constitue une box
 * est on a plusieurs question dans une box
 */


/** ex: https://www.motive-toi.com/outils-pratiques/la-methode-leitner-pour-un-apprentissage-efficace-presque-sans-effort/
 * [
 *  [q1, q3, q6, q2], each days`
 *  [q14, q4, q7, q8], 2 days
 *  [.....], 4 days
 *  [..........], 6 days
 *  [.......], 8 days if true wp you learn it
 * ] 
 * if response = true change to next box
 * else if response = false change to previous box
 */

/*
 * il faudrait cheque les jours entre les box pour savoir si
 * je dois les mettre dans les question du jours
 */

/*
 * creer un onglet appris avec les question/response 
 * pour montrer tout ce que l'on a appris
 */