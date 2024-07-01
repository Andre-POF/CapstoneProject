// src/components/UppyComponent.js

import React, { useEffect } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "./upload.css";
import { BACKEND_SERVER } from "../constants";

const UppyComponent = ({ patient }) => {
  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  }).use(XHRUpload, {
    endpoint: `${BACKEND_SERVER}/patient/${patient._id}/report`, // Change this to your upload endpoint
    fieldName: "report",
  });

  useEffect(() => {
    return () => uppy.close();
  }, [uppy]);

  return (
    <div>
      <Dashboard
        uppy={uppy}
        hideUploadButton
        proudlyDisplayPoweredByUppy={false}
      />
    </div>
  );
};

export default UppyComponent;
