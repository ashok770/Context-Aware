const auth = require("../middleware/auth");

// Old: router.get('/', getSessions);
// New: Now only the logged-in user gets THEIR sessions
router.get("/", auth, getSessions);
