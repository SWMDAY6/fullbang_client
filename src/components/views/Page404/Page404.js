import React from "react";
import "./error.css";

const page404 = () => {
  return (
    <>
      {" "}
      <div class="error-page">
        <div>
          <h1 data-h1="404">404</h1>
          <p data-p="NOT FOUND">NOT FOUND</p>
        </div>
      </div>
      <a href="#" class="back">
        GO BACK
      </a>
      <div id="tsparticles"></div>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/tsparticles@1.18.11/dist/tsparticles.min.js"
      ></script>
      <script type="text/javascript" src="js/errors.js"></script>
    </>
  );
};

export default page404;
