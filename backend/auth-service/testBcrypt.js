const bcrypt = require('bcrypt');
const hashedPassword = '$2b$10$JGmlooDdyguE7jsnGX/CueEA0Qmucf/4Kay23NctSAgPE1uiSLRe6';
const providedPassword = '12345';

bcrypt.compare(providedPassword, hashedPassword, (err, isMatch) => {
    if (err) console.error('Error:', err);
    else console.log('Password match:', isMatch);
});
