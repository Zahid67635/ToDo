import { Spinner } from "keep-react";
import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner color="info" size="lg" />
    </div>
  );
};

export default Loader;
