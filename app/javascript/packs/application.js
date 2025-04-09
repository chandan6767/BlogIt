// Entry point for the build script in your package.json
import "../stylesheets/application.scss";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

initializeLogger();
setAuthHeaders();
